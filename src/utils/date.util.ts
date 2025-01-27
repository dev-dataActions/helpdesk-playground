import { format } from "date-fns";
export function formatDate(
  date: string | number | Date,
  formatStr = "yyyy-MM-dd"
) {
  return format(new Date(date), formatStr);
}
