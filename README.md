<div align="center">

# 电影级视觉提示词学习站

把电影课里的镜头语言，翻译成 AI 图片和 AI 视频都能用的创作语言。

[在线访问](https://siuserxiaowei.github.io/cinematic-ai-visual-prompt-hub/) · [学习地图](#learning-map) · [快速开始](#quick-start)

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=github)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=111111)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=ffffff)
![AI Video](https://img.shields.io/badge/AI%20Video-prompt%20hub-f472b6)
![Cinematography](https://img.shields.io/badge/Cinematography-learning%20cards-facc15)

</div>

<img src="assets/cinematic-research-wall.png" alt="电影级视觉提示词学习站界面预览" />

## Why

AI 视频不是把形容词堆得越多越电影感。

真正有用的是：你知道这个镜头该用什么景别、相机怎么动、光从哪里来、主体做什么、情绪怎么被画面放大。这个站就是把这些影视基础，整理成可以直接学习和改写的提示词卡片。

## Highlights

| Feature | What it helps with |
| --- | --- |
| 59 张术语卡片 | 快速理解景别、构图、布光、运镜、影调、分镜和 AI 生成参数 |
| 9 个学习模块 | 从镜头基础到 AI 视频提示词系统，按创作路径组织 |
| 87 个资料来源 | 汇总官方文档、影视教学、GitHub 项目、中文社区和视频教程 |
| 搜索与筛选 | 按关键词、模块、平台和优先级找到可用参考 |
| 可复制提示词骨架 | 把镜头设计拆成主体、环境、镜头、光线、动作和节奏 |

## Learning Map

| Module | Learn to control |
| --- | --- |
| 构图拍摄 | 景别、角度、机位、焦段、画面框架 |
| 电影级构图 | 三分法、引导线、对称、留白、空间层次 |
| 电影感布光 | 主光、辅光、轮廓光、实景光、低调光 |
| 相机与影调 | 镜头质感、胶片颗粒、动态范围、色彩科学 |
| 镜头语言 AI | 推、拉、摇、移、跟、升降、环绕、变焦 |
| 微表情控制 | 眼神、呼吸、眨眼、嘴角、克制情绪 |
| 分镜脚本 | 镜头表、关键帧、首尾帧、多镜头提示词 |
| 分镜逻辑 | 轴线、视线匹配、转场、蒙太奇、空间连续性 |
| AI 镜头构建 | 图生视频、负面提示、时间线、模型差异 |

## Use Cases

- 给 Midjourney、GPT Image、即梦、可灵、Runway、Veo、Wan、Luma 写更具体的视觉提示词。
- 做短剧、广告片、产品视频、角色设定、分镜脚本和视觉参考图。
- 把“电影感”“高级感”“有氛围”这类空话，拆成能执行的镜头和画面决策。
- 给自己的 AI 视频工作流建立一套可复用的镜头词库。

## How To Use

1. 打开 [在线站点](https://siuserxiaowei.github.io/cinematic-ai-visual-prompt-hub/)。
2. 从一个模块开始，比如“镜头语言 AI”或“电影感布光”。
3. 搜索你想控制的效果，比如 `dolly in`、`低调光`、`首尾帧`、`眼神微动`。
4. 打开卡片，复制提示词骨架。
5. 替换主体、场景、动作和情绪，放进你的图片或视频模型里测试。

## Quick Start

```bash
npm install
npm run dev
```

默认访问：

```text
http://127.0.0.1:5173/cinematic-ai-visual-prompt-hub/
```

构建和校验：

```bash
npm run validate:data
npm run build
npm run smoke
```

## Project Structure

```text
src/data/sources.js        资料来源索引
src/data/terms.js          术语和提示词卡片
src/data/modules.js        学习模块配置
src/components/            页面卡片、弹窗和模块组件
tools/validate-data.mjs    数据完整性校验
tools/smoke-check.mjs      桌面和移动端冒烟测试
docs/research/             检索覆盖和限制说明
```

## Research Notes

资料覆盖 Runway、Veo、Kling、Wan、Luma、StudioBinder、Boords、ARRI、Kodak、Zhihu、B 站、YouTube、GitHub 等公开来源。社交平台内容变化很快，所以这里只把它们当作趋势线索；核心定义优先参考官方文档和影视教学资料。完整记录见 [source audit](docs/research/source-audit.md)。
