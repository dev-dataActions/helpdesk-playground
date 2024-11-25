import { bigNumberChartConfigResolver } from "../bigNumber";
import { simpleChartConfigResolver } from "../simpleChartConfigResolvers.contant";
import { pivotChartConfigResolver } from "../pivotChartConfigResolver";
import { bigNumWithTrendChartConfigResolver } from "../bigNumberWithTrendConfigResolver";
import { pieChartConfigResolver } from "../pieChartConfigResolver";
import { ChartTypes } from "@/da-insight-kit/constants/charts.contant";
import { geoChartConfigResolver } from "../geoChartConfigResolver";

export const ChartConfigResolverMap = {
  [ChartTypes.BIGNUMBER]: bigNumberChartConfigResolver,
  [ChartTypes.BIGNUMBERWITHTREND]: bigNumWithTrendChartConfigResolver,
  [ChartTypes.SIMPLE_CHART]: simpleChartConfigResolver,
  [ChartTypes.AREA]: simpleChartConfigResolver,
  [ChartTypes.BAR]: simpleChartConfigResolver,
  [ChartTypes.LINE]: simpleChartConfigResolver,
  [ChartTypes.PIVOT]: pivotChartConfigResolver,
  [ChartTypes.PIE]: pieChartConfigResolver,
  [ChartTypes.GEO] : geoChartConfigResolver
};
