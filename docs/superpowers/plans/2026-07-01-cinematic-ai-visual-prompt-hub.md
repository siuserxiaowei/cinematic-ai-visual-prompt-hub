# Cinematic AI Visual Prompt Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a public GitHub Pages learning site that collects cinematic AI visual/video prompting knowledge, then add the entry to the user's GitHub profile and portfolio.

**Architecture:** React + Vite static app hosted on GitHub Pages. Content lives in versioned local data modules, validation scripts enforce source coverage and schema, and Playwright smoke tests verify the rendered learning flow.

**Tech Stack:** React, Vite, CSS modules/global CSS, Node validation scripts, Playwright smoke script, GitHub Actions Pages deployment.

## Global Constraints

- The site must be public and suitable for GitHub Pages.
- The site must use the reference page only for style/taxonomy inspiration, not wholesale copying of third-party content or media.
- Search must cover official docs, GitHub, Chinese web, Zhihu, Douyin web results, Xiaohongshu web results, YouTube, and X/Twitter public results where accessible.
- Research output must record source platform and access limitations.
- The first screen must be the usable learning experience, not a generic landing page.
- Use React + Vite unless an existing project constraint makes that impossible.
- No hidden backend or runtime secret is allowed; all production data must be static.
- Validation must prove all nine modules exist and required platforms are represented or explicitly marked as access-limited.
- Final delivery must include a public repo URL, live Pages URL, profile entry, portfolio entry, and verification evidence.

---

## File Structure

- Create `package.json`: scripts for dev, build, preview, validation, smoke.
- Create `index.html`: Vite mount point and metadata.
- Create `vite.config.js`: GitHub Pages base path `/cinematic-ai-visual-prompt-hub/`.
- Create `src/main.jsx`: React entry.
- Create `src/App.jsx`: app shell, layout composition, search/filter state, modal state.
- Create `src/styles.css`: design tokens, responsive layout, animation, components.
- Create `src/data/modules.js`: nine module definitions and palette metadata.
- Create `src/data/sources.js`: curated source index from research.
- Create `src/data/terms.js`: original term/prompt cards tied to source IDs.
- Create `src/lib/search.js`: normalized search/filter helpers.
- Create `tools/validate-data.mjs`: schema, duplicate, module, platform, and source reference checks.
- Create `tools/smoke-check.mjs`: local static server plus Playwright desktop/mobile checks.
- Create `.github/workflows/pages.yml`: build and deploy GitHub Pages.
- Modify `README.md`: user-facing introduction, local commands, source policy.
- Later modify `/Users/siuserxiaowei/siuserxiaowei/README.md`: add repo/live entry without reverting existing user changes.
- Later clone/modify `siuserxiaowei.github.io`: add portfolio entry without disturbing unrelated state.

---

### Task 1: Scaffold React/Vite App and Validation Harness

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Create: `src/data/modules.js`
- Create: `src/data/sources.js`
- Create: `src/data/terms.js`
- Create: `src/lib/search.js`
- Create: `tools/validate-data.mjs`
- Create: `tools/smoke-check.mjs`
- Modify: `README.md`

**Interfaces:**
- Produces `modules`, `sources`, and `terms` named exports consumed by app and validators.
- Produces `filterTerms({ terms, sources, query, moduleId, platform })` returning an array of enriched term cards.

- [ ] **Step 1: Add app dependencies and scripts**

Create `package.json` with scripts:

```json
{
  "name": "cinematic-ai-visual-prompt-hub",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1",
    "validate:data": "node tools/validate-data.mjs",
    "smoke": "node tools/smoke-check.mjs"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "vite": "^7.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "playwright": "^1.53.0"
  }
}
```

- [ ] **Step 2: Add minimal failing validator**

Create `tools/validate-data.mjs` that imports `modules`, `sources`, and `terms`; fails until all nine module IDs, required source fields, required term fields, and source references exist.

- [ ] **Step 3: Add minimal app shell**

Create `src/App.jsx` rendering the title `电影级视觉提示词学习站`, the nine modules, a search input with id `searchInput`, and term cards with class `term-card`.

- [ ] **Step 4: Run validation and build**

Run:

```bash
npm install
npm run validate:data
npm run build
```

