import { MessageSquare, Ticket, Clock, TrendingUp, Bot, Users } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";

export default function Tickets() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <p className="text-muted-foreground">Manage and track support tickets across your organization.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Open Tickets"
          value={23}
          change="+5% from yesterday"
          changeType="negative"
          icon={Ticket}
          iconBg="bg-primary"
        />
        <MetricCard
          title="Resolved Today"
          value={47}
          change="+12% from yesterday"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success"
        />
        <MetricCard
          title="Avg. Resolution Time"
          value="4h 32m"
          change="-15m from yesterday"
          changeType="positive"
          icon={Clock}
          iconBg="bg-warning"
        />
        <MetricCard
          title="SLA Compliance"
          value="94%"
          change="+2% from yesterday"
          changeType="positive"
          icon={Bot}
          iconBg="bg-purple-600"
        />
      </div>

      {/* Placeholder content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Ticket Management</h3>
        <p className="text-muted-foreground">
          This is a placeholder for the ticket management interface. The actual ticket system would be implemented here.
        </p>
      </div>
    </div>
  );
}
