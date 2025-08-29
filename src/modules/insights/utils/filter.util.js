/**
 * Compute filters for each insight based on metrics, activeFilters, and existing filters
 * @param {Object} insight - Insight configuration object
 * @param {Object} activeFilters - Currently active filters from the UI
 * @returns {Object} Computed filters object
 */
export function computeInsightFilters(insight, activeFilters) {
  const filters = { ...insight?.filters };
  if (!insight?.metrics) return filters;

  insight.metrics.forEach((metric) => {
    const metricKey = metric.metricKey;
    const metricFilters =
      Object.keys(activeFilters)
        .filter((dimension) => !!activeFilters?.[dimension])
        .map((dimension) => ({
          key: dimension,
          value: activeFilters[dimension],
        })) || [];

    const existing = filters?.[metricKey] || {};
    // Remove any dimensionFilters for dimensions that are in activeFilters
    const preserved = (existing.dimensionFilters || []).filter(
      (f) => !metricFilters || !metricFilters.find((mf) => mf.key === f.dimension)
    );
    filters[metricKey] = {
      ...existing,
      dimensionFilters: [...preserved, ...metricFilters],
    };
  });
  return filters;
}
