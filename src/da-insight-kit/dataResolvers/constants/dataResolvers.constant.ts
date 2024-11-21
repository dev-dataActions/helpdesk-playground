import { ChartTypes } from "../../constants/charts.contant";
import { simpleDataResolver } from "../simple";
import {pivotDataResolver} from '../pivotDataResolver'
import {pieDataResolver} from '../pieDataResolver'
export const ChartDataResolverMap = {
  [ChartTypes.BIGNUMBER]: simpleDataResolver,
  [ChartTypes.SIMPLE_CHART] : simpleDataResolver,
  [ChartTypes.PIVOT] : pivotDataResolver,
  [ChartTypes.BIGNUMBERWITHTREND]: simpleDataResolver,
  [ChartTypes.PIE] : pieDataResolver
};
