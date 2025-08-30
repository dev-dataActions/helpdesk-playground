import { useRouter } from "next/router";
import { ArrowLeft, Clock, User, AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ChatThread } from "../../components/chat/ChatThread";

// Mock ticket data - in real app this would come from API/database
const getTicketData = (id) => {
  const tickets = {
    1: {
      id: "1",
      customer: "Sarah Chen",
      subject: "Payment integration issue with Stripe",
      channel: "email",
      status: "open",
      priority: "urgent",
      assignedTo: "Alex Miller",
      lastActivity: "5 minutes ago",
      slaTime: "2h 15m",
      description:
        "Customer is experiencing issues with Stripe webhook integration. Payment processing is failing with webhook endpoint verification errors.",
    },
    2: {
      id: "2",
      customer: "Marcus Johnson",
      subject: "Help with account setup and permissions",
      channel: "chat",
      status: "in-progress",
      priority: "medium",
      assignedTo: "Lisa Wong",
      lastActivity: "12 minutes ago",
      slaTime: "4h 30m",
      description:
        "Customer needs assistance setting up account permissions and accessing features included in their subscription plan.",
    },
    3: {
      id: "3",
      customer: "Emma Thompson",
      subject: "Feature request: Custom dashboard widgets",
      channel: "email",
      status: "waiting",
      priority: "low",
      assignedTo: "David Park",
      lastActivity: "1 hour ago",
      slaTime: "1d 2h",
      description:
        "Customer requesting ability to create custom dashboard widgets for their specific use case and workflow requirements.",
    },
    4: {
      id: "4",
      customer: "Robert Davis",
      subject: "Billing inquiry about subscription upgrade",
      channel: "chat",
      status: "open",
      priority: "high",
      assignedTo: "Sarah Kim",
      lastActivity: "3 minutes ago",
      slaTime: "1h 45m",
      description:
        "Customer has questions about upgrading their subscription plan and wants to understand pricing and feature differences.",
    },
  };

  return tickets[id] || null;
};

const channelIcons = {
  email: "📧",
  chat: "💬",
  call: "📞",
};

const statusStyles = {
  open: "bg-blue-50 text-blue-700 border border-blue-200",
  "in-progress": "bg-yellow-50 text-yellow-700 border border-yellow-200",
  waiting: "bg-orange-50 text-orange-700 border border-orange-200",
  resolved: "bg-green-50 text-green-700 border border-green-200",
};

const priorityStyles = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-yellow-100 text-yellow-700",
  urgent: "bg-red-100 text-red-700",
};

export default function TicketDetail({ ticketId }) {
  const router = useRouter();
  const id = ticketId;

  if (!id) {
    router.push("/conversations");
    return null;
  }

  const ticket = getTicketData(id);

  if (!ticket) {
    return (
      <div className="p-8">
        <div className="max-w-md mx-auto text-center">
          <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ticket Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The ticket you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button onClick={() => router.push("/conversations")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Conversations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.push("/conversations")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{channelIcons[ticket.channel]}</span>
            <div>
              <h1 className="text-2xl font-bold">{ticket.subject}</h1>
              <p className="text-muted-foreground">
                Ticket #{ticket.id} • {ticket.customer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Assigned To</span>
            </div>
            <p className="font-medium">{ticket.assignedTo}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
            </div>
            <Badge className={`status-badge ${statusStyles[ticket.status]}`}>{ticket.status}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Priority</span>
            </div>
            <Badge className={`status-badge ${priorityStyles[ticket.priority]}`}>{ticket.priority}</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">SLA Time</span>
            </div>
            <p className="font-medium">{ticket.slaTime}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm mt-1">{ticket.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Channel</label>
                <div className="flex items-center gap-2 mt-1">
                  <span>{channelIcons[ticket.channel]}</span>
                  <span className="text-sm capitalize">{ticket.channel}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Activity</label>
                <p className="text-sm mt-1">{ticket.lastActivity}</p>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full mb-2">Mark as Resolved</Button>
                <Button variant="outline" className="w-full">
                  Escalate Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Thread */}
        <div className="lg:col-span-2">
          <ChatThread
            ticketId={ticket.id}
            customerName={ticket.customer}
            agentName={ticket.assignedTo}
            onMessageSent={(message) => {
              console.log("New message sent:", message);
              // Here you could update ticket status, last activity, etc.
            }}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  // In a real app, you would fetch ticket data here
  // For now, we'll just return the id to the component
  return {
    props: {
      ticketId: id,
    },
  };
}
