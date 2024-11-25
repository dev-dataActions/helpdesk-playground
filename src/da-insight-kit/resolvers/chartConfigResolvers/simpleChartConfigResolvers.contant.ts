import { ChartTypes } from "../constants/charts.contant";
import { getDimensionOptions } from "../services/dimensions.svc";
import { shuffle } from "../utils/general.util";
import { ColorPalette } from "../constants/colors.constants";
import { TimeGrainAPIKey } from "../constants/date.constant";
import { Metric } from "@/da-insight-kit/utils/insight.util";

export const getDimensionValues = async (metric, dimension, timegrain = "weekly") => {
  const data = await getDimensionOptions({
    timegrain: TimeGrainAPIKey[timegrain],
    metric: metric,
    dimensions: [dimension],
  });
  return data?.dimensions?.[dimension].filter((_, i) => i < 5) ?? [];
};

const colors = shuffle(Object.values(ColorPalette));

const getBarConfig = (metric, index, splitDimensionValues) => {
  if (splitDimensionValues) {
    return splitDimensionValues.map((dimensionValue, i) => ({
      dataKey: dimensionValue,
      color: colors[(index + i) % colors.length],
      stackId: metric?.stackId ?? "1",
    }));
  }
  return [
    {
      dataKey: metric.metricLabel,
      color: colors[index],
      stackId: metric?.stackId,
    },
  ];
};

const getLineConfig = (metric, index, splitDimensionValues) => {
  if (splitDimensionValues) {
    return splitDimensionValues.map((dimensionValue, i) => ({
      dataKey: dimensionValue,
      color: colors[(index + i) % colors.length],
    }));
  }
  return [
    {
      dataKey: metric.metricLabel,
      color: colors[index],
      yAxisId: metric.yAxisId,
    },
  ];
};

const getAreaConfig = (metric, index, splitDimensionValues) => {
  if (splitDimensionValues) {
    return splitDimensionValues.map((dimensionValue, i) => ({
      dataKey: dimensionValue,
      color: colors[(index + i) % colors.length],
    }));
  }
  return [
    {
      dataKey: metric.metricLabel,
      color: colors[index],
    },
  ];
};

export const simpleChartConfigResolver = async (metrics: Metric[], filters) => {
  const chartsConfig = {
    bars: [],
    lines: [],
    areas: [],
  };

  metrics?.forEach(
    (metric) =>
      (metric.filters = {
        ...(filters?.[metric.metricKey] ?? {}),
        timeGrain: filters?.timeGrain,
        timeRange: filters?.timeRange,
      })
  );

  const configPromises = metrics.map(async (metric, index) => {
    let splitDimensionValues = null;
    if (metric?.filters?.showDimensionSplitIn) {
      splitDimensionValues = await getDimensionValues(
        metric.metricKey,
        metric?.filters?.showDimensionSplitIn,
        metric.filters.timeGrain
      );
    }

    switch (metric.chartType) {
      case ChartTypes.BAR: {
        chartsConfig.bars.push(...getBarConfig(metric, index, splitDimensionValues));
        break;
      }
      case ChartTypes.LINE: {
        chartsConfig.lines.push(...getLineConfig(metric, index, splitDimensionValues));
        break;
      }
      case ChartTypes.AREA: {
        chartsConfig.areas.push(...getAreaConfig(metric, index, splitDimensionValues));
        break;
      }
      default: {
      }
    }

    if (metric.filters.compareWith?.indexOf("Prev. period") > -1) {
      chartsConfig.lines.push({
        dataKey: `Prev. period ${metric.metricLabel}`,
        color: colors[(index + 1) % colors.length],
      });
    }
    if (metric.filters.compareWith?.indexOf("Max") > -1) {
      chartsConfig.lines.push({
        dataKey: `Max ${metric.metricLabel}`,
        color: colors[(index + 2) % colors.length],
      });
    }
    if (metric.filters.compareWith?.indexOf("Min") > -1) {
      chartsConfig.lines.push({
        dataKey: `Min ${metric.metricLabel}`,
        color: colors[(index + 3) % colors.length],
      });
    }
    if (metric.filters.compareWith?.indexOf("Median") > -1) {
      chartsConfig.lines.push({
        dataKey: `Median ${metric.metricLabel}`,
        color: colors[(index + 4) % colors.length],
      });
    }
    if (metric.filters.compareWith?.indexOf("Average") > -1) {
      chartsConfig.lines.push({
        dataKey: `Average ${metric.metricLabel}`,
        color: colors[(index + 5) % colors.length],
      });
    }
  });
  await Promise.all(configPromises);
  return chartsConfig;
};
