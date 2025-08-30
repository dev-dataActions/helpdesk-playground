import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BarChart3,
  MessageSquare,
  Ticket,
  Bot,
  Phone,
  Users,
  Inbox,
  Settings,
  Bell,
  Search,
  Home,
  TrendingUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Tickets", url: "/tickets", icon: Ticket },
  { title: "Conversations", url: "/conversations", icon: MessageSquare },
];

const aiItems = [
  { title: "Fin AI", url: "/ai", icon: Bot },
  { title: "Calls", url: "/calls", icon: Phone },
];

const managementItems = [
  { title: "Team", url: "/team", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Dashboards", url: "/dashboards", icon: BarChart3 },
  { title: "Value Prop", url: "/value-prop", icon: TrendingUp },
  { title: "Settings", url: "/settings", icon: Settings },
];

// Add Insights section for analytics
const analyticsItems = [{ title: "Insights", url: "/insights", icon: BarChart3 }];

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const currentPath = router.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path) => currentPath === path;
  const getNavCls = ({ isActive }) => (isActive ? "nav-item nav-item-active" : "nav-item nav-item-inactive");

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar h-screen`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-2 mb-6">
          {!collapsed && <span className="inline-block text-lg font-semibold text-sidebar-foreground">Helpdesk</span>}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavCls({ isActive: isActive(item.url) })}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavCls({ isActive: isActive(item.url) })}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI & Automation */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2">
            AI & Automation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {aiItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavCls({ isActive: isActive(item.url) })}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={getNavCls({ isActive: isActive(item.url) })}>
                      <item.icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
