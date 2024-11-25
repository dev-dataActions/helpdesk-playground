import { ColorPalette } from "@/da-insight-kit/constants/colors.constants";
import { Metric } from "@/da-insight-kit/utils/insight.util";
export const bigNumWithTrendChartConfigResolver = async (metrics: Metric[]) => {
  const chartsConfig = {
    stats: [
      {
        name: metrics[0]?.metricLabel,
      },
    ],
    areas: [
      {
        color: ColorPalette.PALE_BLUE,
        dataKey: metrics[0].metricKey,
      },
    ],
  };
  return chartsConfig;
};
