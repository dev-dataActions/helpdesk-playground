import { Card, CardContent } from "../ui/card";

export function MetricCard({ title, value, change, changeType = "neutral", icon: Icon, iconBg = "bg-primary" }) {
  const changeColors = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="metric-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && <p className={`text-sm ${changeColors[changeType]}`}>{change}</p>}
          </div>
          <div className={`${iconBg} p-3 rounded-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