Expected: validation and build pass after seed data exists.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json index.html vite.config.js src tools README.md
git commit -m "chore: scaffold cinematic prompt hub"
```

---

### Task 2: Curate Research Data and Prompt Cards

**Files:**
- Modify: `src/data/sources.js`
- Modify: `src/data/terms.js`
- Modify: `src/data/modules.js`
- Create: `docs/research/source-audit.md`

**Interfaces:**
- `sources` must include at least 60 records.
- `terms` must include at least 54 original cards, six or more per major learning cluster where feasible.
- Every term `sourceIds` item must point to an existing source ID.

- [ ] **Step 1: Consolidate research**

Merge research from main searches and subagent reports into `docs/research/source-audit.md`. Include platform coverage, excluded weak sources, and access limitations.

- [ ] **Step 2: Populate `sources`**

Add official docs, GitHub repos, Chinese web/community links, video/social links, and the RunningHub reference page as a style/taxonomy reference. Summaries must be original and short.

- [ ] **Step 3: Populate `terms`**

Write original learning cards for shot size, angle, movement, lighting, composition, color/camera looks, micro-expression, storyboard, continuity, and AI prompt construction. Include Chinese and English prompt patterns.

- [ ] **Step 4: Validate data**

Run:

```bash
npm run validate:data
```

Expected: pass; if platform search is restricted, corresponding sources must set `limitations`.

- [ ] **Step 5: Commit**

```bash
git add src/data docs/research/source-audit.md
git commit -m "feat: add cinematic prompting research data"
```

---

### Task 3: Implement Reference-Inspired Cinematic UI

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Modify: `src/lib/search.js`
- Create: `src/components/ModuleCarousel.jsx`
- Create: `src/components/TermCard.jsx`
- Create: `src/components/SourceCard.jsx`
- Create: `src/components/DetailModal.jsx`

**Interfaces:**
- `ModuleCarousel` accepts `{ modules, activeModuleId, onSelect }`.
- `TermCard` accepts `{ term, sourceCount, onOpen }`.
- `DetailModal` accepts `{ term, sources, onClose }`.
- `SourceCard` accepts `{ source }`.

- [ ] **Step 1: Build first viewport**

Implement full-screen dark cinematic hero with background visual, glass navigation, live search, module carousel, and visible next-section hint.

- [ ] **Step 2: Build browsing sections**

Implement module rows, term cards, source index, platform filters, priority chips, and empty state.

- [ ] **Step 3: Build modal**

Implement detail modal with keyboard close, source links, copy buttons for Chinese and English prompt patterns, and visible copied state.

- [ ] **Step 4: Implement search helpers**

`filterTerms` must search title, English term, tags, prompt patterns, source title, source platform, and module text.

- [ ] **Step 5: Run build**

```bash
npm run build
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src
git commit -m "feat: implement cinematic learning interface"
```

---

### Task 4: Add Visual Assets and Fidelity Polish

**Files:**
- Create: `assets/`
- Modify: `src/styles.css`
- Modify: `src/App.jsx`
- Modify: `src/data/modules.js`

**Interfaces:**
- App references project-local assets only for generated imagery.
- No project asset may point to a temporary generated-image path.

- [ ] **Step 1: Generate concept and hero/category assets**

Use Image Gen for a full-page concept and project-bound cinematic hero/background asset. Save selected assets in `assets/`.

- [ ] **Step 2: Apply design system**

Extract colors, typography, radii, shadows, spacing, and motion timing into CSS variables.

- [ ] **Step 3: Polish responsive states**

Verify desktop, tablet, and mobile layouts do not clip, overlap, or overflow. Cards must keep stable dimensions.

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add assets src
git commit -m "style: polish cinematic visual system"
```

---

### Task 5: Add Smoke Tests and GitHub Pages Deployment

**Files:**
- Modify: `tools/smoke-check.mjs`
- Create: `.github/workflows/pages.yml`
- Modify: `README.md`

**Interfaces:**
- `npm run smoke` starts a static server from `dist` or project root and verifies rendered behavior.
- GitHub Pages workflow builds with `npm ci`, `npm run validate:data`, and `npm run build`.

- [ ] **Step 1: Implement smoke check**

The smoke script must verify title, h1, non-empty cards, no desktop/mobile horizontal overflow, search for `dolly` or `推镜`, modal open/close, and copy button state.

- [ ] **Step 2: Add Pages workflow**

Create `.github/workflows/pages.yml` using GitHub Actions Pages artifact deployment from `dist`.

- [ ] **Step 3: Run local gates**

```bash
npm run validate:data
npm run build
npm run smoke
```

Expected: all pass.

- [ ] **Step 4: Commit**

```bash
git add tools .github README.md
git commit -m "ci: add pages deployment and smoke checks"
```

---

### Task 6: Publish and Integrate Personal Entries

**Files:**
- Modify: remote GitHub repo settings via `gh`.
- Modify: `/Users/siuserxiaowei/siuserxiaowei/README.md`
- Modify: local checkout of `siuserxiaowei.github.io` after cloning.

**Interfaces:**
- Public repo URL: `https://github.com/siuserxiaowei/cinematic-ai-visual-prompt-hub`
- Live URL: `https://siuserxiaowei.github.io/cinematic-ai-visual-prompt-hub/`

- [ ] **Step 1: Create public GitHub repo and push**

```bash
gh repo create siuserxiaowei/cinematic-ai-visual-prompt-hub --public --source . --remote origin --push
```

- [ ] **Step 2: Enable GitHub Pages**

Use GitHub Actions Pages workflow. Confirm deployment succeeds and the live URL returns HTTP 200.

- [ ] **Step 3: Update profile README**

Add one concise entry to `/Users/siuserxiaowei/siuserxiaowei/README.md` linking repo and live page. Preserve unrelated existing dirty changes.

- [ ] **Step 4: Update portfolio repo**

Clone `siuserxiaowei.github.io` if absent, add a portfolio item linking repo and live page, run its available validation/build, commit, and push.

- [ ] **Step 5: Final verification**

Verify public repo, live page, profile link, and portfolio link. Capture desktop/mobile screenshots for final report.

---

## Self-Review

- Spec coverage: the six tasks cover repo setup, research, UI, assets/fidelity, validation/deploy, and profile/portfolio integration.
- Placeholder scan: no TBD/TODO placeholders remain.
- Type consistency: `modules`, `sources`, `terms`, and `filterTerms` are the stable cross-task interfaces.
- Scope: the plan keeps one public learning site as the unit of work; profile and portfolio updates are integration tasks after publish.
