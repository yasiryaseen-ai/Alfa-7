import { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Pause,
  Play,
  Grid3X3,
  Star,
  User,
  Search,
  ArrowLeftRight,
  MessageSquare,
  Video,
  Delete,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface Contact {
  id: string;
  name: string;
  number: string;
  avatar?: string;
  favorite?: boolean;
  lastCall?: string;
}

interface CallLog {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  timestamp: string;
}

const mockContacts: Contact[] = [
  { id: '1', name: 'John Smith', number: '+1 (555) 123-4567', favorite: true, lastCall: '2 hours ago' },
  { id: '2', name: 'Sarah Johnson', number: '+1 (555) 987-6543', favorite: true, lastCall: 'Yesterday' },
  { id: '3', name: 'Mike Davis', number: '+1 (555) 456-7890', lastCall: '3 days ago' },
  { id: '4', name: 'Emily Wilson', number: '+1 (555) 789-0123', lastCall: '1 week ago' },
  { id: '5', name: 'David Brown', number: '+1 (555) 321-6547', favorite: true, lastCall: '2 weeks ago' },
];

const mockCallLogs: CallLog[] = [
  { id: '1', name: 'John Smith', number: '+1 (555) 123-4567', type: 'outgoing', duration: '5:23', timestamp: '2 hours ago' },
  { id: '2', name: 'Sarah Johnson', number: '+1 (555) 987-6543', type: 'incoming', duration: '12:45', timestamp: 'Yesterday' },
  { id: '3', name: 'Unknown', number: '+1 (555) 111-2222', type: 'missed', duration: '-', timestamp: 'Yesterday' },
  { id: '4', name: 'Mike Davis', number: '+1 (555) 456-7890', type: 'outgoing', duration: '3:12', timestamp: '3 days ago' },
];

const dialPad = [
  ['1', ''], ['2', 'ABC'], ['3', 'DEF'],
  ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'],
  ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ'],
  ['*', ''], ['0', '+'], ['#', ''],
];

export default function VCDialer() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [activeTab, setActiveTab] = useState<'keypad' | 'contacts' | 'recent'>('keypad');
  const [selectedProvider, setSelectedProvider] = useState<'twilio' | 'telnyx' | 'custom'>('twilio');
  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isCalling && !isOnHold) {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isCalling, isOnHold]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDial = (key: string) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (phoneNumber.length >= 10) {
      setIsCalling(true);
      setCallDuration(0);
      toast.success(`Calling ${phoneNumber} via ${selectedProvider}...`);
    } else {
      toast.error('Please enter a valid phone number');
    }
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallDuration(0);
    setIsMuted(false);
    setIsSpeakerOn(false);
    setIsOnHold(false);
    toast.success('Call ended');
  };

  const handleContactCall = (contact: Contact) => {
    setPhoneNumber(contact.number);
    setIsCalling(true);
    setCallDuration(0);
    toast.success(`Calling ${contact.name}...`);
  };

  // Active Call UI
  if (isCalling) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {/* Call Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center animate-pulse-glow">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {phoneNumber}
            </h2>
            <p className="text-muted-foreground">
              {isOnHold ? 'On Hold' : formatDuration(callDuration)}
            </p>
            <Badge className="badge-cyan mt-2">
              {selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}
            </Badge>
          </div>

          {/* Call Controls */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isMuted ? 'bg-red-500/20 text-red-400' : 'glass-card text-white'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsOnHold(!isOnHold)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isOnHold ? 'bg-yellow-500/20 text-yellow-400' : 'glass-card text-white'
              }`}
            >
              {isOnHold ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isSpeakerOn ? 'bg-neon-purple/20 text-neon-purple' : 'glass-card text-white'
              }`}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
            <button className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-white">
              <Grid3X3 className="w-6 h-6" />
            </button>
            <button className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-white">
              <Video className="w-6 h-6" />
            </button>
            <button className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-white">
              <MessageSquare className="w-6 h-6" />
            </button>
          </div>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
          >
            <PhoneOff className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">VC Dialer</h1>
          <p className="text-muted-foreground">Make calls through multiple providers</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-xl glass-card">
          {(['twilio', 'telnyx', 'custom'] as const).map((provider) => (
            <button
              key={provider}
              onClick={() => setSelectedProvider(provider)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedProvider === provider 
                  ? 'bg-neon-purple text-white' 
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {provider.charAt(0).toUpperCase() + provider.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dialer */}
        <Card className="glass-card border-0">
          <CardContent className="p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'keypad', label: 'Keypad', icon: Grid3X3 },
                { id: 'contacts', label: 'Contacts', icon: User },
                { id: 'recent', label: 'Recent', icon: Clock },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-neon-purple text-white' 
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'keypad' && (
              <div className="space-y-6">
                {/* Number Display */}
                <div className="relative">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full text-center text-3xl font-bold text-white bg-transparent border-b-2 border-white/10 pb-4 outline-none focus:border-neon-purple transition-colors"
                  />
                  {phoneNumber && (
                    <button
                      onClick={handleBackspace}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-white transition-colors"
                    >
                      <Delete className="w-6 h-6" />
                    </button>
                  )}
                </div>

                {/* Dial Pad */}
                <div className="grid grid-cols-3 gap-4">
                  {dialPad.map(([key, letters]) => (
                    <button
                      key={key}
                      onClick={() => handleDial(key)}
                      className="aspect-square rounded-2xl glass-card flex flex-col items-center justify-center hover:bg-white/10 transition-colors group"
                    >
                      <span className="text-2xl font-bold text-white group-hover:text-neon-purple transition-colors">{key}</span>
                      {letters && <span className="text-xs text-muted-foreground">{letters}</span>}
                    </button>
                  ))}
                </div>

                {/* Call Button */}
                <button
                  onClick={handleCall}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center gap-3 hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/30"
                >
                  <Phone className="w-6 h-6 text-white" />
                  <span className="text-lg font-semibold text-white">Call</span>
                </button>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl input-glass"
                  />
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {mockContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 rounded-xl glass-panel hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => handleContactCall(contact)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-semibold">
                          {contact.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-white">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.number}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {contact.favorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                        <button className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center hover:bg-green-500/30 transition-colors">
                          <Phone className="w-4 h-4 text-green-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recent' && (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {mockCallLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-xl glass-panel hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => {
                      setPhoneNumber(log.number);
                      setActiveTab('keypad');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        log.type === 'incoming' ? 'bg-green-500/20' :
                        log.type === 'outgoing' ? 'bg-neon-purple/20' :
                        'bg-red-500/20'
                      }`}>
                        <ArrowLeftRight className={`w-4 h-4 ${
                          log.type === 'incoming' ? 'text-green-400' :
                          log.type === 'outgoing' ? 'text-neon-purple' :
                          'text-red-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{log.name}</p>
                        <p className="text-sm text-muted-foreground">{log.number}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">{log.duration}</p>
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Provider Info */}
        <div className="space-y-6">
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Provider Status</h3>
              <div className="space-y-4">
                {[
                  { name: 'Twilio', status: 'connected', latency: '45ms' },
                  { name: 'Telnyx', status: 'connected', latency: '32ms' },
                  { name: 'Custom SIP', status: 'disconnected', latency: '-' },
                ].map((provider, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl glass-panel">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        provider.status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                      }`} />
                      <span className="text-white">{provider.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={provider.status === 'connected' ? 'badge-cyan' : 'bg-red-500/20 text-red-400'}>
                        {provider.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{provider.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl glass-panel text-center">
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-sm text-muted-foreground">Calls Today</p>
                </div>
                <div className="p-4 rounded-xl glass-panel text-center">
                  <p className="text-2xl font-bold text-white">4.2h</p>
                  <p className="text-sm text-muted-foreground">Talk Time</p>
                </div>
                <div className="p-4 rounded-xl glass-panel text-center">
                  <p className="text-2xl font-bold text-white">94%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="p-4 rounded-xl glass-panel text-center">
                  <p className="text-2xl font-bold text-white">$12.50</p>
                  <p className="text-sm text-muted-foreground">Cost Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Call Quality</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Audio Quality</span>
                    <span className="text-white">Excellent</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Connection Stability</span>
                    <span className="text-white">98%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Latency</span>
                    <span className="text-white">32ms</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
