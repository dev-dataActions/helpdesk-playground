import { useState } from "react";
import { TrendingUp, Target, Award, Users, Clock, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const valueProps = [
  {
    id: 1,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance for your customers",
    impact: "high",
    status: "active",
    metrics: {
      satisfaction: 95,
      responseTime: "2 min",
      resolutionRate: 87,
    },
  },
  {
    id: 2,
    title: "AI-Powered Automation",
    description: "Intelligent responses and ticket routing",
    impact: "high",
    status: "active",
    metrics: {
      satisfaction: 92,
      responseTime: "30 sec",
      resolutionRate: 78,
    },
  },
  {
    id: 3,
    title: "Multi-Channel Support",
    description: "Email, chat, phone, and social media integration",
    impact: "medium",
    status: "active",
    metrics: {
      satisfaction: 89,
      responseTime: "5 min",
      resolutionRate: 82,
    },
  },
  {
    id: 4,
    title: "Advanced Analytics",
    description: "Comprehensive insights and reporting",
    impact: "medium",
    status: "draft",
    metrics: {
      satisfaction: 0,
      responseTime: "N/A",
      resolutionRate: 0,
    },
  },
];

export default function ValueProp() {
  const [selectedImpact, setSelectedImpact] = useState("all");

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProps = valueProps.filter((prop) => selectedImpact === "all" || prop.impact === selectedImpact);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Value Propositions</h1>
          <p className="text-gray-600">Track and optimize your key value drivers</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <TrendingUp className="w-4 h-4 mr-2" />
          Add Value Prop
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Props</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">3 active, 1 draft</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Impact</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">50% high impact</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+3% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5m</div>
            <p className="text-xs text-muted-foreground">-15% faster</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Filter by impact:</span>
          <div className="flex space-x-2">
            {["all", "high", "medium", "low"].map((impact) => (
              <Button
                key={impact}
                size="sm"
                variant={selectedImpact === impact ? "default" : "outline"}
                onClick={() => setSelectedImpact(impact)}
                className="capitalize"
              >
                {impact}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Value Props Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProps.map((prop) => (
          <Card key={prop.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{prop.title}</CardTitle>
                  <CardDescription>{prop.description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getImpactColor(prop.impact)}>{prop.impact}</Badge>
                  <Badge className={getStatusColor(prop.status)}>{prop.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{prop.metrics.satisfaction}%</div>
                    <div className="text-xs text-gray-600">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{prop.metrics.responseTime}</div>
                    <div className="text-xs text-gray-600">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{prop.metrics.resolutionRate}%</div>
                    <div className="text-xs text-gray-600">Resolution Rate</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Metrics
                  </Button>
                  <Button size="sm" variant="outline">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
