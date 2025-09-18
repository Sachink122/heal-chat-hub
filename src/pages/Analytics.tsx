import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Activity, Users } from "lucide-react"

const Analytics = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Analytics & Reports</h1>
              <p className="text-muted-foreground">Performance metrics and response accuracy data</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Accuracy</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.8%</div>
                  <Progress value={94.8} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    +2.3% from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2s</div>
                  <Progress value={85} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    -0.3s improvement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7/5</div>
                  <Progress value={94} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on 2,847 ratings
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Emergency Response</span>
                      <span className="text-sm text-muted-foreground">98.5%</span>
                    </div>
                    <Progress value={98.5} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">General Queries</span>
                      <span className="text-sm text-muted-foreground">92.1%</span>
                    </div>
                    <Progress value={92.1} />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Medication Reminders</span>
                      <span className="text-sm text-muted-foreground">96.3%</span>
                    </div>
                    <Progress value={96.3} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Analytics