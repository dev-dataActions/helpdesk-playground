import { getAllChartDataV1 } from "../services/query.svc";

const getApiCall = (metric = {}, filters = {}) => {
  return getAllChartDataV1({
    workspaceId,
    payload: {
      fromtime: "2024-01-01",
      totime: "2024-06-30",
      metric_name: metric.metricKey,
      dimensions: "user__platform",
    },
    insightType: "contributor",
  });
};

export const pieDataResolver = async ([metric], filters) => {
  return getApiCall(metric, filters)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(() => []);
};
