import { useState } from 'react';
import { 
  TrendingUp, 
  Phone, 
  Bot,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Sparkles,
  Zap,
  MessageSquare,
  Headphones,
  Megaphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

// Mock Data
const callVolumeData = [
  { name: 'Mon', calls: 120, answered: 100, missed: 20 },
  { name: 'Tue', calls: 150, answered: 130, missed: 20 },
  { name: 'Wed', calls: 180, answered: 160, missed: 20 },
  { name: 'Thu', calls: 140, answered: 120, missed: 20 },
  { name: 'Fri', calls: 200, answered: 180, missed: 20 },
  { name: 'Sat', calls: 80, answered: 70, missed: 10 },
  { name: 'Sun', calls: 60, answered: 55, missed: 5 },
];

const aiPerformanceData = [
  { name: '00:00', accuracy: 92, sentiment: 85 },
  { name: '04:00', accuracy: 94, sentiment: 88 },
  { name: '08:00', accuracy: 96, sentiment: 90 },
  { name: '12:00', accuracy: 95, sentiment: 87 },
  { name: '16:00', accuracy: 97, sentiment: 92 },
  { name: '20:00', accuracy: 93, sentiment: 86 },
  { name: '23:59', accuracy: 91, sentiment: 84 },
];

const callDistributionData = [
  { name: 'Inbound', value: 450, color: '#8b5cf6' },
  { name: 'Outbound', value: 320, color: '#06b6d4' },
  { name: 'WhatsApp', value: 180, color: '#10b981' },
  { name: 'Missed', value: 50, color: '#ef4444' },
];

const recentCalls = [
  { id: 1, number: '+1 (555) 123-4567', type: 'inbound', duration: '2:34', status: 'completed', agent: 'Sales AI', time: '2 min ago' },
  { id: 2, number: '+1 (555) 987-6543', type: 'outbound', duration: '5:12', status: 'completed', agent: 'Support AI', time: '15 min ago' },
  { id: 3, number: '+1 (555) 456-7890', type: 'whatsapp', duration: '1:45', status: 'completed', agent: 'WhatsApp Bot', time: '32 min ago' },
  { id: 4, number: '+1 (555) 789-0123', type: 'inbound', duration: '0:00', status: 'missed', agent: '-', time: '1 hour ago' },
  { id: 5, number: '+1 (555) 321-6547', type: 'outbound', duration: '3:22', status: 'completed', agent: 'Sales AI', time: '2 hours ago' },
];

const statsCards = [
  {
    title: 'Total Calls',
    value: '1,234',
    change: '+12.5%',
    trend: 'up',
    icon: Phone,
    color: 'from-neon-purple to-neon-pink'
  },
  {
    title: 'Call Success Rate',
    value: '94.2%',
    change: '+3.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-neon-cyan to-blue-500'
  },
  {
    title: 'Avg Response Time',
    value: '2.4s',
    change: '-0.8s',
    trend: 'up',
    icon: Clock,
    color: 'from-green-500 to-emerald-400'
  },
  {
    title: 'Active Agents',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: Bot,
    color: 'from-orange-500 to-yellow-400'
  },
  {
    title: 'AI Accuracy',
    value: '96.8%',
    change: '+1.5%',
    trend: 'up',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-400'
  },
  {
    title: 'Total Balance',
    value: '$50.00',
    change: '-$12.50',
    trend: 'down',
    icon: DollarSign,
    color: 'from-indigo-500 to-purple-400'
  },
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here\'s what\'s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1 rounded-xl glass-card">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range 
                    ? 'bg-neon-purple text-white' 
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button className="btn-glass">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="btn-glass">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statsCards.map((stat, i) => (
          <Card key={i} className="glass-card border-0">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <Card className="glass-card border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg text-white">Call Volume Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">Daily breakdown of call activity</p>
            </div>
            <Badge className="badge-cyan">Live</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={callVolumeData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAnswered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="calls" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorCalls)" />
                <Area type="monotone" dataKey="answered" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAnswered)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Performance Chart */}
        <Card className="glass-card border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg text-white">AI Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Accuracy & sentiment analysis</p>
            </div>
            <Badge className="badge-neon">Real-time</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={aiPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} domain={[80, 100]} />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                <Line type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Call Distribution */}
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg text-white">Call Distribution</CardTitle>
            <p className="text-sm text-muted-foreground">By channel type</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RePieChart>
                <Pie
                  data={callDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {callDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {callDistributionData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card className="glass-card border-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg text-white">Recent Calls</CardTitle>
              <p className="text-sm text-muted-foreground">Latest call activity</p>
            </div>
            <Button className="btn-glass text-sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentCalls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-3 rounded-xl glass-panel">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      call.type === 'inbound' ? 'bg-neon-purple/20' :
                      call.type === 'outbound' ? 'bg-neon-cyan/20' :
                      call.type === 'whatsapp' ? 'bg-green-500/20' :
                      'bg-red-500/20'
                    }`}>
                      {call.type === 'inbound' && <Phone className="w-5 h-5 text-neon-purple" />}
                      {call.type === 'outbound' && <Headphones className="w-5 h-5 text-neon-cyan" />}
                      {call.type === 'whatsapp' && <MessageSquare className="w-5 h-5 text-green-500" />}
                    </div>
                    <div>
                      <p className="font-medium text-white">{call.number}</p>
                      <p className="text-xs text-muted-foreground">
                        {call.agent} • {call.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-white">{call.duration}</p>
                      <Badge className={`text-xs ${
                        call.status === 'completed' ? 'badge-cyan' :
                        call.status === 'missed' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        'badge-neon'
                      }`}>
                        {call.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { icon: Phone, label: 'New Call', color: 'from-neon-purple to-neon-pink' },
          { icon: Bot, label: 'Create Agent', color: 'from-neon-cyan to-blue-500' },
          { icon: Megaphone, label: 'New Campaign', color: 'from-green-500 to-emerald-400' },
          { icon: MessageSquare, label: 'WhatsApp', color: 'from-orange-500 to-yellow-400' },
        ].map((action, i) => (
          <button 
            key={i} 
            className="glass-card rounded-xl p-4 flex items-center gap-3 card-hover group"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-white">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
