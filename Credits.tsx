import { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  History, 
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Check,
  Shield,
  Zap,
  Sparkles,
  Gift,
  ArrowRight,
  Star,
  Building2,
  Globe,
  Smartphone
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

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'credit', amount: 100, description: 'Credit Purchase', timestamp: '2 hours ago', status: 'completed' },
  { id: '2', type: 'debit', amount: 12.50, description: 'Call Charges', timestamp: 'Yesterday', status: 'completed' },
  { id: '3', type: 'debit', amount: 5.25, description: 'WhatsApp Messages', timestamp: '2 days ago', status: 'completed' },
  { id: '4', type: 'credit', amount: 50, description: 'Credit Purchase', timestamp: '1 week ago', status: 'completed' },
  { id: '5', type: 'debit', amount: 8.75, description: 'AI Agent Usage', timestamp: '1 week ago', status: 'completed' },
];

const pricingPlans = [
  {
    credits: 50,
    price: 50,
    bonus: 0,
    popular: false
  },
  {
    credits: 100,
    price: 95,
    bonus: 5,
    popular: true
  },
  {
    credits: 250,
    price: 225,
    bonus: 25,
    popular: false
  },
  {
    credits: 500,
    price: 425,
    bonus: 75,
    popular: false
  },
  {
    credits: 1000,
    price: 800,
    bonus: 200,
    popular: false
  },
  {
    credits: 5000,
    price: 3750,
    bonus: 1250,
    popular: false
  },
];

const paymentMethods = [
  { name: 'Stripe', icon: 'S', color: 'from-purple-500 to-blue-500' },
  { name: 'PayPal', icon: 'P', color: 'from-blue-500 to-cyan-500' },
  { name: 'Wise', icon: 'W', color: 'from-green-500 to-emerald-500' },
  { name: 'Payoneer', icon: 'Pn', color: 'from-red-500 to-pink-500' },
  { name: 'JazzCash', icon: 'J', color: 'from-orange-500 to-yellow-500' },
  { name: 'EasyPaisa', icon: 'E', color: 'from-green-600 to-green-400' },
  { name: 'UPI', icon: 'U', color: 'from-blue-600 to-blue-400' },
  { name: 'Bank Transfer', icon: 'B', color: 'from-gray-500 to-gray-400' },
];

export default function Credits() {
  const [balance] = useState(50.00);
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[1]);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const totalUsed = mockTransactions
    .filter(t => t.type === 'debit')
    .reduce((acc, t) => acc + t.amount, 0);

  const handlePurchase = (method: string) => {
    toast.success(`Processing payment via ${method}...`);
    setTimeout(() => {
      toast.success(`Successfully purchased $${selectedPlan.credits} credits!`);
      setShowPaymentDialog(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Credits & Billing</h1>
          <p className="text-muted-foreground">Manage your credits and payment methods</p>
        </div>
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Credits
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Purchase Credits</DialogTitle>
            </DialogHeader>
            
            {/* Selected Plan Summary */}
            <div className="mt-4 p-4 rounded-xl glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Package</p>
                  <p className="text-2xl font-bold text-white">${selectedPlan.credits} Credits</p>
                  {selectedPlan.bonus > 0 && (
                    <Badge className="badge-cyan mt-1">+${selectedPlan.bonus} Bonus</Badge>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Price</p>
                  <p className="text-3xl font-bold text-gradient">${selectedPlan.price}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white mb-3">Select Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.name}
                    onClick={() => handlePurchase(method.name)}
                    className="p-4 rounded-xl glass-card card-hover text-center"
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                      <span className="text-white font-bold">{method.icon}</span>
                    </div>
                    <p className="text-sm text-white">{method.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card border-0 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Credits</p>
                <p className="text-5xl font-bold text-gradient">${balance.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="badge-cyan">
                    <Zap className="w-3 h-3 mr-1" />
                    Auto-recharge enabled
                  </Badge>
                </div>
              </div>
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center neon-glow">
                <Wallet className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
              <div>
                <p className="text-sm text-muted-foreground">Minutes Used</p>
                <p className="text-xl font-bold text-white">1,234</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-xl font-bold text-white">3</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Est. Days Left</p>
                <p className="text-xl font-bold text-white">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Usage This Month</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Voice Calls</span>
                  <span className="text-white">$8.50</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-neon-purple to-neon-pink" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">WhatsApp</span>
                  <span className="text-white">$3.25</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[25%] rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">AI Agents</span>
                  <span className="text-white">$5.75</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-neon-cyan to-blue-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Plans */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Purchase Credits</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {pricingPlans.map((plan, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedPlan(plan);
                setShowPaymentDialog(true);
              }}
              className={`p-4 rounded-xl glass-card card-hover text-left relative ${
                plan.popular ? 'border-neon-purple/50 neon-glow' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="badge-neon absolute -top-2 left-1/2 -translate-x-1/2">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              <p className="text-2xl font-bold text-white">${plan.credits}</p>
              <p className="text-sm text-muted-foreground">Credits</p>
              {plan.bonus > 0 && (
                <Badge className="badge-cyan mt-2">+${plan.bonus} Bonus</Badge>
              )}
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-lg font-semibold text-gradient">${plan.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Supported Payment Methods</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.name} className="text-center">
                <div className={`w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                  <span className="text-white font-bold">{method.icon}</span>
                </div>
                <p className="text-sm text-muted-foreground">{method.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Transaction History</h3>
            <Button className="btn-glass">
              <History className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl glass-panel">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === 'credit' ? 'text-green-400' : 'text-white'}`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <Badge className={transaction.status === 'completed' ? 'badge-cyan' : 'bg-yellow-500/20 text-yellow-400'}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
