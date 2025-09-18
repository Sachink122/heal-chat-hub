import { Activity, Users, MessageSquare, AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const widgets = [
  {
    title: "Active Users",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Messages Today",
    value: "1,247",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: MessageSquare,
    color: "text-blue-500",
  },
  {
    title: "Emergency Alerts",
    value: "3",
    change: "-2",
    changeType: "negative" as const,
    icon: AlertTriangle,
    color: "text-emergency",
  },
  {
    title: "Response Accuracy",
    value: "94.8%",
    change: "+1.2%",
    changeType: "positive" as const,
    icon: Activity,
    color: "text-success",
  },
]

export function DashboardWidgets() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {widgets.map((widget) => (
        <Card key={widget.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {widget.title}
            </CardTitle>
            <widget.icon className={`h-4 w-4 ${widget.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{widget.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge
                variant={widget.changeType === "positive" ? "default" : "destructive"}
                className="px-1 py-0 text-xs"
              >
                {widget.change}
              </Badge>
              <span>from last hour</span>
            </div>
            {widget.title === "Response Accuracy" && (
              <Progress value={94.8} className="mt-2 h-2" />
            )}
          </CardContent>
        </Card>
      ))}

      {/* System Status Card */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-success" />
            System Status
            <Badge variant="outline" className="ml-auto">
              All Systems Operational
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Chat Service</span>
                <Badge variant="outline" className="text-success border-success">
                  Online
                </Badge>
              </div>
              <Progress value={99.9} className="h-2" />
              <p className="text-xs text-muted-foreground">99.9% uptime</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Processing</span>
                <Badge variant="outline" className="text-success border-success">
                  Online
                </Badge>
              </div>
              <Progress value={97.5} className="h-2" />
              <p className="text-xs text-muted-foreground">97.5% uptime</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <Badge variant="outline" className="text-success border-success">
                  Online
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-muted-foreground">100% uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}