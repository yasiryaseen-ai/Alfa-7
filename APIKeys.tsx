import { useState } from 'react';
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2, 
  RefreshCw,
  Clock,
  Check,
  AlertCircle,
  Shield,
  Code,
  Terminal,
  BookOpen,
  ExternalLink,
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

interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  permissions: string[];
  status: 'active' | 'revoked';
}

const mockKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'sk_live_51H...xYz123',
    createdAt: '2025-11-15',
    lastUsed: '2 hours ago',
    permissions: ['Read', 'Write', 'Delete'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'sk_test_51H...aBc456',
    createdAt: '2025-12-01',
    lastUsed: '1 day ago',
    permissions: ['Read', 'Write'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Webhook Integration',
    key: 'sk_wh_51H...dEf789',
    createdAt: '2025-10-20',
    lastUsed: 'Never',
    permissions: ['Read'],
    status: 'revoked'
  },
];

const codeExamples = [
  {
    language: 'cURL',
    code: `curl -X POST https://api.voiceaipro.com/v1/calls \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone_number": "+1234567890",
    "agent_id": "agent_123",
    "message": "Hello!"
  }'`
  },
  {
    language: 'JavaScript',
    code: `const VoiceAI = require('voiceai-pro');

const client = new VoiceAI('YOUR_API_KEY');

const call = await client.calls.create({
  phone_number: '+1234567890',
  agent_id: 'agent_123',
  message: 'Hello!'
});

console.log(call.id);`
  },
  {
    language: 'Python',
    code: `import voiceai_pro

client = voiceai_pro.Client('YOUR_API_KEY')

call = client.calls.create(
    phone_number='+1234567890',
    agent_id='agent_123',
    message='Hello!'
)

print(call.id)`
  },
];

export default function APIKeys() {
  const [keys, setKeys] = useState<APIKey[]>(mockKeys);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('cURL');

  const toggleKeyVisibility = (id: string) => {
    setRevealedKeys(prev => 
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard');
  };

  const revokeKey = (id: string) => {
    if (confirm('Are you sure you want to revoke this API key?')) {
      setKeys(keys.map(k => k.id === id ? { ...k, status: 'revoked' } : k));
      toast.success('API key revoked');
    }
  };

  const createNewKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: 'sk_live_' + Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: ['Read'],
      status: 'active'
    };
    setKeys([newKey, ...keys]);
    setShowKeyDialog(false);
    toast.success('New API key created');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">API Keys</h1>
          <p className="text-muted-foreground">Manage your API keys and access tokens</p>
        </div>
        <Dialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Create API Key</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Key Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl input-glass"
                  placeholder="e.g., Production API Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Permissions</label>
                <div className="space-y-2">
                  {['Read', 'Write', 'Delete'].map((perm) => (
                    <label key={perm} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-white/20 bg-white/5" defaultChecked={perm === 'Read'} />
                      <span className="text-sm text-muted-foreground">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-200">
                    Make sure to copy your API key now. You won\'t be able to see it again!
                  </p>
                </div>
              </div>
              <Button className="w-full btn-primary" onClick={createNewKey}>
                Create API Key
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Keys', value: keys.length, icon: Key },
          { label: 'Active', value: keys.filter(k => k.status === 'active').length, icon: Check },
          { label: 'Revoked', value: keys.filter(k => k.status === 'revoked').length, icon: AlertCircle },
          { label: 'API Calls (24h)', value: '12.5K', icon: Code },
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

      {/* API Keys List */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your API Keys</h3>
          <div className="space-y-4">
            {keys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 rounded-xl glass-panel">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-white">{apiKey.name}</h4>
                      <Badge className={apiKey.status === 'active' ? 'badge-cyan' : 'bg-red-500/20 text-red-400'}>
                        {apiKey.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Created: {apiKey.createdAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-4 h-4" />
                        Last used: {apiKey.lastUsed}
                      </span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {apiKey.permissions.map((perm, i) => (
                        <Badge key={i} className="badge-neon text-xs">{perm}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-xl glass-card">
                      <code className="text-sm text-muted-foreground">
                        {revealedKeys.includes(apiKey.id) ? apiKey.key : apiKey.key.replace(/./g, '•')}
                      </code>
                      <button 
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-1 hover:bg-white/5 rounded transition-colors"
                      >
                        {revealedKeys.includes(apiKey.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button 
                      className="btn-glass px-3"
                      onClick={() => copyKey(apiKey.key)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      className="btn-glass px-3 text-red-400 hover:text-red-300"
                      onClick={() => revokeKey(apiKey.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Quick Start</h3>
            <div className="flex gap-2">
              {codeExamples.map((ex) => (
                <button
                  key={ex.language}
                  onClick={() => setSelectedLanguage(ex.language)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedLanguage === ex.language 
                      ? 'bg-neon-purple text-white' 
                      : 'glass-card text-muted-foreground hover:text-white'
                  }`}
                >
                  {ex.language}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <pre className="p-4 rounded-xl glass-panel overflow-x-auto">
              <code className="text-sm text-muted-foreground">
                {codeExamples.find(ex => ex.language === selectedLanguage)?.code}
              </code>
            </pre>
            <Button 
              className="absolute top-2 right-2 btn-glass px-3 py-1 text-xs"
              onClick={() => copyKey(codeExamples.find(ex => ex.language === selectedLanguage)?.code || '')}
            >
              <Copy className="w-3 h-3 mr-1" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Links */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: BookOpen, title: 'API Documentation', desc: 'Complete API reference' },
          { icon: Terminal, title: 'SDKs & Libraries', desc: 'Official client libraries' },
          { icon: Code, title: 'Webhook Guide', desc: 'Set up webhooks' },
        ].map((item, i) => (
          <Card key={i} className="glass-card border-0 card-hover">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
