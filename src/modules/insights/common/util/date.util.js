import { TimeGrain } from "da-insight-sdk";
import { format } from "date-fns";

export function formatDate(date, formatStr = "yyyy-MM-dd") {
  return format(new Date(date), formatStr);
}

export function shortenDate(fromDateString, toDateString, timeGrain, dateFormat) {
  if (!fromDateString || !toDateString) return "";
  switch (timeGrain) {
    case TimeGrain.DAILY:
      return formatDate(fromDateString, dateFormat ?? "MMM dd");
    case TimeGrain.WEEKLY:
      return `${formatDate(fromDateString, dateFormat ?? "MMM dd")} - ${formatDate(
        toDateString,
        dateFormat ?? "MMM dd"
      )}`;
    case TimeGrain.MONTHLY:
      return formatDate(fromDateString, dateFormat ?? "MMM");
    default:
      return `${fromDateString} - ${toDateString}`;
  }
}
