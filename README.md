# 电影级视觉提示词学习站

把电影课里的镜头语言，翻译成 AI 图片和 AI 视频都能用的创作语言。

[在线访问](https://siuserxiaowei.github.io/cinematic-ai-visual-prompt-hub/) · [资料审计](docs/research/source-audit.md)

<img src="assets/cinematic-research-wall.png" alt="电影级视觉提示词学习站界面预览" />

## 这是什么

这是一个面向 AI 视觉创作者的学习型资料库。它不是简单堆提示词，而是把“为什么这个镜头有电影感”拆成可以学习、搜索和复用的知识卡：

- 景别、角度、机位、焦段和构图怎么影响画面叙事。
- 主光、辅光、轮廓光、低调光、实景光怎么写进提示词。
- 推、拉、摇、移、跟、环绕、变焦等运镜词该怎么用。
- 分镜脚本、关键帧、首尾帧、时间线提示词如何组织。
- Runway、Veo、Kling、Wan、Luma、Sora 等模型文档里真正值得吸收的提示词结构。

最初的灵感来自 RunningHub 里的电影级视觉提示词库形态，但本站重新做了公开资料检索、结构整理和原创化改写，不复制对方内容资产。

## 适合谁

- 想让 AI 图片、AI 视频少一点“随机好看”，多一点镜头设计的人。
- 做短剧、广告片、产品视频、分镜脚本、视觉参考图的创作者。
- 想补影视基础，但不想一上来啃厚教材的新手。
- 想把公开资料沉淀成可筛选学习站的 AI 工具玩家。

## 里面有什么

| 内容 | 当前规模 |
| --- | ---: |
| 学习模块 | 9 个 |
| 术语和提示词卡片 | 59 张 |
| 公开资料来源 | 87 个 |
| 优先阅读来源 | 18 个 |

九个模块分别是：

1. 构图拍摄
2. 电影级构图
3. 电影感布光
4. 相机与影调
5. 镜头语言 AI
6. 微表情控制
7. 分镜脚本
8. 分镜逻辑
9. AI 镜头构建

## 怎么用

打开在线站点后，可以按三种方式学习：

- 按模块浏览：先从构图、布光、运镜这些基础语言入手。
- 按关键词搜索：比如 `dolly in`、`低调光`、`首尾帧`、`眼神微动`。
- 点开卡片复制提示词骨架：把主体、环境、镜头、光线、动作、节奏换成自己的项目内容。

建议学习路径：

1. 先看“构图拍摄”和“电影级构图”，理解画面怎么组织注意力。
2. 再看“电影感布光”和“相机与影调”，建立质感词库。
3. 然后看“镜头语言 AI”，把静态画面变成可控运动。
4. 最后看“分镜脚本”和“AI 镜头构建”，把单条提示词升级成一组镜头。

## 资料来源

资料覆盖官方文档、影视教学、GitHub 仓库、中文社区、视频平台和公开社交内容。比较重要的来源包括：

- Runway、Google Veo、Kling、Wan、Luma、Adobe Firefly、OpenAI Developers。
- StudioBinder、Adobe、Boords、UCI film glossary、ARRI、Kodak、Blackmagic Design。
- Zhihu、WaytoAGI、少数派、人人都是产品经理、博客园、CSDN、数英网、掘金。
- B 站、抖音网页结果、YouTube、X/Twitter 公开片段。
- Wan2.1、HunyuanVideo prompt handbook、DirectorsConsole、awesome-ai-video-prompts 等 GitHub 资料。

动态社交平台的内容会变化，所以抖音、小红书、X/Twitter 只作为趋势线索，不当作权威定义来源。更完整的检索说明见 [Source Audit](docs/research/source-audit.md)。

## 内容边界

本站只沉淀原创摘要、术语解释、提示词骨架和来源索引。不搬运受版权保护的全文、截图、视频字幕，也不复制大段提示词清单。

## 本地运行

```bash
npm install
npm run validate:data
npm run build
npm run smoke
npm run dev
```

按终端输出的 Vite 地址访问。默认是：

```text
http://127.0.0.1:5173/cinematic-ai-visual-prompt-hub/
```

## 项目结构

```text
src/data/sources.js        资料来源索引
src/data/terms.js          术语和提示词卡片
src/data/modules.js        学习模块配置
src/components/            页面卡片、弹窗和模块组件
tools/validate-data.mjs    数据完整性校验
tools/smoke-check.mjs      桌面和移动端冒烟测试
docs/research/             检索覆盖和限制说明
```

## 维护原则

- 新增来源时，先判断它是官方文档、影视教学、案例教程、社交趋势还是二手整理。
- 新增术语时，至少关联一个可信来源，避免只凭感觉写定义。
- 不追求“提示词越长越专业”，优先让镜头意图、主体动作和画面约束说清楚。
- 模型能力会变，涉及具体模型效果的结论需要标注时间和来源。
