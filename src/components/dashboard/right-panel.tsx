import { useState } from "react"
import { AlertTriangle, Bell, Filter, Zap, UserX, UserCheck, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const urgencyLevels = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High Priority", color: "destructive" },
  { value: "medium", label: "Medium Priority", color: "warning" },
  { value: "low", label: "Low Priority", color: "secondary" },
]

const quickAlerts = [
  {
    id: "1",
    title: "Emergency Protocol Activated",
    message: "Patient experiencing severe chest pain",
    time: "2 min ago",
    urgency: "high",
    type: "emergency",
  },
  {
    id: "2",
    title: "System Maintenance",
    message: "Scheduled maintenance in 30 minutes",
    time: "5 min ago",
    urgency: "medium",
    type: "system",
  },
  {
    id: "3",
    title: "New Patient Registration",
    message: "3 new patients registered today",
    time: "10 min ago",
    urgency: "low",
    type: "info",
  },
]

const quickActions = [
  { label: "Mute Notifications", icon: Bell, action: "mute" },
  { label: "Block User", icon: UserX, action: "block" },
  { label: "Assign Doctor", icon: UserCheck, action: "assign" },
  { label: "Mark Priority", icon: AlertTriangle, action: "priority" },
  { label: "Emergency Alert", icon: Zap, action: "emergency" },
]

export function RightPanel() {
  const [selectedUrgency, setSelectedUrgency] = useState("all")
  const [systemStatus, setSystemStatus] = useState("online")

  const filteredAlerts = quickAlerts.filter(
    alert => selectedUrgency === "all" || alert.urgency === selectedUrgency
  )

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-destructive"
      case "medium": return "text-warning"
      case "low": return "text-muted-foreground"
      default: return "text-foreground"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "emergency": return AlertTriangle
      case "system": return Clock
      default: return Bell
    }
  }

  return (
    <div className="space-y-4">
      {/* Quick Alerts */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Quick Alerts</CardTitle>
            <Badge variant="destructive" className="h-5 px-2">
              {filteredAlerts.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type)
            return (
              <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Icon className={`h-4 w-4 mt-0.5 ${getUrgencyColor(alert.urgency)}`} />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Badge 
                  variant={alert.urgency === "high" ? "destructive" : alert.urgency === "medium" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {alert.urgency}
                </Badge>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Urgency Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Urgency Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              {urgencyLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="ghost"
              className="w-full justify-start h-9"
              onClick={() => console.log(`Action: ${action.action}`)}
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Main System</span>
            <Badge variant="outline" className="text-success border-success">
              Online
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Chat Service</span>
            <Badge variant="outline" className="text-success border-success">
              Operational
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Engine</span>
            <Badge variant="outline" className="text-success border-success">
              Running
            </Badge>
          </div>
          <Separator />
          <div className="text-center">
            <Button
              variant={systemStatus === "online" ? "destructive" : "default"}
              size="sm"
              onClick={() => setSystemStatus(systemStatus === "online" ? "offline" : "online")}
            >
              {systemStatus === "online" ? "Go Offline" : "Go Online"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            <Badge variant="secondary" className="h-5 px-2">
              5
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
          <div className="text-sm">
            <p className="font-medium">Dr. Smith joined the chat</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Emergency protocol activated</p>
            <p className="text-xs text-muted-foreground">5 minutes ago</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">System backup completed</p>
            <p className="text-xs text-muted-foreground">10 minutes ago</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}