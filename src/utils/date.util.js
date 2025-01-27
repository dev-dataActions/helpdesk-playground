import { format } from "date-fns";
export function formatDate(date, formatStr = "yyyy-MM-dd") {
  return format(new Date(date), formatStr);
}
