import { Users, Clock, MessageSquare, CheckCircle, Phone, Bot, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const agents = [
  { id: "1", name: "Alex Miller", status: "active", timeOnStatus: "2h 15m", conversations: 8 },
  { id: "2", name: "Sarah Kim", status: "active", timeOnStatus: "45m", conversations: 6 },
  { id: "3", name: "David Park", status: "away", timeOnStatus: "12m", conversations: 3 },
  { id: "4", name: "Lisa Wong", status: "active", timeOnStatus: "3h 22m", conversations: 7 },
  { id: "5", name: "Mike Chen", status: "snoozed", timeOnStatus: "1h 08m", conversations: 0 },
  { id: "6", name: "Emma Davis", status: "active", timeOnStatus: "1h 30m", conversations: 5 },
  { id: "7", name: "John Smith", status: "away", timeOnStatus: "25m", conversations: 2 },
  { id: "8", name: "Anna Johnson", status: "active", timeOnStatus: "4h 12m", conversations: 9 },
];

const recentActivities = [
  {
    id: "1",
    type: "ticket_resolved",
    description: "Payment issue resolved for Acme Corp",
    timestamp: "2 minutes ago",
    agent: "Alex Miller",
  },
  {
    id: "2",
    type: "escalation",
    description: "High priority issue escalated to Level 2",
    timestamp: "8 minutes ago",
    agent: "Sarah Kim",
  },
  {
    id: "3",
    type: "faq_published",
    description: "New FAQ article published: 'Password Reset'",
    timestamp: "15 minutes ago",
    agent: "David Park",
  },
  {
    id: "4",
    type: "ticket_resolved",
    description: "Account setup completed for TechStart",
    timestamp: "22 minutes ago",
    agent: "Lisa Wong",
  },
];

const statusConfig = {
  active: { color: "bg-success", label: "Active", icon: Circle },
  away: { color: "bg-warning", label: "Away", icon: Circle },
  snoozed: { color: "bg-muted", label: "Snoozed", icon: Circle },
};

const activityIcons = {
  ticket_resolved: CheckCircle,
  escalation: MessageSquare,
  faq_published: Bot,
};

const activityColors = {
  ticket_resolved: "text-success",
  escalation: "text-warning",
  faq_published: "text-primary",
};

export default function Tickets() {
  const activeAgents = agents.filter((agent) => agent.status === "active").length;
  const awayAgents = agents.filter((agent) => agent.status === "away").length;
  const snoozedAgents = agents.filter((agent) => agent.status === "snoozed").length;
  const totalConversations = agents.reduce((sum, agent) => sum + agent.conversations, 0);

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Team Command Center</h1>
        <p className="text-muted-foreground">Real-time team status and operations overview</p>
      </div>

      {/* Essential Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-3xl font-bold text-foreground">{activeAgents}</p>
                <p className="text-sm text-success">{agents.length} total team members</p>
              </div>
              <div className="bg-primary p-3 rounded-lg">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                <p className="text-3xl font-bold text-foreground">{totalConversations}</p>
                <p className="text-sm text-muted-foreground">Across all agents</p>
              </div>
              <div className="bg-secondary p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                <p className="text-3xl font-bold text-foreground">1h 45m</p>
                <p className="text-sm text-success">-12m from yesterday</p>
              </div>
              <div className="bg-warning p-3 rounded-lg">
                <Clock className="w-6 h-6 text-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Teammates Panel - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Team Availability</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="text-muted-foreground">{activeAgents} Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                    <span className="text-muted-foreground">{awayAgents} Away</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted"></div>
                    <span className="text-muted-foreground">{snoozedAgents} Snoozed</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="table-header text-left">Agent</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Time on Status</th>
                      <th className="table-header">Conversations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => {
                      const StatusIcon = statusConfig[agent.status].icon;
                      return (
                        <tr key={agent.id} className="hover:bg-muted/30">
                          <td className="table-cell">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-sm font-medium text-muted-foreground">
                                  {agent.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <span className="font-medium text-foreground">{agent.name}</span>
                            </div>
                          </td>
                          <td className="table-cell text-center">
                            <Badge variant="secondary" className="inline-flex items-center gap-1.5">
                              <StatusIcon
                                className={`w-2 h-2 ${statusConfig[agent.status].color.replace("bg-", "text-")}`}
                                fill="currentColor"
                              />
                              {statusConfig[agent.status].label}
                            </Badge>
                          </td>
                          <td className="table-cell text-center text-muted-foreground">{agent.timeOnStatus}</td>
                          <td className="table-cell text-center">
                            <span className="font-medium text-foreground">{agent.conversations}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full ${activityColors[activity.type]} bg-current/10`}>
                        <Icon className={`w-4 h-4 ${activityColors[activity.type]}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          {activity.agent && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground">{activity.agent}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
