export const pivotChartConfigResolver = async ([metric], filters) => {
  const chartsConfig = {
    dataKey: metric?.metricKey,
    row: filters?.[metric?.metricKey]?.showPivotIn?.row,
    column: filters?.[metric?.metricKey]?.showPivotIn?.column,
  };
  return chartsConfig;
};
