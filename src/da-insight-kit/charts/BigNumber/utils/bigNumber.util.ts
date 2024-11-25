import { format } from "date-fns";
import { TimeGrain } from "../../../constants/date.constant";
import { Entry } from "@/da-insight-kit/resolvers/dataResolvers/simple";

export const getCurrLabel = (data: Entry[], timeGrain: TimeGrain): string => {
  try {
    if (timeGrain === TimeGrain.DAILY) return "Today";
    else if (timeGrain === TimeGrain.WEEKLY) return "This week";
    else return format(new Date(data?.[data?.length - 1]?.fromtime), "MMMM");
  } catch {
    return "";
  }
};

export const getPrevLabel = (data: Entry[], timeGrain: TimeGrain): string => {
  try {
    if (timeGrain === TimeGrain.DAILY) return "Yesterday";
    else if (timeGrain === TimeGrain.WEEKLY) return "Last week";
    else return format(new Date(data?.[data?.length - 2]?.fromtime), "MMMM");
  } catch {
    return "";
  }
};

export const getComparisonLabel = (data: Entry[], timeGrain: TimeGrain): string => {
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
    return "";
  }
};
