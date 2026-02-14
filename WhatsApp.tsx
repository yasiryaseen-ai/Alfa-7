import { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  QrCode,
  Link,
  Settings,
  BarChart3,
  Users,
  Bot,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Chat {
  id: string;
  name: string;
  number: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'online' | 'offline' | 'typing';
}

interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'file';
  sender: 'me' | 'them';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'John Smith',
    number: '+1 (555) 123-4567',
    lastMessage: 'Thanks for the quick response!',
    timestamp: '2 min ago',
    unread: 2,
    status: 'online'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    number: '+1 (555) 987-6543',
    lastMessage: 'Can you help me with my order?',
    timestamp: '15 min ago',
    unread: 0,
    status: 'offline'
  },
  {
    id: '3',
    name: 'Support Group',
    number: 'Group',
    lastMessage: 'Mike: I\'ll check that for you',
    timestamp: '1 hour ago',
    unread: 5,
    status: 'typing'
  },
  {
    id: '4',
    name: 'David Brown',
    number: '+1 (555) 456-7890',
    lastMessage: 'When will my package arrive?',
    timestamp: '2 hours ago',
    unread: 0,
    status: 'offline'
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hi! How can I help you today?',
    type: 'text',
    sender: 'me',
    timestamp: '10:30 AM',
    status: 'read'
  },
  {
    id: '2',
    content: 'I have a question about my recent order',
    type: 'text',
    sender: 'them',
    timestamp: '10:31 AM',
    status: 'read'
  },
  {
    id: '3',
    content: 'Of course! I\'d be happy to help. Could you please provide your order number?',
    type: 'text',
    sender: 'me',
    timestamp: '10:32 AM',
    status: 'read'
  },
  {
    id: '4',
    content: 'It\'s #ORD-12345',
    type: 'text',
    sender: 'them',
    timestamp: '10:33 AM',
    status: 'read'
  },
  {
    id: '5',
    content: 'Thanks for the quick response!',
    type: 'text',
    sender: 'them',
    timestamp: '10:35 AM',
    status: 'delivered'
  },
];

export default function WhatsApp() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messageInput, setMessageInput] = useState('');
  const [showConnectDialog, setShowConnectDialog] = useState(false);

  const sendMessage = () => {
    if (messageInput.trim()) {
      toast.success('Message sent');
      setMessageInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">WhatsApp Integration</h1>
          <p className="text-muted-foreground">Manage WhatsApp Business API conversations</p>
        </div>
        <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Link className="w-4 h-4 mr-2" />
              Connect WhatsApp
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Connect WhatsApp Business</DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-center">
              <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-white p-4">
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-white" />
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Scan this QR code with your WhatsApp Business app to connect
              </p>
              <div className="flex gap-3">
                <Button className="flex-1 btn-glass">
                  <Phone className="w-4 h-4 mr-2" />
                  Use Phone Number
                </Button>
                <Button 
                  className="flex-1 btn-primary"
                  onClick={() => {
                    toast.success('WhatsApp connected successfully!');
                    setShowConnectDialog(false);
                  }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Connected
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: '12,456', icon: MessageSquare, color: 'text-green-400' },
          { label: 'Active Chats', value: '234', icon: Users, color: 'text-neon-cyan' },
          { label: 'Response Rate', value: '98%', icon: CheckCheck, color: 'text-neon-purple' },
          { label: 'AI Agents', value: '3', icon: Bot, color: 'text-orange-400' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-0">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chat Interface */}
      <Card className="glass-card border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-3 h-[600px]">
            {/* Chat List */}
            <div className="border-r border-white/5">
              {/* Search */}
              <div className="p-4 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl input-glass text-sm"
                  />
                </div>
              </div>

              {/* Chats */}
              <div className="overflow-y-auto h-[calc(600px-73px)]">
                {mockChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${
                      selectedChat?.id === chat.id ? 'bg-neon-purple/10' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                        {chat.name[0]}
                      </div>
                      {chat.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">{chat.name}</h4>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate max-w-[150px]">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge className="bg-green-500 text-white text-xs">{chat.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                          {selectedChat.name[0]}
                        </div>
                        {selectedChat.status === 'online' && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{selectedChat.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {selectedChat.status === 'typing' ? (
                            <span className="text-green-400">typing...</span>
                          ) : (
                            selectedChat.status
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button className="btn-glass px-3">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button className="btn-glass px-3">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button className="btn-glass px-3">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            message.sender === 'me'
                              ? 'bg-green-600 text-white rounded-br-md'
                              : 'glass-panel text-white rounded-bl-md'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div className={`flex items-center gap-1 mt-1 ${message.sender === 'me' ? 'justify-end' : ''}`}>
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                            {message.sender === 'me' && (
                              message.status === 'read' ? (
                                <CheckCheck className="w-3 h-3 text-blue-400" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <Button className="btn-glass px-3">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 rounded-xl input-glass"
                      />
                      <Button className="btn-glass px-3">
                        <Smile className="w-5 h-5" />
                      </Button>
                      <Button 
                        className="btn-primary px-4"
                        onClick={sendMessage}
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Select a chat</h3>
                    <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Agent Settings */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">AI WhatsApp Agents</h3>
              <p className="text-sm text-muted-foreground">Configure automated responses</p>
            </div>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Support Bot', status: 'active', responseTime: '< 1s' },
              { name: 'Sales Assistant', status: 'active', responseTime: '< 2s' },
              { name: 'Order Tracker', status: 'paused', responseTime: '-' },
            ].map((agent, i) => (
              <div key={i} className="p-4 rounded-xl glass-panel flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">Response: {agent.responseTime}</p>
                  </div>
                </div>
                <Badge className={agent.status === 'active' ? 'badge-cyan' : 'bg-yellow-500/20 text-yellow-400'}>
                  {agent.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
