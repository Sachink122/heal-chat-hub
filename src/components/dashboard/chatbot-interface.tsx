import { useState } from "react"
import { Send, Mic, Paperclip, MoreHorizontal, Phone, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: string
  urgent?: boolean
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "Hello! I'm your healthcare assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    type: "user",
    content: "I've been having chest pain for the last hour. Should I be concerned?",
    timestamp: "10:32 AM",
    urgent: true,
  },
  {
    id: "3",
    type: "bot",
    content: "Chest pain can be serious. Based on your symptoms, I recommend seeking immediate medical attention. I'm connecting you with an emergency service now. Please call 911 or go to the nearest emergency room.",
    timestamp: "10:32 AM",
    urgent: true,
  },
  {
    id: "4",
    type: "user",
    content: "Thank you, I'm heading to the hospital now.",
    timestamp: "10:33 AM",
  },
]

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "I understand your concern. Let me help you with that. Based on your symptoms, I would recommend...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="HealthBot" />
              <AvatarFallback>HB</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">HealthBot Assistant</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="h-2 w-2 bg-success rounded-full animate-pulse"></span>
                Online • Ready to help
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-success border-success">
              Emergency Mode Active
            </Badge>
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View History</DropdownMenuItem>
                <DropdownMenuItem>Export Chat</DropdownMenuItem>
                <DropdownMenuItem>Emergency Alert</DropdownMenuItem>
                <DropdownMenuItem>Transfer to Doctor</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.type === "user"
                  ? message.urgent
                    ? "bg-emergency text-emergency-foreground"
                    : "bg-primary text-primary-foreground"
                  : message.urgent
                  ? "bg-gradient-emergency border border-emergency/20"
                  : "bg-muted"
              } ${message.urgent ? "animate-pulse-glow" : ""}`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3 max-w-[70%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}