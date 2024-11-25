import { simpleDataResolver } from "../simple";
import { pivotDataResolver } from "../pivotDataResolver";
import { pieDataResolver } from "../pieDataResolver";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";

export const ChartDataResolverMap = {
  [ChartTypes.BIGNUMBER]: simpleDataResolver,
  [ChartTypes.BIGNUMBERWITHTREND]: simpleDataResolver,
  [ChartTypes.SIMPLE_CHART]: simpleDataResolver,
  [ChartTypes.AREA]: simpleDataResolver,
  [ChartTypes.BAR]: simpleDataResolver,
  [ChartTypes.LINE]: simpleDataResolver,
  [ChartTypes.PIVOT]: pivotDataResolver,
  [ChartTypes.PIE]: pieDataResolver,
};
