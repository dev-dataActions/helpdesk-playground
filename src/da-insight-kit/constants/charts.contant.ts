import BigNumber from "../charts/BigNumber";
import SimpleChart from "../charts/Simple";
import Pivot from '../charts/Pivot'
import BigNumberWithTrend from '../charts/BigNumberWithTrend'
import PieChart from "../charts/Pie";
export enum ChartTypes {
  BIGNUMBER = "BIGNUMBER",
  BIGNUMBERWITHTREND = "BIGNUMBERWITHTREND",
  SIMPLE_CHART = "SIMPLE_CHART",
  AREA= "AREA",
  BAR= "BAR",
  LINE= "LINE",
  PIVOT="PIVOT",
  PIE="PIE"
}

export const ChartMap = {
  [ChartTypes.BIGNUMBER]: BigNumber,
  [ChartTypes.SIMPLE_CHART] :SimpleChart,
  [ChartTypes.PIVOT] : Pivot,
  [ChartTypes.BIGNUMBERWITHTREND] : BigNumberWithTrend,
  [ChartTypes.PIE] : PieChart
};
