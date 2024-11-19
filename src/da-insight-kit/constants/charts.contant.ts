import BigNumber from "../charts/BigNumber";
import SimpleChart from "../charts/Simple";

export enum ChartTypes {
  BIGNUMBER = "BIGNUMBER",
  SIMPLE_CHART = "SIMPLE_CHART",
  AREA= "AREA",
  BAR= "BAR",
  LINE= "LINE",
}

export const ChartMap = {
  [ChartTypes.BIGNUMBER]: BigNumber,
  [ChartTypes.SIMPLE_CHART] :SimpleChart
};
