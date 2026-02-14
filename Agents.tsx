import { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Play, 
  Pause, 
  Edit2, 
  Trash2, 
  Copy,
  Settings,
  MessageSquare,
  Phone,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Mic,
  Volume2,
  Languages,
  Brain,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  Power
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Agent {
  id: string;
  name: string;
  type: 'voice' | 'whatsapp' | 'hybrid';
  status: 'active' | 'paused' | 'training';
  language: string;
  voice: string;
  callsHandled: number;
  successRate: number;
  avgDuration: string;
  lastActive: string;
  avatar: string;
  description: string;
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Sales Assistant Pro',
    type: 'voice',
    status: 'active',
    language: 'English (US)',
    voice: 'Sarah - Professional',
    callsHandled: 1234,
    successRate: 94.5,
    avgDuration: '3:24',
    lastActive: '2 min ago',
    avatar: 'S',
    description: 'Handles sales inquiries and product recommendations'
  },
  {
    id: '2',
    name: 'Support Bot Alpha',
    type: 'hybrid',
    status: 'active',
    language: 'English (US)',
    voice: 'Mike - Friendly',
    callsHandled: 3421,
    successRate: 96.2,
    avgDuration: '5:12',
    lastActive: 'Just now',
    avatar: 'S',
    description: 'Customer support for technical issues'
  },
  {
    id: '3',
    name: 'WhatsApp Helper',
    type: 'whatsapp',
    status: 'paused',
    language: 'English (UK)',
    voice: 'Emma - Casual',
    callsHandled: 892,
    successRate: 91.8,
    avgDuration: '2:45',
    lastActive: '1 hour ago',
    avatar: 'W',
    description: 'WhatsApp messaging automation'
  },
  {
    id: '4',
    name: 'Appointment Scheduler',
    type: 'voice',
    status: 'training',
    language: 'Spanish',
    voice: 'Carlos - Professional',
    callsHandled: 0,
    successRate: 0,
    avgDuration: '-',
    lastActive: 'Never',
    avatar: 'A',
    description: 'Books appointments and manages calendar'
  },
  {
    id: '5',
    name: 'Lead Qualifier',
    type: 'voice',
    status: 'active',
    language: 'English (US)',
    voice: 'Lisa - Energetic',
    callsHandled: 567,
    successRate: 88.3,
    avgDuration: '4:18',
    lastActive: '15 min ago',
    avatar: 'L',
    description: 'Qualifies leads and gathers information'
  },
];

const agentTemplates = [
  { name: 'Sales Assistant', icon: TrendingUp, description: 'Handle sales calls and convert leads' },
  { name: 'Customer Support', icon: Headphones, description: 'Provide 24/7 customer support' },
  { name: 'Appointment Booker', icon: Calendar, description: 'Schedule and manage appointments' },
  { name: 'Survey Collector', icon: ClipboardList, description: 'Conduct surveys and collect feedback' },
  { name: 'Lead Qualifier', icon: Users, description: 'Qualify and segment leads' },
  { name: 'Custom Agent', icon: Sparkles, description: 'Build your own custom agent' },
];

import { Headphones, Calendar, ClipboardList } from 'lucide-react';

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        const newStatus = agent.status === 'active' ? 'paused' : 'active';
        toast.success(`${agent.name} is now ${newStatus}`);
        return { ...agent, status: newStatus };
      }
      return agent;
    }));
  };

  const deleteAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (confirm(`Are you sure you want to delete ${agent?.name}?`)) {
      setAgents(agents.filter(a => a.id !== id));
      toast.success('Agent deleted successfully');
    }
  };

  const duplicateAgent = (agent: Agent) => {
    const newAgent = {
      ...agent,
      id: Date.now().toString(),
      name: `${agent.name} (Copy)`,
      status: 'paused' as const,
      callsHandled: 0,
    };
    setAgents([...agents, newAgent]);
    toast.success('Agent duplicated successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'training': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Phone className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'hybrid': return <Bot className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">AI Agents</h1>
          <p className="text-muted-foreground">Manage your intelligent voice and messaging agents</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Create New AI Agent</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {agentTemplates.map((template, i) => (
                <button
                  key={i}
                  className="glass-card rounded-xl p-4 text-left card-hover group"
                  onClick={() => {
                    toast.success(`Creating ${template.name}...`);
                    setShowCreateDialog(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: agents.length, icon: Bot, color: 'text-neon-purple' },
          { label: 'Active', value: agents.filter(a => a.status === 'active').length, icon: Power, color: 'text-green-400' },
          { label: 'Paused', value: agents.filter(a => a.status === 'paused').length, icon: Pause, color: 'text-yellow-400' },
          { label: 'Training', value: agents.filter(a => a.status === 'training').length, icon: Brain, color: 'text-blue-400' },
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

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-3 rounded-xl input-glass"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="btn-glass">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Agents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="glass-card border-0 card-hover group">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white text-xl font-bold">
                    {agent.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{agent.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                        {getTypeIcon(agent.type)}
                        <span className="ml-1 capitalize">{agent.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-panel border-white/10">
                    <DropdownMenuItem onClick={() => toggleAgentStatus(agent.id)}>
                      {agent.status === 'active' ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {agent.status === 'active' ? 'Pause' : 'Activate'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => duplicateAgent(agent)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteAgent(agent.id)} className="text-red-400">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Languages className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{agent.language}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{agent.voice}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{agent.callsHandled}</p>
                  <p className="text-xs text-muted-foreground">Calls</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{agent.successRate}%</p>
                  <p className="text-xs text-muted-foreground">Success</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{agent.avgDuration}</p>
                  <p className="text-xs text-muted-foreground">Avg Duration</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  className={`flex-1 ${agent.status === 'active' ? 'btn-glass' : 'btn-primary'}`}
                  onClick={() => toggleAgentStatus(agent.id)}
                >
                  {agent.status === 'active' ? (
                    <><Pause className="w-4 h-4 mr-2" /> Pause</>
                  ) : (
                    <><Play className="w-4 h-4 mr-2" /> Activate</>
                  )}
                </Button>
                <Button className="btn-glass px-3">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            <Bot className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
          <p className="text-muted-foreground mb-4">Create your first AI agent to get started</p>
          <Button className="btn-primary" onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      )}
    </div>
  );
}
