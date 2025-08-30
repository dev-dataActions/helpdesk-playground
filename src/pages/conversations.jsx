import { useState } from "react";
import { useRouter } from "next/router";
import { Search, Filter, MoreHorizontal, Clock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const inboxItems = [
  {
    id: "1",
    customer: "Sarah Chen",
    subject: "Payment integration issue with Stripe",
    channel: "email",
    status: "open",
    priority: "urgent",
    assignedTo: "Alex Miller",
    lastActivity: "5 minutes ago",
    slaTime: "2h 15m",
    unread: true,
  },
  {
    id: "2",
    customer: "Marcus Johnson",
    subject: "Help with account setup and permissions",
    channel: "chat",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Lisa Wong",
    lastActivity: "12 minutes ago",
    slaTime: "4h 30m",
    unread: false,
  },
  {
    id: "3",
    customer: "Emma Thompson",
    subject: "Feature request: Custom dashboard widgets",
    channel: "email",
    status: "waiting",
    priority: "low",
    assignedTo: "David Park",
    lastActivity: "1 hour ago",
    slaTime: "1d 2h",
    unread: false,
  },
  {
    id: "4",
    customer: "Robert Davis",
    subject: "Billing inquiry about subscription upgrade",
    channel: "chat",
    status: "open",
    priority: "high",
    assignedTo: "Sarah Kim",
    lastActivity: "3 minutes ago",
    slaTime: "1h 45m",
    unread: true,
  },
  {
    id: "5",
    customer: "Jennifer Liu",
    subject: "API documentation clarification needed",
    channel: "email",
    status: "resolved",
    priority: "medium",
    assignedTo: "Alex Miller",
    lastActivity: "2 hours ago",
    slaTime: "Resolved",
    unread: false,
  },
];

const channelIcons = {
  email: "📧",
  chat: "💬",
  call: "📞",
};

const statusStyles = {
  open: "status-open",
  "in-progress": "status-in-progress",
  waiting: "status-badge bg-orange-50 text-orange-700 border border-orange-200",
  resolved: "status-resolved",
};

const priorityStyles = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-yellow-100 text-yellow-700",
  urgent: "status-urgent",
};

export default function Conversations() {
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();

  const handleItemClick = (itemId) => {
    router.push(`/ticket-detail/${itemId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground">Unified view of all customer conversations across channels.</p>
        </div>
        <Button className="button-primary">New Conversation</Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-10 bg-background" />
        </div>
        <Select defaultValue="all-channels">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-channels">All Channels</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="chat">Chat</SelectItem>
            <SelectItem value="call">Calls</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-status">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Inbox Table */}
      <div className="bg-card rounded-lg border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 table-header">
          <div className="col-span-1">
            <input type="checkbox" className="rounded" />
          </div>
          <div className="col-span-3">Customer & Subject</div>
          <div className="col-span-1">Channel</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Priority</div>
          <div className="col-span-2">Assigned To</div>
          <div className="col-span-2">Last Activity</div>
          <div className="col-span-1">SLA</div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {inboxItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 table-cell hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={(e) => {
                // Prevent navigation when clicking on checkbox or dropdown
                if (!e.target.closest("input, button")) {
                  handleItemClick(item.id);
                }
              }}
            >
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems([...selectedItems, item.id]);
                    } else {
                      setSelectedItems(selectedItems.filter((id) => id !== item.id));
                    }
                  }}
                />
              </div>
              <div className="col-span-3 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {item.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  <p
                    className={`text-sm font-medium ${
                      item.unread ? "text-foreground" : "text-muted-foreground"
                    } truncate`}
                  >
                    {item.customer}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{item.subject}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <span className="text-lg">{channelIcons[item.channel]}</span>
              </div>
              <div className="col-span-1 flex items-center">
                <Badge className={`status-badge ${statusStyles[item.status]}`}>{item.status}</Badge>
              </div>
              <div className="col-span-1 flex items-center">
                <Badge className={`status-badge ${priorityStyles[item.priority]}`}>{item.priority}</Badge>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{item.assignedTo}</span>
              </div>
              <div className="col-span-2 flex items-center text-sm text-muted-foreground">{item.lastActivity}</div>
              <div className="col-span-1 flex items-center gap-1 text-sm">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className={item.slaTime.includes("Resolved") ? "text-success" : "text-foreground"}>
                  {item.slaTime}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Assign to me</DropdownMenuItem>
                    <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                    <DropdownMenuItem>Escalate</DropdownMenuItem>
                    <DropdownMenuItem>Add to ticket</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {selectedItems.length} conversation{selectedItems.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Assign
            </Button>
            <Button size="sm" variant="outline">
              Resolve
            </Button>
            <Button size="sm" variant="outline">
              Archive
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
