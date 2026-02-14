import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Phone, 
  Users, 
  CreditCard, 
  Megaphone, 
  Plug, 
  Settings, 
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  Search,
  Zap,
  MessageSquare,
  Code,
  Key,
  BarChart3,
  LogOut,
  User,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Headphones,
  Globe,
  Shield,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Import Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import VCDialer from './pages/VCDialer';
import PhoneNumbers from './pages/PhoneNumbers';
import WhatsApp from './pages/WhatsApp';
import Contacts from './pages/Contacts';
import Credits from './pages/Credits';
import Campaigns from './pages/Campaigns';
import Integrations from './pages/Integrations';
import APIKeys from './pages/APIKeys';
import SettingsPage from './pages/Settings';
import AuthModal from './components/AuthModal';

export type Page = 
  | 'landing' 
  | 'dashboard' 
  | 'agents' 
  | 'vc-dialer' 
  | 'phone-numbers' 
  | 'whatsapp' 
  | 'contacts' 
  | 'credits' 
  | 'campaigns' 
  | 'integrations' 
  | 'api-keys' 
  | 'settings';

interface NavItem {
  id: Page;
  label: string;
  icon: React.ElementType;
  badge?: string;
  subItems?: { id: string; label: string; icon: React.ElementType }[];
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Agents', icon: Bot, badge: 'New' },
  { id: 'vc-dialer', label: 'VC Dialer', icon: Phone },
  { id: 'phone-numbers', label: 'Phone Numbers', icon: Headphones },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, badge: 'Beta' },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'credits', label: 'Credits & Billing', icon: CreditCard },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { 
    id: 'integrations', 
    label: 'Integrations', 
    icon: Plug,
    subItems: [
      { id: 'zapier', label: 'Zapier', icon: Zap },
      { id: 'n8n', label: 'N8N', icon: Code },
      { id: 'make', label: 'Make.com', icon: Sparkles },
      { id: 'webhooks', label: 'Webhooks', icon: Globe },
    ]
  },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [credits] = useState(50.00);

  useEffect(() => {
    // Check if user is already authenticated (mock)
    const auth = localStorage.getItem('voiceai_auth');
    if (auth) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setCurrentPage('dashboard');
    localStorage.setItem('voiceai_auth', 'true');
    toast.success('Welcome to VoiceAI Pro!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
    localStorage.removeItem('voiceai_auth');
    toast.success('Logged out successfully');
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onSignIn={handleSignIn} onSignUp={handleSignUp} />;
      case 'dashboard':
        return <Dashboard />;
      case 'agents':
        return <Agents />;
      case 'vc-dialer':
        return <VCDialer />;
      case 'phone-numbers':
        return <PhoneNumbers />;
      case 'whatsapp':
        return <WhatsApp />;
      case 'contacts':
        return <Contacts />;
      case 'credits':
        return <Credits />;
      case 'campaigns':
        return <Campaigns />;
      case 'integrations':
        return <Integrations />;
      case 'api-keys':
        return <APIKeys />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  // Landing page without sidebar
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        {renderPage()}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          mode={authMode}
          onSuccess={handleAuthSuccess}
        />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${
            sidebarOpen ? 'w-72' : 'w-20'
          }`}
        >
          <div className="h-full glass-panel border-r border-white/5 flex flex-col">
            {/* Logo */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center neon-glow flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-display font-bold text-lg text-white">VoiceAI Pro</h1>
                  <p className="text-xs text-muted-foreground">Next-Gen Calling</p>
                </div>
              )}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="ml-auto p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

            <Separator className="bg-white/5" />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          if (item.subItems) {
                            toggleExpand(item.id);
                          } else {
                            setCurrentPage(item.id);
                          }
                        }}
                        className={`w-full sidebar-item ${currentPage === item.id ? 'active' : ''}`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && (
                          <>
                            <span className="flex-1 text-left">{item.label}</span>
                            {item.badge && (
                              <Badge className="badge-neon text-[10px]">{item.badge}</Badge>
                            )}
                            {item.subItems && (
                              <ChevronDown className={`w-4 h-4 transition-transform ${expandedItems.includes(item.id) ? 'rotate-180' : ''}`} />
                            )}
                          </>
                        )}
                      </button>
                    </TooltipTrigger>
                    {!sidebarOpen && (
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  
                  {/* Sub Items */}
                  {sidebarOpen && item.subItems && expandedItems.includes(item.id) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentPage('integrations')}
                          className="w-full sidebar-item py-2 text-sm"
                        >
                          <sub.icon className="w-4 h-4" />
                          <span>{sub.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <Separator className="bg-white/5" />

            {/* Credits Display */}
            {sidebarOpen && (
              <div className="p-4">
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-neon-cyan" />
                    <span className="text-sm text-muted-foreground">Available Credits</span>
                  </div>
                  <p className="text-2xl font-bold text-white">${credits.toFixed(2)}</p>
                  <Button 
                    className="w-full mt-3 btn-primary text-sm py-2"
                    onClick={() => setCurrentPage('credits')}
                  >
                    Add Credits
                  </Button>
                </div>
              </div>
            )}

            {/* User Profile */}
            <div className="p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <Avatar className="w-10 h-10 border-2 border-neon-purple/30">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-neon-purple/20 text-neon-purple">JD</AvatarFallback>
                    </Avatar>
                    {sidebarOpen && (
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white">John Doe</p>
                        <p className="text-xs text-muted-foreground">Pro Plan</p>
                      </div>
                    )}
                    {sidebarOpen && <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-panel border-white/10">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => setCurrentPage('settings')} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentPage('settings')} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
          {/* Header */}
          <header className="sticky top-0 z-30 glass-panel border-b border-white/5">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Search */}
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search agents, contacts, campaigns..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl input-glass text-sm"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* Credits Badge */}
                <Badge className="badge-cyan hidden md:flex items-center gap-2 px-3 py-1.5">
                  <Wallet className="w-3 h-3" />
                  ${credits.toFixed(2)}
                </Badge>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon-pink rounded-full animate-pulse" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 glass-panel border-white/10">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-3 hover:bg-white/5 cursor-pointer">
                        <p className="text-sm font-medium">New AI Agent Created</p>
                        <p className="text-xs text-muted-foreground">Sales Assistant is now active</p>
                      </div>
                      <div className="p-3 hover:bg-white/5 cursor-pointer">
                        <p className="text-sm font-medium">Campaign Completed</p>
                        <p className="text-xs text-muted-foreground">Holiday Campaign reached 1000 calls</p>
                      </div>
                      <div className="p-3 hover:bg-white/5 cursor-pointer">
                        <p className="text-sm font-medium">Low Credits Warning</p>
                        <p className="text-xs text-muted-foreground">Your credits are below $10</p>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Quick Actions */}
                <Button 
                  className="btn-primary hidden md:flex items-center gap-2"
                  onClick={() => setCurrentPage('vc-dialer')}
                >
                  <Phone className="w-4 h-4" />
                  New Call
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6">
            {renderPage()}
          </div>
        </main>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          mode={authMode}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </TooltipProvider>
  );
}

export default App;
