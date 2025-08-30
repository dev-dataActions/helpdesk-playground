import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, BookOpen, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

// Mock initial messages for demo
const getInitialMessages = (ticketId) => {
  const mockMessages = {
    1: [
      {
        id: "msg1",
        content: "Hi there! I'm having trouble with payment integration. The Stripe webhook isn't working properly.",
        sender: "customer",
        timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
        senderName: "Sarah Chen",
      },
      {
        id: "msg2",
        content:
          "Hello Sarah! I understand you're experiencing issues with Stripe webhook integration. Let me help you troubleshoot this. Can you please share the error message you're seeing?",
        sender: "agent",
        timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
        senderName: "Alex Miller",
      },
      {
        id: "msg3",
        content:
          "Sure! The error is: 'webhook endpoint verification failed' - it happens every time we try to process a payment.",
        sender: "customer",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        senderName: "Sarah Chen",
      },
    ],
    2: [
      {
        id: "msg4",
        content:
          "Hello! I need help setting up my account permissions. I can't access some features that should be available in my plan.",
        sender: "customer",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        senderName: "Marcus Johnson",
      },
      {
        id: "msg5",
        content:
          "Hi Marcus! I'd be happy to help with your account permissions. Let me check your current plan and permissions setup.",
        sender: "agent",
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        senderName: "Lisa Wong",
      },
    ],
  };

  return mockMessages[ticketId] || [];
};

export function ChatThread({ ticketId, customerName, agentName, onMessageSent }) {
  const [messages, setMessages] = useState(() => getInitialMessages(ticketId));
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (Math.random() > 0.7) {
      // 30% chance of showing typing indicator
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `msg_${Date.now()}`,
      content: newMessage.trim(),
      sender: "agent",
      timestamp: new Date(),
      senderName: agentName,
    };

    setMessages((prev) => [...prev, message]);
    onMessageSent?.(message);
    setNewMessage("");

    // Simulate customer response after a delay
    setTimeout(() => {
      const responses = [
        "Thank you for the help!",
        "That makes sense, let me try that.",
        "Perfect, I'll give that a shot.",
        "Got it, thanks for explaining.",
        "I see, let me check on that.",
      ];

      const customerResponse = {
        id: `msg_${Date.now()}_customer`,
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "customer",
        timestamp: new Date(),
        senderName: customerName,
      };

      setMessages((prev) => [...prev, customerResponse]);
    }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Conversation with {customerName}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "agent" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "customer" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-secondary-foreground">
                    {message.senderName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}

              <div className={`max-w-xs lg:max-w-md ${message.sender === "agent" ? "order-1" : ""}`}>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === "customer" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div
                  className={`flex items-center gap-1 mt-1 ${
                    message.sender === "agent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                </div>
              </div>

              {message.sender === "agent" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-primary-foreground">
                    {message.senderName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs font-medium text-secondary-foreground">
                  {customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="bg-muted px-4 py-2 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Reply Box */}
        <div className="border-t p-4 space-y-3">
          <Textarea
            placeholder="Reply to customer…"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-20 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Insert FAQ
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Close after reply
              </Button>
              <Button variant="outline" size="sm">
                Escalate
              </Button>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
