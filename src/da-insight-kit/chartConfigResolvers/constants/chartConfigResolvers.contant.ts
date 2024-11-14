import { ChartTypes } from "../../constants/charts.contant";
import { bigNumberChartConfigResolver } from "../bigNumber";

export const ChartConfigResolverMap = {
  [ChartTypes.BIGNUMBER]: bigNumberChartConfigResolver,
};
