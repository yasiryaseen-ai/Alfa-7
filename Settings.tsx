import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Moon,
  Sun,
  Mail,
  Phone,
  Building2,
  Lock,
  Eye,
  EyeOff,
  Save,
  Check,
  AlertTriangle,
  Smartphone,
  Key,
  Users,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
  ];

  const saveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="glass-card border-0 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id 
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30' 
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
                
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div>
                    <Button className="btn-primary mb-2">
                      Change Avatar
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl input-glass"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl input-glass"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 rounded-xl input-glass"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl input-glass"
                      defaultValue="Acme Inc."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">Bio</label>
                    <textarea 
                      className="w-full px-4 py-3 rounded-xl input-glass h-24 resize-none"
                      defaultValue="Voice AI enthusiast and tech entrepreneur."
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <h4 className="font-medium text-white mb-4">Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-white">Language</p>
                          <p className="text-sm text-muted-foreground">Select your preferred language</p>
                        </div>
                      </div>
                      <select className="px-4 py-2 rounded-xl input-glass">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
                        <div>
                          <p className="text-white">Dark Mode</p>
                          <p className="text-sm text-muted-foreground">Toggle dark/light theme</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-neon-purple' : 'bg-white/20'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${darkMode ? 'left-6' : 'left-0.5'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="btn-primary" onClick={saveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
                    { id: 'push', label: 'Push Notifications', desc: 'Receive push notifications', icon: Smartphone },
                    { id: 'sms', label: 'SMS Notifications', desc: 'Receive updates via SMS', icon: Phone },
                    { id: 'marketing', label: 'Marketing Emails', desc: 'Receive promotional content', icon: Mail },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl glass-panel">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-white">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${notifications[item.id as keyof typeof notifications] ? 'bg-neon-purple' : 'bg-white/20'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${notifications[item.id as keyof typeof notifications] ? 'left-6' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="btn-primary" onClick={saveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 rounded-xl input-glass pr-12"
                          placeholder="Enter current password"
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">New Password</label>
                      <input 
                        type="password"
                        className="w-full px-4 py-3 rounded-xl input-glass"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Confirm New Password</label>
                      <input 
                        type="password"
                        className="w-full px-4 py-3 rounded-xl input-glass"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button className="btn-primary" onClick={saveSettings}>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl glass-panel">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-white">2FA is enabled</p>
                        <p className="text-sm text-muted-foreground">Your account is protected with Google Authenticator</p>
                      </div>
                    </div>
                    <Button className="btn-glass text-red-400">
                      Disable
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-between p-4 rounded-xl glass-panel">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                        <Key className="w-5 h-5 text-neon-purple" />
                      </div>
                      <div>
                        <p className="text-white">Backup Codes</p>
                        <p className="text-sm text-muted-foreground">10 codes remaining</p>
                      </div>
                    </div>
                    <Button className="btn-glass">
                      View Codes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Current Plan</h3>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl glass-panel">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-bold text-white">Professional</h4>
                        <Badge className="badge-neon">Monthly</Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">$99/month • Renews on Jan 15, 2026</p>
                    </div>
                    <Button className="btn-primary">
                      Upgrade Plan
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 rounded-xl glass-panel text-center">
                      <p className="text-2xl font-bold text-white">10</p>
                      <p className="text-sm text-muted-foreground">AI Agents</p>
                    </div>
                    <div className="p-4 rounded-xl glass-panel text-center">
                      <p className="text-2xl font-bold text-white">10K</p>
                      <p className="text-sm text-muted-foreground">Minutes/Month</p>
                    </div>
                    <div className="p-4 rounded-xl glass-panel text-center">
                      <p className="text-2xl font-bold text-white">∞</p>
                      <p className="text-sm text-muted-foreground">Integrations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Payment Methods</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl glass-panel border-neon-purple/30">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="text-white">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/27</p>
                        </div>
                      </div>
                      <Badge className="badge-cyan">Default</Badge>
                    </div>
                    <Button className="w-full btn-glass">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Team Members</h3>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: 'John Doe', email: 'john@example.com', role: 'Owner', avatar: 'JD' },
                    { name: 'Sarah Smith', email: 'sarah@example.com', role: 'Admin', avatar: 'SS' },
                    { name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: 'MJ' },
                  ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-panel">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-white">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={member.role === 'Owner' ? 'badge-neon' : 'badge-cyan'}>
                          {member.role}
                        </Badge>
                        <Button className="btn-glass px-3">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { Plus } from 'lucide-react';
