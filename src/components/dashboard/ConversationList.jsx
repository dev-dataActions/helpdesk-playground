import { Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const conversations = [
  {
    id: "1",
    customer: "Sarah Chen",
    subject: "Payment integration issue",
    channel: "email",
    priority: "urgent",
    slaTime: "2h 15m",
    agent: "Alex Miller",
    lastActivity: "5 minutes ago",
  },
  {
    id: "2",
    customer: "Marcus Johnson",
    subject: "Account setup help",
    channel: "chat",
    priority: "medium",
    slaTime: "4h 30m",
    agent: "Lisa Wong",
    lastActivity: "12 minutes ago",
  },
  {
    id: "3",
    customer: "Emma Thompson",
    subject: "Feature request discussion",
    channel: "call",
    priority: "low",
    slaTime: "1d 2h",
    agent: "David Park",
    lastActivity: "1 hour ago",
  },
  {
    id: "4",
    customer: "Robert Davis",
    subject: "Billing inquiry",
    channel: "email",
    priority: "high",
    slaTime: "1h 45m",
    agent: "Sarah Kim",
    lastActivity: "3 minutes ago",
  },
];

const channelIcons = {
  email: "📧",
  chat: "💬",
  call: "📞",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-yellow-100 text-yellow-700",
  urgent: "bg-red-100 text-red-700",
};

export function ConversationList() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Active Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="conversation-item">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{channelIcons[conversation.channel]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{conversation.customer}</p>
                    <p className="text-sm text-muted-foreground truncate">{conversation.subject}</p>
                  </div>
                  <Badge className={`status-badge ${priorityColors[conversation.priority]}`}>
                    {conversation.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Assigned to {conversation.agent}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {conversation.slaTime}
                    </span>
                    <span>{conversation.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
