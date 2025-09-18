import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Clock, Activity } from "lucide-react"

const users = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    status: "active",
    lastSeen: "Online now",
    joinedToday: true,
    avatar: "SJ",
    condition: "Hypertension"
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "mike.chen@email.com",
    status: "away",
    lastSeen: "15 min ago",
    joinedToday: false,
    avatar: "MC",
    condition: "Diabetes"
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@email.com", 
    status: "offline",
    lastSeen: "2 hours ago",
    joinedToday: true,
    avatar: "ED",
    condition: "General Consultation"
  },
]

const Users = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success"
      case "away": return "warning"
      case "offline": return "secondary"
      default: return "secondary"
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Users & Patients</h1>
              <p className="text-muted-foreground">Manage patient accounts and monitor activity</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={user.name} />
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      {user.joinedToday && (
                        <Badge variant="secondary" className="text-xs">
                          New Today
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <Badge variant={getStatusColor(user.status) as any}>
                          {user.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Seen</span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {user.lastSeen}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Condition</span>
                        <span className="text-sm text-muted-foreground">{user.condition}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Activity className="h-4 w-4 mr-2" />
                        History
                      </Button>
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

export default Users