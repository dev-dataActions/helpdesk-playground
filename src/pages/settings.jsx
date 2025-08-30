import { Settings as SettingsIcon, User, Bell, Shield } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your helpdesk settings and preferences.</p>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Profile Settings"
          value="Configured"
          change="Last updated 2 days ago"
          changeType="neutral"
          icon={User}
          iconBg="bg-primary"
        />
        <MetricCard
          title="Notifications"
          value="Active"
          change="5 notification types"
          changeType="positive"
          icon={Bell}
          iconBg="bg-warning"
        />
        <MetricCard
          title="Security"
          value="Enabled"
          change="2FA active"
          changeType="positive"
          icon={Shield}
          iconBg="bg-success"
        />
        <MetricCard
          title="System Status"
          value="Healthy"
          change="All systems operational"
          changeType="positive"
          icon={SettingsIcon}
          iconBg="bg-purple-600"
        />
      </div>

      {/* Placeholder content */}
      <div className="bg-card rounded-lg border p-8 text-center">
        <SettingsIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
        <p className="text-muted-foreground">
          This is a placeholder for the settings interface. The actual settings system would be implemented here.
        </p>
      </div>
    </div>
  );
}
