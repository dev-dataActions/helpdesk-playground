import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Star, Calendar, MessageSquare, User, Tag, CheckCircle } from "lucide-react";

const agents = [
  { id: 1, name: "Sarah Chen", csat: 4.2, lastCoaching: "2024-01-15", flaggedConversations: 3 },
  { id: 2, name: "Mike Rodriguez", csat: 3.8, lastCoaching: "2024-01-10", flaggedConversations: 7 },
  { id: 3, name: "Emily Johnson", csat: 4.6, lastCoaching: "2024-01-20", flaggedConversations: 1 },
  { id: 4, name: "David Kim", csat: 3.5, lastCoaching: "2024-01-08", flaggedConversations: 12 },
  { id: 5, name: "Lisa Wang", csat: 4.4, lastCoaching: "2024-01-18", flaggedConversations: 2 },
];

const flaggedConversations = [
  {
    id: "C-001",
    customer: "John Smith",
    rating: "Bad",
    topic: "Payment Issue",
    date: "2024-01-22",
    reviewer: "Unassigned",
  },
  {
    id: "C-002",
    customer: "Maria Garcia",
    rating: "OK",
    topic: "Refund Request",
    date: "2024-01-22",
    reviewer: "Manager A",
  },
  {
    id: "C-003",
    customer: "Alex Brown",
    rating: "Bad",
    topic: "Account Access",
    date: "2024-01-21",
    reviewer: "Unassigned",
  },
  {
    id: "C-004",
    customer: "Emma Wilson",
    rating: "OK",
    topic: "Billing Question",
    date: "2024-01-21",
    reviewer: "Manager B",
  },
  {
    id: "C-005",
    customer: "Robert Davis",
    rating: "Bad",
    topic: "Technical Support",
    date: "2024-01-20",
    reviewer: "Unassigned",
  },
];

const coachingCategories = ["Tone", "Accuracy", "Resolution Speed", "Empathy", "Product Knowledge", "Policy Adherence"];

export default function TrainingCoaching() {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [coachingNotes, setCoachingNotes] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Training & Coaching</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage agent performance and coaching sessions</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="payments">Payments Team</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="billing">Billing Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Agents List */}
        <div className="w-80 border-r bg-card p-4 overflow-y-auto">
          <h3 className="font-medium text-foreground mb-4">Team Agents</h3>
          <div className="space-y-3">
            {agents.map((agent) => (
              <Card
                key={agent.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedAgent?.id === agent.id ? "ring-2 ring-primary bg-muted/30" : ""
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm text-foreground">{agent.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground">{agent.csat}</span>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>Last coaching: {agent.lastCoaching}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" />
                    <span>{agent.flaggedConversations} flagged conversations</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col">
          {/* Flagged Conversations Queue */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Flagged Conversations Queue</h3>
              <Badge variant="secondary">{flaggedConversations.length} conversations</Badge>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 border-b">
                <div className="grid grid-cols-6 gap-4 p-3 text-xs font-medium text-muted-foreground">
                  <div>Conversation ID</div>
                  <div>Customer</div>
                  <div>Rating</div>
                  <div>Topic</div>
                  <div>Date</div>
                  <div>Action</div>
                </div>
              </div>
              <div className="divide-y">
                {flaggedConversations.map((conversation) => (
                  <div key={conversation.id} className="grid grid-cols-6 gap-4 p-3 text-sm hover:bg-muted/20">
                    <div className="font-mono text-muted-foreground">{conversation.id}</div>
                    <div className="text-foreground">{conversation.customer}</div>
                    <div>
                      <Badge variant={conversation.rating === "Bad" ? "destructive" : "secondary"}>
                        {conversation.rating}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{conversation.topic}</div>
                    <div className="text-muted-foreground">{conversation.date}</div>
                    <div>
                      <Button size="sm" variant="outline" onClick={() => setSelectedConversation(conversation)}>
                        Review & Coach
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Coaching Notes (when conversation selected) */}
        {selectedConversation && (
          <div className="w-96 border-l bg-card p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Coaching Notes</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedConversation(null)}>
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">
                  Conversation: {selectedConversation.id}
                </label>
                <div className="text-sm text-foreground">
                  <p>
                    <strong>Customer:</strong> {selectedConversation.customer}
                  </p>
                  <p>
                    <strong>Topic:</strong> {selectedConversation.topic}
                  </p>
                  <p>
                    <strong>Rating:</strong>
                    <Badge
                      variant={selectedConversation.rating === "Bad" ? "destructive" : "secondary"}
                      className="ml-2"
                    >
                      {selectedConversation.rating}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Coaching Notes</label>
                <Textarea
                  placeholder="Add coaching notes (e.g., 'Needs improvement in empathy when handling payment issues')"
                  value={coachingNotes}
                  onChange={(e) => setCoachingNotes(e.target.value)}
                  className="min-h-24"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-2">Coaching Categories</label>
                <div className="flex flex-wrap gap-2">
                  {coachingCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Button className="w-full" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Coaching Session
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
