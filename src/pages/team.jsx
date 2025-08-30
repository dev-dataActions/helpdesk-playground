import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";

export default function Team() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">Manage your support team and track performance metrics.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Agents"
          value={12}
          change="Online now"
          changeType="neutral"
          icon={Users}
          iconBg="bg-primary"
        />
        <MetricCard
          title="Available Agents"
          value={8}
          change="Ready to help"
          changeType="positive"
          icon={UserCheck}
          iconBg="bg-success"
        />
        <MetricCard
          title="Avg. Handle Time"
          value="6m 32s"
          change="-2m from yesterday"
          changeType="positive"
          icon={Clock}
          iconBg="bg-warning"
        />
        <MetricCard
          title="Team Performance"
          value="92%"
          change="+3% from last week"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-purple-600"
        />
      </div>

      {/* Placeholder content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Team Management</h3>
        <p className="text-muted-foreground">
          This is a placeholder for the team management interface. The actual team system would be implemented here.
        </p>
      </div>
    </div>
  );
}
