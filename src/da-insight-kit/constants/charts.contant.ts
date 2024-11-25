import BigNumber from "../charts/BigNumber";
import SimpleChart from "../charts/Simple";
import Pivot from "../charts/Pivot";
import BigNumberWithTrend from "../charts/BigNumberWithTrend";
import PieChart from "../charts/Pie";
import GeoChart from "../charts/Geo";

export enum ChartTypes {
  BIGNUMBER = "BIGNUMBER",
  BIGNUMBERWITHTREND = "BIGNUMBERWITHTREND",
  SIMPLE_CHART = "SIMPLE_CHART",
  AREA = "AREA",
  BAR = "BAR",
  LINE = "LINE",
  PIVOT = "PIVOT",
  PIE = "PIE",
  GEO = "GEO"
}

export const ChartMap = {
  [ChartTypes.BIGNUMBER]: BigNumber,
  [ChartTypes.BIGNUMBERWITHTREND]: BigNumberWithTrend,
  [ChartTypes.SIMPLE_CHART]: SimpleChart,
  [ChartTypes.AREA]: SimpleChart,
  [ChartTypes.BAR]: SimpleChart,
  [ChartTypes.LINE]: SimpleChart,
  [ChartTypes.PIVOT]: Pivot,
  [ChartTypes.PIE]: PieChart,
  [ChartTypes.GEO] : GeoChart
};
