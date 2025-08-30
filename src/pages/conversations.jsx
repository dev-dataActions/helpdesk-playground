import { MessageSquare, Users, Clock, Bot } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";

export default function Conversations() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">View and manage all customer conversations across channels.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Conversations"
          value={47}
          change="+12% from yesterday"
          changeType="positive"
          icon={MessageSquare}
          iconBg="bg-primary"
        />
        <MetricCard
          title="Avg. Response Time"
          value="2h 15m"
          change="+15m from yesterday"
          changeType="negative"
          icon={Clock}
          iconBg="bg-warning"
        />
        <MetricCard
          title="AI Handled"
          value="68%"
          change="+5% from yesterday"
          changeType="positive"
          icon={Bot}
          iconBg="bg-purple-600"
        />
        <MetricCard
          title="Customer Satisfaction"
          value="4.8/5"
          change="+0.2 from last week"
          changeType="positive"
          icon={Users}
          iconBg="bg-success"
        />
      </div>

      {/* Placeholder content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Conversation Management</h3>
        <p className="text-muted-foreground">
          This is a placeholder for the conversation management interface. The actual conversation system would be
          implemented here.
        </p>
      </div>
    </div>
  );
}
