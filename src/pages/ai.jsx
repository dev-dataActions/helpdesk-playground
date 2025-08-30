import { Bot, Brain, Zap, TrendingUp } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";

export default function AI() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Fin AI</h1>
        <p className="text-muted-foreground">AI-powered customer support and automation tools.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="AI Resolution Rate"
          value="68%"
          change="+5% from yesterday"
          changeType="positive"
          icon={Bot}
          iconBg="bg-purple-600"
        />
        <MetricCard
          title="Auto-Responses"
          value={234}
          change="+18% from yesterday"
          changeType="positive"
          icon={Brain}
          iconBg="bg-primary"
        />
        <MetricCard
          title="Response Time"
          value="< 1m"
          change="Instant responses"
          changeType="positive"
          icon={Zap}
          iconBg="bg-warning"
        />
        <MetricCard
          title="Accuracy Rate"
          value="94%"
          change="+2% from last week"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-success"
        />
      </div>

      {/* Placeholder content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
        <p className="text-muted-foreground">
          This is a placeholder for the AI assistant interface. The actual AI system would be implemented here.
        </p>
      </div>
    </div>
  );
}
