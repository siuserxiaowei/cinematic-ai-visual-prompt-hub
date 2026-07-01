import { modules } from "../src/data/modules.js";
import { sources } from "../src/data/sources.js";
import { terms } from "../src/data/terms.js";

const errors = [];
const requiredModuleIds = new Set([
  "composition-shooting",
  "cinematic-composition",
  "cinematic-lighting",
  "camera-tone",
  "ai-camera-language",
  "micro-expression",
  "storyboard-script",
  "story-logic",
  "ai-shot-building",
]);
const requiredPlatforms = [
  "Runway",
  "Google DeepMind",
  "Google Cloud",
  "OpenAI Developers",
  "Alibaba Cloud",
  "阿里云",
  "Kling AI",
  "MiniMax",
  "Adobe",
  "StudioBinder",
  "Boords",
  "GitHub",
  "知乎",
  "B站",
  "抖音",
  "YouTube",
  "X/Twitter",
];
const trustedSourceTypes = new Set([
  "official-doc",
  "official-blog",
  "official-guide",
  "official-training",
  "education",
  "academic",
  "template",
  "github",
]);

function fail(message) {
  errors.push(message);
}

function isString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function assertArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${label} must be a non-empty array.`);
  }
}

function normalizeUrl(value) {
  try {
    const url = new URL(value);
    ["utm_source", "utm_medium", "utm_campaign", "inviteCode"].forEach((param) => {
      url.searchParams.delete(param);
    });
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return value;
  }
}

if (!Array.isArray(modules) || modules.length !== 9) {
  fail("modules must contain exactly nine module definitions.");
}

const moduleIds = new Set(modules.map((module) => module.id));
for (const id of requiredModuleIds) {
  if (!moduleIds.has(id)) fail(`missing module "${id}".`);
}

if (!Array.isArray(sources) || sources.length < 60) {
  fail(`sources must include at least 60 records; found ${sources.length}.`);
}

if (!Array.isArray(terms) || terms.length < 54) {
  fail(`terms must include at least 54 cards; found ${terms.length}.`);
}

const sourceIds = new Set();
const normalizedUrls = new Map();

sources.forEach((source, index) => {
  const label = source.id || `source[${index}]`;

  [
    "id",
    "title",
    "url",
    "platform",
    "module",
    "category",
    "priority",
    "sourceType",
    "summary",
    "learningValue",
  ].forEach((field) => {
    if (!isString(source[field])) fail(`${label}: missing field "${field}".`);
  });

  assertArray(source.terms, `${label}.terms`);

  if (sourceIds.has(source.id)) fail(`${label}: duplicate source id.`);
  sourceIds.add(source.id);

  if (!moduleIds.has(source.module)) fail(`${label}: unknown module "${source.module}".`);

  const normalized = normalizeUrl(source.url);
  if (normalizedUrls.has(normalized)) {
    fail(`${label}: duplicate URL with ${normalizedUrls.get(normalized)}.`);
  }
  normalizedUrls.set(normalized, label);

  if (
    ["X/Twitter", "抖音", "小红书"].includes(source.platform) &&
    !isString(source.limitations)
  ) {
    fail(`${label}: dynamic social source must include limitations.`);
  }
});

requiredPlatforms.forEach((platform) => {
  if (!sources.some((source) => source.platform === platform)) {
    fail(`missing required platform coverage: ${platform}.`);
  }
});

requiredModuleIds.forEach((moduleId) => {
  const citedSourceIds = new Set(
    terms.filter((term) => term.module === moduleId).flatMap((term) => term.sourceIds),
  );
  const moduleSources = sources.filter((source) => source.module === moduleId || citedSourceIds.has(source.id));
  const moduleTerms = terms.filter((term) => term.module === moduleId);

  if (moduleSources.length < 3) fail(`${moduleId}: expected at least 3 sources.`);
  if (moduleTerms.length < 5) fail(`${moduleId}: expected at least 5 term cards.`);
  if (!moduleSources.some((source) => trustedSourceTypes.has(source.sourceType))) {
    fail(`${moduleId}: expected at least one durable source.`);
  }
});

const termIds = new Set();
terms.forEach((term, index) => {
  const label = term.id || `term[${index}]`;

  [
    "id",
    "module",
    "titleCn",
    "titleEn",
    "plainMeaning",
    "useWhen",
    "promptPatternCn",
    "promptPatternEn",
    "avoid",
  ].forEach((field) => {
    if (!isString(term[field])) fail(`${label}: missing field "${field}".`);
  });

  assertArray(term.sourceIds, `${label}.sourceIds`);
  assertArray(term.tags, `${label}.tags`);

  if (termIds.has(term.id)) fail(`${label}: duplicate term id.`);
  termIds.add(term.id);

  if (!moduleIds.has(term.module)) fail(`${label}: unknown module "${term.module}".`);

  term.sourceIds.forEach((sourceId) => {
    if (!sourceIds.has(sourceId)) fail(`${label}: references missing source "${sourceId}".`);
  });
});

if (errors.length) {
  console.error("Data validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Data validation passed: ${sources.length} sources, ${terms.length} terms, ${modules.length} modules.`);
