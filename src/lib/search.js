export function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFKC")
    .trim();
}

export function getSourceMap(sources) {
  return new Map(sources.map((source) => [source.id, source]));
}

export function enrichTerms(terms, sources) {
  const sourceMap = getSourceMap(sources);

  return terms.map((term) => {
    const linkedSources = term.sourceIds.map((id) => sourceMap.get(id)).filter(Boolean);

    return {
      ...term,
      sources: linkedSources,
      platforms: [...new Set(linkedSources.map((source) => source.platform))],
      priority: linkedSources.some((source) => source.priority === "先读") ? "先读" : "参考",
    };
  });
}

export function filterTerms({ terms, sources, query, moduleId, platform, priority }) {
  const needle = normalizeText(query);
  const enriched = enrichTerms(terms, sources);

  return enriched.filter((term) => {
    if (moduleId !== "all" && term.module !== moduleId) return false;
    if (platform !== "all" && !term.platforms.includes(platform)) return false;
    if (priority !== "all" && term.priority !== priority) return false;
    if (!needle) return true;

    const haystack = [
      term.titleCn,
      term.titleEn,
      term.plainMeaning,
      term.useWhen,
      term.promptPatternCn,
      term.promptPatternEn,
      term.avoid,
      ...(term.tags ?? []),
      ...term.sources.flatMap((source) => [
        source.title,
        source.platform,
        source.category,
        source.summary,
        source.learningValue,
        ...(source.terms ?? []),
      ]),
    ]
      .map(normalizeText)
      .join(" ");

    return haystack.includes(needle);
  });
}

export function getPlatforms(sources) {
  return [...new Set(sources.map((source) => source.platform))].sort((a, b) =>
    a.localeCompare(b, "zh-Hans-CN"),
  );
}

export function getModuleStats({ modules, terms, sources }) {
  const sourceCounts = new Map();
  const termCounts = new Map();

  sources.forEach((source) => {
    sourceCounts.set(source.module, (sourceCounts.get(source.module) ?? 0) + 1);
  });

  terms.forEach((term) => {
    termCounts.set(term.module, (termCounts.get(term.module) ?? 0) + 1);
  });

  return modules.map((module) => ({
    ...module,
    sourceCount: sourceCounts.get(module.id) ?? 0,
    termCount: termCounts.get(module.id) ?? 0,
  }));
}
