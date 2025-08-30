import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Analytics and insights for your support operations.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tickets"
          value={(1, 247)}
          change="+8% from last month"
          changeType="positive"
          icon={BarChart3}
          iconBg="bg-primary"
        />
        <MetricCard
          title="Resolution Rate"
          value="94%"
          change="+2% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success"
        />
        <MetricCard
          title="Customer Satisfaction"
          value="4.8/5"
          change="+0.3 from last month"
          changeType="positive"
          icon={Users}
          iconBg="bg-warning"
        />
        <MetricCard
          title="Avg. Response Time"
          value="2h 15m"
          change="-15m from last month"
          changeType="positive"
          icon={Clock}
          iconBg="bg-purple-600"
        />
      </div>

      {/* Placeholder content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
        <p className="text-muted-foreground">
          This is a placeholder for the reports and analytics interface. The actual reporting system would be
          implemented here.
        </p>
      </div>
    </div>
  );
}
