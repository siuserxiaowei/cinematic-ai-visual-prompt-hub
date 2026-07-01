import {
  BookOpen,
  ChevronRight,
  Clapperboard,
  Github,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import DetailModal from "./components/DetailModal.jsx";
import ModuleCarousel from "./components/ModuleCarousel.jsx";
import SourceCard from "./components/SourceCard.jsx";
import TermCard from "./components/TermCard.jsx";
import { modules } from "./data/modules.js";
import { sources } from "./data/sources.js";
import { terms } from "./data/terms.js";
import { filterTerms, getModuleStats, getPlatforms } from "./lib/search.js";

const conceptLinks = [
  { label: "镜头语言", value: "dolly" },
  { label: "电影感布光", value: "低调光" },
  { label: "分镜脚本", value: "storyboard" },
  { label: "图生视频", value: "图生视频" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [moduleId, setModuleId] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [priority, setPriority] = useState("all");
  const [selected, setSelected] = useState(null);

  const moduleStats = useMemo(() => getModuleStats({ modules, sources, terms }), []);
  const modulesById = useMemo(() => new Map(moduleStats.map((module) => [module.id, module])), [moduleStats]);
  const platforms = useMemo(() => getPlatforms(sources), []);
  const visibleTerms = useMemo(
    () => filterTerms({ terms, sources, query, moduleId, platform, priority }),
    [query, moduleId, platform, priority],
  );
  const visibleSources = useMemo(() => {
    const sourceIds = new Set(visibleTerms.flatMap((term) => term.sourceIds));
    return sources.filter((source) => sourceIds.has(source.id)).slice(0, 18);
  }, [visibleTerms]);
  const firstReadSources = useMemo(() => sources.filter((source) => source.priority === "先读"), []);
  const limitedSources = useMemo(() => sources.filter((source) => source.limitations), []);

  return (
    <>
      <div className="site-shell">
        <header className="topbar">
          <a href="#top" className="brand">
            <Clapperboard size={21} />
            <span>电影级视觉提示词学习站</span>
          </a>
          <nav aria-label="主导航">
            <a href="#atlas">学习</a>
            <a href="#sources">资料库</a>
            <a href="#method">方法</a>
            <a href="https://github.com/siuserxiaowei/cinematic-ai-visual-prompt-hub">
              <Github size={16} />
              GitHub
            </a>
          </nav>
        </header>

        <main id="top">
          <section className="hero-section">
            <div className="hero-media" aria-hidden="true" />
            <div className="hero-copy">
              <h1>电影级视觉提示词学习站</h1>
              <p className="hero-subtitle">Cinematic AI Visual Prompt Atlas</p>
              <p className="hero-intro">
                把影视镜头语言、构图、布光、分镜和 AI 视频提示词整理成可搜索、可复制、可溯源的学习地图。
              </p>
              <label className="search-box" htmlFor="searchInput">
                <Search size={20} />
                <input
                  id="searchInput"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索镜头、构图、运镜、布光、分镜"
                />
              </label>
              <div className="quick-searches" aria-label="快速搜索">
                {conceptLinks.map((item) => (
                  <button type="button" key={item.label} onClick={() => setQuery(item.value)}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-panel">
              <div className="monitor-grid" aria-hidden="true">
                {Array.from({ length: 12 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>
              <div className="hero-stat-row">
                <span>{sources.length} sources</span>
                <span>{terms.length} prompt cards</span>
                <span>{limitedSources.length} caveats</span>
              </div>
            </div>
          </section>

          <section className="module-zone" aria-label="模块选择">
            <ModuleCarousel modules={moduleStats} activeModuleId={moduleId} onSelect={setModuleId} />
          </section>

          <section className="content-band" id="atlas">
            <div className="section-heading">
              <div>
                <p className="section-label">
                  <Sparkles size={15} />
                  Prompt Atlas
                </p>
                <h2>从术语到可复制镜头</h2>
              </div>
              <p>{visibleTerms.length} 张卡片匹配当前筛选</p>
            </div>

            <div className="filter-row">
              <label>
                模块
                <select value={moduleId} onChange={(event) => setModuleId(event.target.value)}>
                  <option value="all">全部模块</option>
                  {moduleStats.map((module) => (
                    <option value={module.id} key={module.id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                平台
                <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
                  <option value="all">全部平台</option>
                  {platforms.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                优先级
                <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                  <option value="all">全部</option>
                  <option value="先读">先读</option>
                  <option value="参考">参考</option>
                </select>
              </label>
            </div>

            {visibleTerms.length ? (
              <div className="term-grid">
                {visibleTerms.map((term) => (
                  <TermCard
                    key={term.id}
                    module={modulesById.get(term.module)}
                    term={term}
                    onOpen={(nextTerm) => setSelected(nextTerm)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <BookOpen size={28} />
                <p>没有匹配的镜头卡。换个关键词，比如 “dolly”、 “低调光” 或 “分镜”。</p>
              </div>
            )}
          </section>

          <section className="content-band split-band" id="method">
            <div className="method-panel">
              <p className="section-label">
                <ShieldCheck size={15} />
                Source Policy
              </p>
              <h2>不是搬运提示词库，而是把镜头知识重写成自己的创作工具。</h2>
              <p>
                站内只保留原创化摘要、术语卡片、提示词模板和来源索引。官方文档与影视教学优先，社媒和视频教程用于发现趋势，并标注可访问性或时效风险。
              </p>
            </div>
            <div className="method-steps">
              {[
                ["01", "先用影视语言定义镜头", "景别、角度、构图和布光先成立，AI 生成才不空。"],
                ["02", "再写模型可执行动作", "把推拉摇移、焦点、首尾帧、时间线写成明确控制。"],
                ["03", "最后记录来源与限制", "每条卡片都能回到来源，动态平台只当趋势参考。"],
              ].map(([step, title, body]) => (
                <article key={step}>
                  <span>{step}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-band" id="sources">
            <div className="section-heading">
              <div>
                <p className="section-label">
                  <BookOpen size={15} />
                  Source Library
                </p>
                <h2>当前筛选关联资料</h2>
              </div>
              <a className="text-link" href="#atlas">
                回到卡片 <ChevronRight size={15} />
              </a>
            </div>

            <div className="source-grid">
              {visibleSources.map((source) => (
                <SourceCard key={source.id} module={modulesById.get(source.module)} source={source} />
              ))}
            </div>
          </section>

          <section className="content-band caveat-band">
            <div>
              <p className="section-label">Research Notes</p>
              <h2>检索边界</h2>
            </div>
            <ul>
              <li>X/Twitter、抖音、小红书等动态平台只作为趋势发现，不能当权威定义。</li>
              <li>Sora、Runway、Veo、可灵、万相、Luma 等模型能力会变，模型相关结论保留 checked-at 语境。</li>
              <li>提示词清单不整段搬运，只提炼模式、术语和可学习结构。</li>
            </ul>
          </section>
        </main>
      </div>

      <DetailModal
        modulesById={modulesById}
        selected={selected}
        terms={visibleTerms}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </>
  );
}
