import {
  TimeGrain,
  TimeGrainOffset,
  TimeGrainAPIKey,
} from "../constants/date.constant";
import { getAllChartDataV1 } from "../services/query.svc";

const getApiCall = (metric = {}, filters = {}) => {
  const { timeRangeGap = 90, periodRangeGap = TimeGrain.MONTHLY } =
    filters ?? {};

  return getAllChartDataV1({
    pageSize: timeRangeGap / TimeGrainOffset[periodRangeGap],
    timeGrain: TimeGrainAPIKey[periodRangeGap],
    fieldList: metric.metricKey,
    dimensions: [
      filters[metric.metricKey]?.showPivotIn?.row,
      filters[metric.metricKey]?.showPivotIn?.column,
    ],
    pivot: true,
  });
};

export const pivotDataResolver = async ([metric], filters) => {
  return getApiCall(metric, filters)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(() => []);
};
