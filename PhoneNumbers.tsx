import { useState } from 'react';
import { 
  Phone, 
  Plus, 
  Search, 
  Globe, 
  Check,
  Copy,
  Trash2,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  Shield,
  Zap
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

interface PhoneNumber {
  id: string;
  number: string;
  provider: 'twilio' | 'telnyx' | 'custom';
  country: string;
  type: 'local' | 'toll-free' | 'mobile';
  status: 'active' | 'pending' | 'suspended';
  agent?: string;
  monthlyCost: number;
  capabilities: string[];
}

const mockNumbers: PhoneNumber[] = [
  {
    id: '1',
    number: '+1 (555) 123-4567',
    provider: 'twilio',
    country: 'United States',
    type: 'local',
    status: 'active',
    agent: 'Sales Assistant Pro',
    monthlyCost: 1.15,
    capabilities: ['Voice', 'SMS', 'MMS']
  },
  {
    id: '2',
    number: '+1 (800) 987-6543',
    provider: 'telnyx',
    country: 'United States',
    type: 'toll-free',
    status: 'active',
    agent: 'Support Bot Alpha',
    monthlyCost: 2.00,
    capabilities: ['Voice', 'SMS']
  },
  {
    id: '3',
    number: '+44 20 7946 0958',
    provider: 'twilio',
    country: 'United Kingdom',
    type: 'local',
    status: 'pending',
    monthlyCost: 1.50,
    capabilities: ['Voice']
  },
  {
    id: '4',
    number: '+1 (555) 789-0123',
    provider: 'custom',
    country: 'United States',
    type: 'local',
    status: 'suspended',
    monthlyCost: 0.50,
    capabilities: ['Voice', 'SMS']
  },
];

const providers = [
  {
    id: 'twilio',
    name: 'Twilio',
    logo: 'T',
    description: 'Global VoIP with Voice Insights for analytics',
    features: [
      'AI-powered Conversational IVR',
      'SHAKEN/STIR for robocall prevention',
      'Programmable Voice SDKs',
      'Real-time call analytics'
    ],
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'telnyx',
    name: 'Telnyx',
    logo: 'Tx',
    description: 'Private global IP network for low latency',
    features: [
      'Pay-as-you-go pricing, 30% savings vs. Twilio',
      'TeXML compatibility for easy migration',
      'Advanced call control with real-time speech recognition',
      'Global number inventory'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'custom',
    name: 'Custom Telephony',
    logo: 'C',
    description: 'Scalable VoIP with customizable call flows',
    features: [
      'Flexible APIs for bespoke telephony integrations',
      'Advanced security with end-to-end encryption',
      'Multi-channel support for voice and messaging',
      'Custom SIP trunking'
    ],
    color: 'from-neon-purple to-neon-pink'
  }
];

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];

export default function PhoneNumbers() {
  const [numbers, setNumbers] = useState<PhoneNumber[]>(mockNumbers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('twilio');
  const [selectedCountry, setSelectedCountry] = useState('US');

  const filteredNumbers = numbers.filter(num => 
    num.number.includes(searchQuery) ||
    num.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    toast.success('Number copied to clipboard');
  };

  const deleteNumber = (id: string) => {
    if (confirm('Are you sure you want to release this number?')) {
      setNumbers(numbers.filter(n => n.id !== id));
      toast.success('Number released successfully');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Phone Numbers</h1>
          <p className="text-muted-foreground">Manage your phone numbers and telephony settings</p>
        </div>
        <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Buy Number
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Buy a Phone Number</DialogTitle>
            </DialogHeader>
            
            {/* Provider Selection */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-white mb-3">Select Provider</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {providers.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`p-4 rounded-xl glass-card text-left card-hover ${
                      selectedProvider === provider.id ? 'border-neon-purple/50 neon-glow' : ''
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${provider.color} flex items-center justify-center mb-3`}>
                      <span className="text-white font-bold">{provider.logo}</span>
                    </div>
                    <h4 className="font-semibold text-white mb-1">{provider.name}</h4>
                    <p className="text-xs text-muted-foreground">{provider.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Country Selection */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white mb-3">Select Country</h3>
              <div className="grid grid-cols-4 gap-2">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className={`p-3 rounded-xl glass-card flex items-center gap-2 transition-all ${
                      selectedCountry === country.code ? 'border-neon-purple/50 bg-neon-purple/10' : ''
                    }`}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className="text-sm text-white">{country.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Available Numbers */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white mb-3">Available Numbers</h3>
              <div className="space-y-2">
                {['+1 (555) 234-5678', '+1 (555) 876-5432', '+1 (555) 345-6789'].map((num, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl glass-panel">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-neon-purple" />
                      <span className="text-white font-mono">{num}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="badge-cyan">Local</Badge>
                      <span className="text-sm text-muted-foreground">$1.15/mo</span>
                      <Button 
                        className="btn-primary text-sm py-1 px-3"
                        onClick={() => {
                          toast.success(`Number ${num} purchased successfully!`);
                          setShowBuyDialog(false);
                        }}
                      >
                        Buy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Provider Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className="glass-card border-0 card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{provider.logo}</span>
                </div>
                <Badge className="badge-cyan">Connected</Badge>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{provider.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
              <ul className="space-y-2">
                {provider.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4 btn-glass">
                <ExternalLink className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search phone numbers..."
          className="w-full pl-10 pr-4 py-3 rounded-xl input-glass"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Numbers List */}
      <div className="space-y-4">
        {filteredNumbers.map((number) => (
          <Card key={number.id} className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-white font-mono">{number.number}</h3>
                      <button 
                        onClick={() => copyNumber(number.number)}
                        className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(number.status)}>
                        {number.status === 'active' ? <CheckCircle2 className="w-3 h-3 mr-1" /> :
                         number.status === 'pending' ? <RefreshCw className="w-3 h-3 mr-1" /> :
                         <XCircle className="w-3 h-3 mr-1" />}
                        {number.status}
                      </Badge>
                      <Badge className="badge-cyan">{number.type}</Badge>
                      <span className="text-sm text-muted-foreground">{number.country}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Assigned Agent</p>
                    <p className="text-white">{number.agent || 'Unassigned'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                    <p className="text-white">${number.monthlyCost.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="btn-glass px-3">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button 
                      className="btn-glass px-3 text-red-400 hover:text-red-300"
                      onClick={() => deleteNumber(number.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Capabilities */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <span className="text-sm text-muted-foreground">Capabilities:</span>
                {number.capabilities.map((cap, i) => (
                  <Badge key={i} className="badge-neon text-xs">
                    {cap}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNumbers.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            <Phone className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No phone numbers found</h3>
          <p className="text-muted-foreground mb-4">Buy your first phone number to get started</p>
          <Button className="btn-primary" onClick={() => setShowBuyDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Buy Number
          </Button>
        </div>
      )}
    </div>
  );
}
