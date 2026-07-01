export default function ModuleCarousel({ modules, activeModuleId, onSelect }) {
  return (
    <section className="module-rail" aria-label="学习模块">
      <button
        type="button"
        className={`module-card ${activeModuleId === "all" ? "is-active" : ""}`}
        onClick={() => onSelect("all")}
        style={{ "--accent": "#e5e7eb" }}
      >
        <span className="module-icon">ALL</span>
        <strong>全部模块</strong>
        <small>完整提示词地图</small>
      </button>
      {modules.map((module) => {
        const Icon = module.icon;

        return (
          <button
            type="button"
            className={`module-card ${activeModuleId === module.id ? "is-active" : ""}`}
            key={module.id}
            onClick={() => onSelect(module.id)}
            style={{ "--accent": module.accent }}
          >
            <span className="module-icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.8} />
            </span>
            <strong>{module.title}</strong>
            <small>
              {module.termCount} 张卡 · {module.sourceCount} 源
            </small>
          </button>
        );
      })}
    </section>
  );
}
