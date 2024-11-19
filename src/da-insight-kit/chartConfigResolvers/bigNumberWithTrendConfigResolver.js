import { ColorPalette } from "../constants/colors.constants";
export const bigNumWithTrendChartConfigResolver = async (metrics = []) => {
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
