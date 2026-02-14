import { useState } from 'react';
import { 
  Plug, 
  Zap, 
  Code, 
  Sparkles,
  Globe,
  Check,
  X,
  Settings,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Webhook,
  Database,
  MessageSquare,
  Phone,
  CreditCard,
  BarChart3,
  Calendar,
  Mail,
  FileSpreadsheet,
  Lock
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

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  status: 'connected' | 'disconnected' | 'pending';
  color: string;
}

const integrations: Integration[] = [
  // Automation
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 5000+ apps and automate workflows',
    icon: Zap,
    category: 'Automation',
    status: 'connected',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'n8n',
    name: 'N8N',
    description: 'Open-source workflow automation with fair-code license',
    icon: Code,
    category: 'Automation',
    status: 'disconnected',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'make',
    name: 'Make.com',
    description: 'Visual platform to design, build, and automate anything',
    icon: Sparkles,
    category: 'Automation',
    status: 'connected',
    color: 'from-purple-500 to-indigo-500'
  },
  // Telephony
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'Cloud communications platform for voice and SMS',
    icon: Phone,
    category: 'Telephony',
    status: 'connected',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'telnyx',
    name: 'Telnyx',
    description: 'Global communications platform with private network',
    icon: Globe,
    category: 'Telephony',
    status: 'connected',
    color: 'from-blue-500 to-cyan-500'
  },
  // CRM
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'World\'s #1 CRM platform',
    icon: Database,
    category: 'CRM',
    status: 'disconnected',
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Inbound marketing, sales, and service software',
    icon: Database,
    category: 'CRM',
    status: 'connected',
    color: 'from-orange-400 to-orange-600'
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    description: 'Unified customer experience platform',
    icon: Database,
    category: 'CRM',
    status: 'disconnected',
    color: 'from-red-500 to-red-600'
  },
  // Communication
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication and collaboration',
    icon: MessageSquare,
    category: 'Communication',
    status: 'connected',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Voice, video and text communication',
    icon: MessageSquare,
    category: 'Communication',
    status: 'disconnected',
    color: 'from-indigo-500 to-purple-500'
  },
  // Payments
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing platform',
    icon: CreditCard,
    category: 'Payments',
    status: 'connected',
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Online payment system',
    icon: CreditCard,
    category: 'Payments',
    status: 'disconnected',
    color: 'from-blue-500 to-cyan-500'
  },
  // Productivity
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Online spreadsheet application',
    icon: FileSpreadsheet,
    category: 'Productivity',
    status: 'connected',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Time-management and scheduling',
    icon: Calendar,
    category: 'Productivity',
    status: 'disconnected',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email service by Google',
    icon: Mail,
    category: 'Productivity',
    status: 'connected',
    color: 'from-red-500 to-pink-500'
  },
];

const categories = ['All', 'Automation', 'Telephony', 'CRM', 'Communication', 'Payments', 'Productivity'];

export default function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [integrationList, setIntegrationList] = useState(integrations);
  const [showWebhookDialog, setShowWebhookDialog] = useState(false);

  const filteredIntegrations = selectedCategory === 'All' 
    ? integrationList 
    : integrationList.filter(i => i.category === selectedCategory);

  const toggleIntegration = (id: string) => {
    setIntegrationList(integrationList.map(i => {
      if (i.id === id) {
        const newStatus = i.status === 'connected' ? 'disconnected' : 'connected';
        toast.success(`${i.name} ${newStatus}`);
        return { ...i, status: newStatus };
      }
      return i;
    }));
  };

  const connectedCount = integrationList.filter(i => i.status === 'connected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and automate workflows</p>
        </div>
        <Dialog open={showWebhookDialog} onOpenChange={setShowWebhookDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Webhook className="w-4 h-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Add Webhook</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Webhook URL</label>
                <input 
                  type="url" 
                  className="w-full px-4 py-3 rounded-xl input-glass"
                  placeholder="https://your-domain.com/webhook"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Events</label>
                <div className="space-y-2">
                  {['Call Started', 'Call Ended', 'Message Received', 'Agent Created'].map((event) => (
                    <label key={event} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                      <span className="text-sm text-muted-foreground">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button 
                className="w-full btn-primary"
                onClick={() => {
                  toast.success('Webhook added successfully');
                  setShowWebhookDialog(false);
                }}
              >
                Add Webhook
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Integrations', value: integrationList.length, icon: Plug },
          { label: 'Connected', value: connectedCount, icon: Check },
          { label: 'Available', value: integrationList.length - connectedCount, icon: Zap },
          { label: 'Webhooks', value: '3', icon: Webhook },
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

      {/* Developer Hub */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Developer Hub</h3>
                <p className="text-muted-foreground">Access API keys, manage webhooks, and integrate with our platform</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="btn-glass">
                <ExternalLink className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button className="btn-primary">
                <ArrowRight className="w-4 h-4 mr-2" />
                API Keys
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-neon-purple text-white' 
                : 'glass-card text-muted-foreground hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="glass-card border-0 card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                  <integration.icon className="w-7 h-7 text-white" />
                </div>
                <Badge className={integration.status === 'connected' ? 'badge-cyan' : 'bg-gray-500/20 text-gray-400'}>
                  {integration.status}
                </Badge>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-1">{integration.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <Badge className="badge-neon text-xs">{integration.category}</Badge>
              </div>
              
              <Button 
                className={`w-full ${integration.status === 'connected' ? 'btn-glass' : 'btn-primary'}`}
                onClick={() => toggleIntegration(integration.id)}
              >
                {integration.status === 'connected' ? (
                  <><X className="w-4 h-4 mr-2" /> Disconnect</>
                ) : (
                  <><Plug className="w-4 h-4 mr-2" /> Connect</>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Automation Examples */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Automation Examples</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Call Notifications', desc: 'Get Slack alerts for new calls', tags: ['slack', 'discord'] },
              { title: 'Lead Management', desc: 'Auto-create leads in your CRM', tags: ['salesforce', 'hubspot'] },
              { title: 'Data Export', desc: 'Log calls to Google Sheets', tags: ['sheets', 'excel'] },
              { title: 'Calendar Sync', desc: 'Schedule follow-ups automatically', tags: ['calendar', 'outlook'] },
            ].map((example, i) => (
              <div key={i} className="p-4 rounded-xl glass-panel">
                <h4 className="font-medium text-white mb-1">{example.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{example.desc}</p>
                <div className="flex gap-1 flex-wrap">
                  {example.tags.map((tag, j) => (
                    <Badge key={j} className="badge-cyan text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
