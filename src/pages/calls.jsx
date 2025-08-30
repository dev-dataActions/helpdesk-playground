import { useState } from "react";
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  User,
  Calendar,
  Mic,
  MicOff,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const callsData = [
  {
    id: "1",
    customer: "Sarah Chen",
    phone: "+1 (555) 123-4567",
    duration: "5:32",
    status: "completed",
    timestamp: "2 hours ago",
    type: "inbound",
    agent: "Alex Miller",
    subject: "Payment integration issue",
    recording: true,
    tags: ["urgent", "payment"],
  },
  {
    id: "2",
    customer: "Marcus Johnson",
    phone: "+1 (555) 987-6543",
    duration: "3:15",
    status: "missed",
    timestamp: "4 hours ago",
    type: "inbound",
    agent: "Lisa Wong",
    subject: "Account setup help",
    recording: false,
    tags: ["follow-up"],
  },
  {
    id: "3",
    customer: "Emma Thompson",
    phone: "+1 (555) 456-7890",
    duration: "8:45",
    status: "completed",
    timestamp: "6 hours ago",
    type: "outbound",
    agent: "David Park",
    subject: "Feature request discussion",
    recording: true,
    tags: ["feature", "enterprise"],
  },
  {
    id: "4",
    customer: "Robert Davis",
    phone: "+1 (555) 321-9876",
    duration: "2:18",
    status: "completed",
    timestamp: "8 hours ago",
    type: "inbound",
    agent: "Sarah Kim",
    subject: "Billing inquiry",
    recording: true,
    tags: ["billing", "upgrade"],
  },
  {
    id: "5",
    customer: "Jennifer Liu",
    phone: "+1 (555) 654-3210",
    duration: "0:00",
    status: "missed",
    timestamp: "12 hours ago",
    type: "inbound",
    agent: "Unassigned",
    subject: "Technical support",
    recording: false,
    tags: ["technical"],
  },
];

const statusStyles = {
  completed: "bg-green-50 text-green-700 border border-green-200",
  missed: "bg-red-50 text-red-700 border border-red-200",
  "in-progress": "bg-blue-50 text-blue-700 border border-blue-200",
  scheduled: "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

const typeStyles = {
  inbound: "bg-green-100 text-green-700",
  outbound: "bg-blue-100 text-blue-700",
};

export default function Calls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCalls, setSelectedCalls] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredCalls = callsData.filter((call) => {
    const matchesSearch =
      call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    const matchesType = typeFilter === "all" || call.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeIcon = (type) => {
    return type === "inbound" ? (
      <PhoneCall className="w-4 h-4 text-green-600" />
    ) : (
      <Phone className="w-4 h-4 text-blue-600" />
    );
  };

  const handleCallSelect = (callId) => {
    setSelectedCalls((prev) => (prev.includes(callId) ? prev.filter((id) => id !== callId) : [...prev, callId]));
  };

  const totalCalls = callsData.length;
  const completedCalls = callsData.filter((call) => call.status === "completed").length;
  const missedCalls = callsData.filter((call) => call.status === "missed").length;
  const avgDuration = "4:32";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Call Center</h1>
          <p className="text-muted-foreground">Manage customer calls and voice interactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Call
          </Button>
          <Button className="button-primary">
            <Phone className="w-4 h-4 mr-2" />
            Make Call
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Calls</p>
                <p className="text-3xl font-bold text-foreground">{totalCalls}</p>
                <p className="text-sm text-success">+12% from yesterday</p>
              </div>
              <div className="bg-primary p-3 rounded-lg">
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-foreground">{completedCalls}</p>
                <p className="text-sm text-success">
                  {Math.round((completedCalls / totalCalls) * 100)}% completion rate
                </p>
              </div>
              <div className="bg-success p-3 rounded-lg">
                <PhoneCall className="w-6 h-6 text-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Missed</p>
                <p className="text-3xl font-bold text-foreground">{missedCalls}</p>
                <p className="text-sm text-warning">{Math.round((missedCalls / totalCalls) * 100)}% missed rate</p>
              </div>
              <div className="bg-warning p-3 rounded-lg">
                <PhoneOff className="w-6 h-6 text-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Avg Duration</p>
                <p className="text-3xl font-bold text-foreground">{avgDuration}</p>
                <p className="text-sm text-success">+2% from yesterday</p>
              </div>
              <div className="bg-secondary p-3 rounded-lg">
                <Clock className="w-6 h-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search calls, customers, or phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Calls Table */}
      <div className="bg-card rounded-lg border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 table-header">
          <div className="col-span-1">
            <input type="checkbox" className="rounded" />
          </div>
          <div className="col-span-3">Customer & Subject</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Agent</div>
          <div className="col-span-2">Duration & Time</div>
          <div className="col-span-1">Recording</div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              className="grid grid-cols-12 gap-4 table-cell hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={(e) => {
                if (!e.target.closest("input, button")) {
                  // Handle call detail view
                  console.log("View call details:", call.id);
                }
              }}
            >
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={selectedCalls.includes(call.id)}
                  onChange={() => handleCallSelect(call.id)}
                />
              </div>
              <div className="col-span-3 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getTypeIcon(call.type)}
                  <p className="text-sm font-medium text-foreground truncate">{call.customer}</p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{call.subject}</p>
                <p className="text-xs text-muted-foreground">{call.phone}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <Badge className={`status-badge ${typeStyles[call.type]}`}>{call.type}</Badge>
              </div>
              <div className="col-span-1 flex items-center">
                <Badge className={`status-badge ${statusStyles[call.status]}`}>{call.status}</Badge>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{call.agent}</span>
              </div>
              <div className="col-span-2 flex items-center text-sm text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground">{call.duration}</div>
                  <div className="text-xs">{call.timestamp}</div>
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                {call.recording ? (
                  <Mic className="w-4 h-4 text-success" />
                ) : (
                  <MicOff className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Play Recording</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Follow-up</DropdownMenuItem>
                    <DropdownMenuItem>Create Ticket</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCalls.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg shadow-lg p-4 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {selectedCalls.length} call{selectedCalls.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Export
            </Button>
            <Button size="sm" variant="outline">
              Schedule Follow-up
            </Button>
            <Button size="sm" variant="outline">
              Create Tickets
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
