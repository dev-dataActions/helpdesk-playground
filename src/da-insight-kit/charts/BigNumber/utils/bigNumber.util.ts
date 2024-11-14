import { format } from "date-fns";
import { TimeGrain } from "../../../constants/date.constant";

export const getCurrLabel = (data: any, timeGrain: TimeGrain) => {
  try {
    if (timeGrain === TimeGrain.DAILY) return "Today";
    else if (timeGrain === TimeGrain.WEEKLY) return "This week";
    else return format(new Date(data?.[data?.length - 1]?.fromtime), "MMMM");
  } catch {
    return null;
  }
};
export const getPrevLabel = (data: any, timeGrain: TimeGrain) => {
  try {
    if (timeGrain === TimeGrain.DAILY) return "Yesterday";
    else if (timeGrain === TimeGrain.WEEKLY) return "Last week";
    else return format(new Date(data?.[data?.length - 2]?.fromtime), "MMMM");
  } catch {
    return null;
  }
};
export const getComparisonLabel = (data: any, timeGrain: TimeGrain) => {
  try {
    if (timeGrain === TimeGrain.DAILY) return "Today vs Yesterday";
    else if (timeGrain === TimeGrain.WEEKLY) return "This week vs Last week";
    else
      return (
        format(new Date(data[data.length - 1].fromtime), "MMMM") +
        " vs " +
        format(new Date(data[data.length - 2].fromtime), "MMMM")
      );
  } catch {
    return null;
  }
};
