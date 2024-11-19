import { ChartTypes } from "../../constants/charts.contant";
import { simpleDataResolver } from "../simple";

export const ChartDataResolverMap = {
  [ChartTypes.BIGNUMBER]: simpleDataResolver,
  [ChartTypes.SIMPLE_CHART] : simpleDataResolver
};
