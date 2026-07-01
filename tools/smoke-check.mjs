import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { terms } from "../src/data/terms.js";

const HOST = "127.0.0.1";
const PORT = 5177;
const ROOT = path.resolve(fileURLToPath(new URL("../dist", import.meta.url)));

let playwright;

try {
  playwright = await import("playwright");
} catch {
  console.log("Playwright unavailable; smoke check skipped.");
  process.exit(0);
}

const chromium = playwright.chromium ?? playwright.default?.chromium;
if (!chromium) {
  console.log("Playwright unavailable; smoke check skipped.");
  process.exit(0);
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function createServer() {
  return http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url, `http://${request.headers.host}`);
      const pathname = decodeURIComponent(requestUrl.pathname);
      const stripped = pathname.replace(/^\/cinematic-ai-visual-prompt-hub\/?/, "");
      const relativePath = stripped === "" || stripped === "/" ? "index.html" : stripped;
      const filePath = path.resolve(ROOT, relativePath);

      if (!filePath.startsWith(`${ROOT}${path.sep}`) && filePath !== path.join(ROOT, "index.html")) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const body = await fs.readFile(filePath);
      response.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(body);
    } catch (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
    }
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, HOST, () => {
      server.off("error", reject);
      resolve();
    });
  });
}

function close(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

async function checkOverflow(page) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    viewportWidth: document.documentElement.clientWidth,
  }));
  assert(
    overflow.scrollWidth <= overflow.viewportWidth + 1,
    `horizontal overflow: ${overflow.scrollWidth} > ${overflow.viewportWidth}`,
  );
}

const server = createServer();
let browser;

try {
  await listen(server);
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(`http://${HOST}:${PORT}/cinematic-ai-visual-prompt-hub/`, { waitUntil: "networkidle" });
  assert((await page.title()) === "电影级视觉提示词学习站", "Unexpected page title.");
  assert((await page.locator("h1").innerText()) === "电影级视觉提示词学习站", "Unexpected h1.");
  assert((await page.locator(".term-card").count()) === terms.length, "Initial term count mismatch.");
  await checkOverflow(page);

  await page.fill("#searchInput", "dolly");
  await page.waitForTimeout(150);
  assert((await page.locator(".term-card").count()) >= 2, "Search for dolly returned too few cards.");

  await page.locator(".term-card").first().click();
  await page.waitForSelector(".detail-modal");
  assert((await page.locator(".detail-modal").innerText()).includes("English Prompt Pattern"), "Modal missing prompt section.");
  await page.locator(".detail-modal button", { hasText: "Copy" }).first().click();
  await page.waitForTimeout(100);
  assert((await page.locator(".detail-modal").innerText()).includes("Copied"), "Copy state did not update.");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(100);
  assert((await page.locator(".detail-modal").count()) === 0, "Modal did not close.");

  await page.setViewportSize({ width: 390, height: 900 });
  await page.fill("#searchInput", "低调光");
  await page.waitForTimeout(150);
  assert((await page.locator(".term-card").count()) >= 1, "Mobile search returned no cards.");
  await checkOverflow(page);

  assert(errors.length === 0, `Console errors: ${errors.join(" | ")}`);
  console.log("Smoke check passed.");
} finally {
  if (browser) await browser.close();
  await close(server);
}
