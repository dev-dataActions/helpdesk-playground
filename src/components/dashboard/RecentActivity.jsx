import { CheckCircle, MessageSquare, Phone, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const activities = [
  {
    id: "1",
    type: "ticket_resolved",
    description: "Payment issue resolved for Acme Corp",
    timestamp: "2 minutes ago",
    agent: "Alex Miller",
  },
  {
    id: "2",
    type: "ai_handled",
    description: "FAQ query handled automatically",
    timestamp: "5 minutes ago",
  },
  {
    id: "3",
    type: "call_completed",
    description: "15-minute support call with TechStart Inc",
    timestamp: "12 minutes ago",
    agent: "Lisa Wong",
  },
  {
    id: "4",
    type: "message_sent",
    description: "Follow-up email sent to RetailPlus",
    timestamp: "18 minutes ago",
    agent: "David Park",
  },
  {
    id: "5",
    type: "ticket_resolved",
    description: "Account setup completed for NewCo",
    timestamp: "25 minutes ago",
    agent: "Sarah Kim",
  },
];

const activityIcons = {
  ticket_resolved: CheckCircle,
  message_sent: MessageSquare,
  call_completed: Phone,
  ai_handled: Bot,
};

const activityColors = {
  ticket_resolved: "text-success",
  message_sent: "text-primary",
  call_completed: "text-secondary",
  ai_handled: "text-purple-600",
};

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full ${activityColors[activity.type]} bg-current/10`}>
                  <Icon className={`w-4 h-4 ${activityColors[activity.type]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
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
  );
}
