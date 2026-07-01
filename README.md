# 电影级视觉提示词学习站

面向 AI 图片、AI 视频和分镜创作的公开 GitHub Pages 学习站。它把影视基础知识、镜头语言、运镜、布光、构图、相机与影调、分镜脚本和 AI 生成提示词整理成可搜索、可筛选、可复制、可溯源的学习资料库。

## 内容原则

- 资料来自官方文档、影视教学、GitHub 仓库、中文社区、视频平台和公开社交内容。
- 站内只沉淀原创化摘要、术语卡片、提示词模板和来源索引。
- 不搬运受版权保护的全文、截图、视频字幕或大段提示词清单。
- RunningHub 参考页只用于观察样式和分类，不复制其内容资产。

## 本地运行

```bash
npm install
npm run validate:data
npm run build
npm run smoke
npm run dev
```

访问 `http://127.0.0.1:5173/cinematic-ai-visual-prompt-hub/`。

## 项目结构

- `src/data/sources.js`: 来源索引。
- `src/data/terms.js`: 原创术语和提示词卡片。
- `src/data/modules.js`: 九个学习模块。
- `tools/validate-data.mjs`: 数据完整性校验。
- `tools/smoke-check.mjs`: 桌面/移动端渲染冒烟测试。
- `docs/research/source-audit.md`: 检索覆盖和限制说明。
