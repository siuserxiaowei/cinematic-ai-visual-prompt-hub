# Cinematic AI Visual Prompt Hub Design

## Goal

Build a public GitHub Pages learning site for cinematic visual prompting. The site should help creators turn film language into better AI image/video prompts, while linking back to reliable sources for deeper study.

## Audience

- AI video/image creators who need practical camera, lighting, composition, and storyboard language.
- The user's personal GitHub/profile/portfolio visitors who want to see a polished, useful public learning artifact.
- Chinese-first learners who still need English prompt terms for tools such as Runway, Veo, Kling, Midjourney, Sora-like workflows, and Wanxiang.

## Content Scope

The site will contain these primary modules:

1. 构图拍摄: shot sizes, angles, camera position, framing, lens/focal length basics.
2. 电影级构图: rule of thirds, leading lines, symmetry, negative space, foreground framing, voyeur framing.
3. 电影感布光: key/fill/rim, Rembrandt, butterfly, silhouette, practical light, volumetric light, cyberpunk lighting.
4. 相机与影调: ARRI/RED/IMAX references, film stock/color language, dynamic range, grain, lens texture.
5. 镜头语言 AI: push-in, pull-back, pan, tilt, tracking, dolly zoom, orbit, crane, drone, handheld, macro motion.
6. 微表情控制: eye movement, blink, breath, mouth tension, brows, gaze direction, restrained emotional changes.
7. 分镜脚本: shot list, storyboard card, keyframe prompt, multi-shot sequence prompt.
8. 分镜逻辑: 180-degree rule, match cut, eye-line match, montage, reveal, continuity.
9. AI 镜头构建: static image to video, first/last frame, motion constraints, prompt formula, negative prompt strategy.

## Source Policy

- Search and record sources from official docs, web articles, GitHub repositories, Zhihu, Douyin web results, Xiaohongshu web results, YouTube, X/Twitter public results, Bilibili/creator results, and other relevant public pages.
- Prefer source links and distilled learning value over copied text.
- Keep quotes short or avoid quotes entirely.
- Store platform access limitations in the research notes when a platform cannot be searched reliably without login.
- Treat the RunningHub page as a style and taxonomy reference, not as a source to clone wholesale.

## UX Requirements

- First viewport: full-screen cinematic opening with background visual, dark atmosphere, concise Chinese title, English secondary line, search, and category navigation.
- Main experience: actual usable learning index as the first screen, not a marketing landing page.
- Content browsing: category cards, search, filters by module/platform/priority, and source cards.
- Learning mode: term cards with Chinese explanation, English prompt phrase, when to use, prompt pattern, and source-backed note.
- Detail mode: modal or side panel that lets the user copy prompt snippets and inspect source links.
- Mobile: no horizontal overflow, readable text, sticky search/filter controls where useful.
- Portfolio integration: add the final live URL to the profile README and personal portfolio repo after Pages is published.

## Visual Direction

Use a refined dark cinematic interface inspired by the reference page:

- Black/near-black background with subtle radial light and film-grain texture.
- Large image/video-led first viewport.
- Compact glass navigation and search.
- Horizontal card rows on desktop, responsive grid on mobile.
- Neon-but-restrained accents: amber, cyan, violet, green, rose. Avoid a one-note purple/blue palette.
- Dense but readable card anatomy: title, category, prompt phrase, tags, source/platform signal.
- Immersive detail overlay with media/visual panel on the left and copyable prompt/learning notes on the right.
- Rounded cards can be expressive, but repeated UI cards should stay deliberate and not become generic nested cards.

## Architecture

Use React + Vite for the site because the requested experience needs real client-side filtering, modal state, and polished interaction. Keep the content data as local static JavaScript/JSON modules so GitHub Pages can host it without a backend. Add validation scripts to check source shape, platform coverage, required modules, duplicate URLs, and basic link health.

## Data Model

Each source record:

- `id`
- `title`
- `url`
- `platform`
- `module`
- `category`
- `priority`
- `sourceType`
- `summary`
- `learningValue`
- `terms`
- `limitations`

Each term/prompt card:

- `id`
- `module`
- `titleCn`
- `titleEn`
- `plainMeaning`
- `useWhen`
- `promptPatternCn`
- `promptPatternEn`
- `avoid`
- `sourceIds`
- `tags`

## Verification Gates

- `npm run validate:data` passes.
- `npm run build` passes.
- Render smoke test proves desktop and mobile load, no blank page, no horizontal overflow, search returns expected cards, at least one modal opens and copy button state changes.
- Visual QA compares generated/accepted concept with rendered screenshots before final handoff.
- Public GitHub repository exists and GitHub Pages URL returns HTTP 200.
- Profile and portfolio entries point to the public repo and live page.
