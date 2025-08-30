import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../../../components/ui/toaster";
import { Toaster as Sonner } from "../../../components/ui/sonner";
import { TooltipProvider } from "../../../components/ui/tooltip";
import { SidebarProvider } from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/layout/AppSidebar";

const queryClient = new QueryClient();

export const HelpdeskLayout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-auto">
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
