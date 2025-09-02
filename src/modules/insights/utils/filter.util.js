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

/**
 * Converts board filters array format to dimension filters object format
 * @param {Array} boardFilters - Array of filter objects with {dimension, value} structure
 * @returns {Object} Object with {dimension: value} structure
 */
export const convertBoardFiltersToDimensionFilters = (boardFilters) => {
  if (!boardFilters || !Array.isArray(boardFilters)) {
    return {};
  }

  const dimensionFilters = {};
  for (const filter of boardFilters) {
    if (filter?.dimension) {
      dimensionFilters[filter.dimension] = filter.value;
    }
  }
  return dimensionFilters;
};
