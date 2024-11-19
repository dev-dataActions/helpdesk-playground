import { ChartTypes } from "../../constants/charts.contant";
import { bigNumberChartConfigResolver } from "../bigNumber";
import {simpleChartConfigResolver} from '../simpleChartConfigResolvers.contant'

export const ChartConfigResolverMap = {
  [ChartTypes.BIGNUMBER]: bigNumberChartConfigResolver,
  [ChartTypes.SIMPLE_CHART]: simpleChartConfigResolver,
};
