import { MessageSquare, Ticket, Clock, TrendingUp, Bot, Users } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";
import { ConversationList } from "../components/dashboard/ConversationList";
import { RecentActivity } from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your customer engagement and support performance in real-time.</p>
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
          title="Open Tickets"
          value={23}
          change="-8% from yesterday"
          changeType="positive"
          icon={Ticket}
          iconBg="bg-secondary"
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
          title="AI Resolution Rate"
          value="68%"
          change="+5% from yesterday"
          changeType="positive"
          icon={Bot}
          iconBg="bg-purple-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="CSAT Score"
          value="4.8/5"
          change="+0.2 from last week"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success"
        />
        <MetricCard
          title="SLA Breaches (24h)"
          value={3}
          change="2 fewer than yesterday"
          changeType="positive"
          icon={Clock}
          iconBg="bg-alert"
        />
        <MetricCard
          title="Active Agents"
          value={12}
          change="Online now"
          changeType="neutral"
          icon={Users}
          iconBg="bg-secondary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ConversationList />
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
