import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  BarChart3,
  Bell,
  MessageSquare,
  Settings,
  Users,
  Home,
  Globe,
  Moon,
  Sun,
  Monitor,
  Heart,
  Activity,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/ui/theme-provider"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    badge: null,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: MessageSquare,
    badge: "12",
  },
  {
    title: "Alerts",
    url: "/alerts",
    icon: Bell,
    badge: "3",
    badgeVariant: "destructive" as const,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    badge: "24",
    badgeVariant: "secondary" as const,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    badge: null,
  },
]

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
]

export function DashboardSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const currentPath = location.pathname
  const isActive = (path: string) => currentPath === path
  const isCollapsed = state === "collapsed"

  const getNavClassName = (path: string) => {
    const base = "w-full justify-start transition-all duration-200"
    return isActive(path)
      ? `${base} bg-primary text-primary-foreground shadow-lg`
      : `${base} hover:bg-accent hover:text-accent-foreground`
  }

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor

  return (
    <Sidebar className="border-r bg-card" collapsible="icon">
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-lg">HealthBot</h2>
              <p className="text-xs text-muted-foreground">AI Healthcare Assistant</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className={`${isCollapsed ? "h-5 w-5" : "mr-3 h-5 w-5"}`} />
                      {!isCollapsed && (
                        <div className="flex w-full items-center justify-between">
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant={item.badgeVariant || "default"}
                              className="h-5 px-2 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <div className={`flex ${isCollapsed ? "flex-col gap-1" : "items-center justify-between"}`}>
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "sm"}
                className="h-9"
              >
                <Globe className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Language</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={selectedLanguage === lang.code ? "bg-accent" : ""}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? "icon" : "sm"}
                className="h-9"
              >
                <ThemeIcon className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Theme</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {!isCollapsed && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-gradient-health p-3">
            <Activity className="h-4 w-4 text-primary animate-pulse" />
            <div className="text-xs">
              <p className="font-medium">System Status</p>
              <p className="text-muted-foreground">Online • All systems operational</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}