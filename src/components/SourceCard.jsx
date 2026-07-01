import { ExternalLink } from "lucide-react";

export default function SourceCard({ module, source }) {
  return (
    <article className="source-card" style={{ "--accent": module?.accent ?? "#38bdf8" }}>
      <div>
        <span className="source-platform">{source.platform}</span>
        <h3>{source.title}</h3>
        <p>{source.learningValue}</p>
      </div>
      <div className="source-meta">
        <span>{module?.title ?? source.module}</span>
        <span>{source.priority}</span>
        {source.limitations ? <span>有备注</span> : null}
      </div>
      <a href={source.url} target="_blank" rel="noreferrer">
        打开来源 <ExternalLink size={14} />
      </a>
    </article>
  );
}
