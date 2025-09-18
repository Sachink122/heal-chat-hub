import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Bell, Clock, Zap } from "lucide-react"

const alerts = [
  {
    id: "1",
    title: "Emergency: Chest Pain Patient",
    description: "Patient reporting severe chest pain, ambulance dispatched",
    time: "2 min ago",
    priority: "emergency",
    type: "medical",
    status: "active"
  },
  {
    id: "2",
    title: "System Alert: High Server Load", 
    description: "Server experiencing high load, response times may be affected",
    time: "15 min ago",
    priority: "high",
    type: "system",
    status: "investigating"
  },
  {
    id: "3",
    title: "Medication Reminder",
    description: "3 patients have missed their medication reminders",
    time: "1 hour ago",
    priority: "medium",
    type: "medication",
    status: "pending"
  },
]

const Alerts = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "medical": return AlertTriangle
      case "system": return Zap
      case "medication": return Bell
      default: return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency": return "destructive"
      case "high": return "destructive"
      case "medium": return "secondary"
      case "low": return "outline"
      default: return "outline"
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
              <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
              <p className="text-muted-foreground">Monitor emergency alerts and system notifications</p>
            </div>

            <div className="grid gap-4">
              {alerts.map((alert) => {
                const Icon = getAlertIcon(alert.type)
                return (
                  <Card key={alert.id} className={`${alert.priority === "emergency" ? "border-emergency animate-pulse-glow" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${
                            alert.priority === "emergency" ? "bg-emergency text-emergency-foreground" :
                            alert.priority === "high" ? "bg-destructive text-destructive-foreground" :
                            "bg-muted"
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <p className="text-muted-foreground">{alert.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 items-end">
                          <Badge variant={getPriorityColor(alert.priority) as any}>
                            {alert.priority}
                          </Badge>
                          <Badge variant="outline">
                            {alert.status}
                          </Badge>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button 
                              variant={alert.priority === "emergency" ? "destructive" : "default"} 
                              size="sm"
                            >
                              Respond
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Alerts