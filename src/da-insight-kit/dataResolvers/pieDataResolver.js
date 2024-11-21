import { getAllChartDataV1 } from "../services/query.svc";

const getApiCall = async (metric = {}, filters = {}, workspaceId) => {
  // return getAllChartDataV1({
  //   workspaceId,
  //   payload: {
  //     fromtime: "2024-01-01",
  //     totime: "2024-06-30",
  //     metric_name: metric.metricKey,
  //     dimensions: "user__platform",
  //   },
  //   insightType: "contributor",
  // });
  return [
    {
      fromtime: "2024-01-01",
      totime: "2024-06-01",
      LOL: 234,
      Dota: 436,
      Pubg: 769,
    },
  ];
};

const transformData = (data) => {
  const arr = [];
  for (let key in data[0]) {
    const obj = {};
    if (key !== "fromtime" && key !== "totime") {
      obj["segment"] = key;
      obj["value"] = data[0][key];
      arr.push(obj);
    }
  }
  return arr;
};

export const pieDataResolver = async ([metric], filters, workspaceId) => {
  return getApiCall(metric, filters, workspaceId)
    .then((res) => {
      return transformData(res);
    })
    .catch(() => []);
};
