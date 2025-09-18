import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Clock, User } from "lucide-react"

const conversations = [
  {
    id: "1",
    patient: "Sarah Johnson",
    lastMessage: "Thank you for your help with my symptoms",
    time: "2 min ago",
    status: "active",
    priority: "high",
    avatar: "SJ"
  },
  {
    id: "2",
    patient: "Mike Chen",
    lastMessage: "When should I take my medication?",
    time: "15 min ago",
    status: "waiting",
    priority: "medium",
    avatar: "MC"
  },
  {
    id: "3",
    patient: "Emily Davis",
    lastMessage: "I'm feeling much better now",
    time: "1 hour ago",
    status: "resolved",
    priority: "low",
    avatar: "ED"
  },
]

const Conversations = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Conversations</h1>
              <p className="text-muted-foreground">Manage patient conversations and chat history</p>
            </div>

            <div className="grid gap-4">
              {conversations.map((conversation) => (
                <Card key={conversation.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={conversation.patient} />
                          <AvatarFallback>{conversation.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{conversation.patient}</h3>
                          <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={
                            conversation.priority === "high" ? "destructive" : 
                            conversation.priority === "medium" ? "secondary" : "outline"
                          }
                        >
                          {conversation.priority}
                        </Badge>
                        <Badge 
                          variant={conversation.status === "active" ? "default" : "secondary"}
                        >
                          {conversation.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {conversation.time}
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          View Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Conversations