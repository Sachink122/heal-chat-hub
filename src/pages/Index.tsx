import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardWidgets } from "@/components/dashboard/dashboard-widgets"
import { ChatbotInterface } from "@/components/dashboard/chatbot-interface"
import { RightPanel } from "@/components/dashboard/right-panel"

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="flex-1 p-6 space-y-6">
            <DashboardWidgets />
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-0">
              <div className="xl:col-span-3">
                <ChatbotInterface />
              </div>
              
              <div className="xl:col-span-1">
                <RightPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
