import { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter,
  Play,
  Pause,
  BarChart3,
  Users,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Calendar,
  Target,
  TrendingUp,
  ArrowRight,
  Bot,
  MessageSquare,
  Copy,
  Edit2,
  Trash2
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

interface Campaign {
  id: string;
  name: string;
  type: 'voice' | 'whatsapp' | 'mixed';
  status: 'active' | 'paused' | 'completed' | 'scheduled';
  agent: string;
  contacts: number;
  completed: number;
  successRate: number;
  startDate: string;
  endDate?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Holiday Sale Outreach',
    type: 'voice',
    status: 'active',
    agent: 'Sales Assistant Pro',
    contacts: 1000,
    completed: 456,
    successRate: 68.5,
    startDate: '2025-12-01',
  },
  {
    id: '2',
    name: 'Customer Feedback Survey',
    type: 'whatsapp',
    status: 'completed',
    agent: 'Support Bot Alpha',
    contacts: 500,
    completed: 500,
    successRate: 82.3,
    startDate: '2025-11-15',
    endDate: '2025-11-20',
  },
  {
    id: '3',
    name: 'Product Launch Announcement',
    type: 'mixed',
    status: 'scheduled',
    agent: 'Sales Assistant Pro',
    contacts: 2500,
    completed: 0,
    successRate: 0,
    startDate: '2025-12-28',
  },
  {
    id: '4',
    name: 'Appointment Reminders',
    type: 'voice',
    status: 'paused',
    agent: 'Appointment Scheduler',
    contacts: 200,
    completed: 150,
    successRate: 95.0,
    startDate: '2025-12-10',
  },
];

const campaignTemplates = [
  { name: 'Sales Outreach', icon: Target, description: 'Reach out to potential customers' },
  { name: 'Customer Support', icon: CheckCircle2, description: 'Follow up on support tickets' },
  { name: 'Survey Collection', icon: BarChart3, description: 'Collect feedback from customers' },
  { name: 'Appointment Reminders', icon: Calendar, description: 'Remind customers of upcoming appointments' },
  { name: 'Product Updates', icon: Megaphone, description: 'Announce new features or products' },
  { name: 'Custom Campaign', icon: Plus, description: 'Build your own custom campaign' },
];

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'active' ? 'paused' : 'active';
        toast.success(`Campaign ${newStatus}`);
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const deleteCampaign = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      toast.success('Campaign deleted');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'scheduled': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'voice': return <Phone className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'mixed': return <Bot className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Campaigns</h1>
          <p className="text-muted-foreground">Create and manage your calling campaigns</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Create New Campaign</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {campaignTemplates.map((template, i) => (
                <button
                  key={i}
                  className="p-4 rounded-xl glass-card text-left card-hover group"
                  onClick={() => {
                    toast.success(`Creating ${template.name} campaign...`);
                    setShowCreateDialog(false);
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Campaigns', value: campaigns.length, icon: Megaphone },
          { label: 'Active', value: campaigns.filter(c => c.status === 'active').length, icon: Play },
          { label: 'Completed', value: campaigns.filter(c => c.status === 'completed').length, icon: CheckCircle2 },
          { label: 'Total Reach', value: '4,200', icon: Users },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-0">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-neon-purple">
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

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-3 rounded-xl input-glass"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button className="btn-glass">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="btn-glass">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="glass-card border-0 card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                    {getTypeIcon(campaign.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                      <Badge className="badge-cyan">{campaign.agent}</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{campaign.contacts}</p>
                    <p className="text-xs text-muted-foreground">Contacts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{campaign.completed}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gradient">{campaign.successRate}%</p>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className={campaign.status === 'active' ? 'btn-glass' : 'btn-primary'}
                      onClick={() => toggleCampaignStatus(campaign.id)}
                    >
                      {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="btn-glass px-3">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-panel border-white/10">
                        <DropdownMenuItem>
                          <BarChart3 className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteCampaign(campaign.id)} className="text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-white">{Math.round((campaign.completed / campaign.contacts) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all"
                    style={{ width: `${(campaign.completed / campaign.contacts) * 100}%` }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Started: {campaign.startDate}
                </div>
                {campaign.endDate && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4" />
                    Ended: {campaign.endDate}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            <Megaphone className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
          <p className="text-muted-foreground mb-4">Create your first campaign to get started</p>
          <Button className="btn-primary" onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      )}
    </div>
  );
}
