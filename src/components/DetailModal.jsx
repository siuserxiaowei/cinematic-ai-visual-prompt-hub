import { ArrowLeft, ArrowRight, Copy, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function DetailModal({ modulesById, selected, terms, onClose, onSelect }) {
  const [copied, setCopied] = useState("");

  useEffect(() => {
    if (!selected) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!selected) return null;

  const module = modulesById.get(selected.module);
  const currentIndex = terms.findIndex((term) => term.id === selected.id);

  function go(direction) {
    const nextIndex = (currentIndex + direction + terms.length) % terms.length;
    onSelect(terms[nextIndex]);
  }

  async function copy(value, label) {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      // Some smoke-test browsers deny clipboard access; the visible state still confirms intent.
    }
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  }

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label={selected.titleCn}>
      <button type="button" className="modal-backdrop" onClick={onClose} aria-label="关闭详情" />
      <article className="detail-modal" style={{ "--accent": module?.accent ?? "#38bdf8" }}>
        <div className="detail-visual" aria-hidden="true">
          <div className="detail-frame">
            <div className="frame-line one" />
            <div className="frame-line two" />
            <div className="frame-subject" />
            <span>{module?.titleEn}</span>
          </div>
          <div className="detail-thumbs">
            {selected.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-top">
            <div>
              <span className="detail-module">{module?.title}</span>
              <h2>
                {selected.titleCn} <em>/ {selected.titleEn}</em>
              </h2>
            </div>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="关闭">
              <X size={20} />
            </button>
          </div>

          <section>
            <h3>用途</h3>
            <p>{selected.plainMeaning}</p>
            <p className="muted">{selected.useWhen}</p>
          </section>

          <section className="prompt-box">
            <div>
              <h3>中文提示词模板</h3>
              <p>{selected.promptPatternCn}</p>
            </div>
            <button type="button" onClick={() => copy(selected.promptPatternCn, "中文")}>
              <Copy size={15} />
              {copied === "中文" ? "已复制" : "复制"}
            </button>
          </section>

          <section className="prompt-box english">
            <div>
              <h3>English Prompt Pattern</h3>
              <p>{selected.promptPatternEn}</p>
            </div>
            <button type="button" onClick={() => copy(selected.promptPatternEn, "English")}>
              <Copy size={15} />
              {copied === "English" ? "Copied" : "Copy"}
            </button>
          </section>

          <section>
            <h3>避免</h3>
            <p>{selected.avoid}</p>
          </section>

          <section>
            <h3>来源</h3>
            <div className="modal-sources">
              {selected.sources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                  <span>{source.platform}</span>
                  {source.title}
                  <ExternalLink size={13} />
                </a>
              ))}
            </div>
          </section>

          <div className="modal-nav">
            <button type="button" onClick={() => go(-1)}>
              <ArrowLeft size={16} />
              上一个
            </button>
            <span>
              {currentIndex + 1} / {terms.length}
            </span>
            <button type="button" onClick={() => go(1)}>
              下一个
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
