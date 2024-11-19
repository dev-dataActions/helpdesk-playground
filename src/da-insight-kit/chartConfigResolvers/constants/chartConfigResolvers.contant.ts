import { ChartTypes } from "../../constants/charts.contant";
import { bigNumberChartConfigResolver } from "../bigNumber";
import {simpleChartConfigResolver} from '../simpleChartConfigResolvers.contant'
import {pivotChartConfigResolver} from '../pivotChartConfigResolver'
import {bigNumWithTrendChartConfigResolver} from '../bigNumberWithTrendConfigResolver'
export const ChartConfigResolverMap = {
  [ChartTypes.BIGNUMBER]: bigNumberChartConfigResolver,
  [ChartTypes.SIMPLE_CHART]: simpleChartConfigResolver,
  [ChartTypes.PIVOT] : pivotChartConfigResolver,
  [ChartTypes.BIGNUMBERWITHTREND] : bigNumWithTrendChartConfigResolver
};
