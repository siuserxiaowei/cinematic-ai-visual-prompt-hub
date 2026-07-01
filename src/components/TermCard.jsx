import { Copy, ExternalLink } from "lucide-react";

export default function TermCard({ module, term, onOpen }) {
  return (
    <article className="term-card" style={{ "--accent": module?.accent ?? "#38bdf8" }}>
      <button type="button" className="term-card-main" onClick={() => onOpen(term)}>
        <span className="term-card-kicker">{module?.title ?? "未分类"}</span>
        <h3>{term.titleCn}</h3>
        <p className="term-en">{term.titleEn}</p>
        <p>{term.plainMeaning}</p>
      </button>
      <div className="term-card-footer">
        <span>{term.sources.length} sources</span>
        <span>{term.priority}</span>
      </div>
      <div className="term-tags">
        {term.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="term-actions" aria-label="卡片操作">
        <button type="button" onClick={() => navigator.clipboard?.writeText(term.promptPatternEn)}>
          <Copy size={15} />
          <span>复制</span>
        </button>
        {term.sources[0] ? (
          <a href={term.sources[0].url} target="_blank" rel="noreferrer">
            <ExternalLink size={15} />
            <span>来源</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
