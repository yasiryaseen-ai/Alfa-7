import { useState, useEffect } from 'react';
import { 
  Phone, 
  Bot, 
  Zap, 
  Shield, 
  Globe, 
  CreditCard,
  MessageSquare,
  BarChart3,
  ChevronRight,
  Star,
  Check,
  Play,
  Sparkles,
  Headphones,
  Workflow,
  Lock,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const features = [
  {
    icon: Bot,
    title: 'AI Voice Agents',
    description: 'Create intelligent voice agents that handle calls 24/7 with human-like conversations.',
    color: 'from-neon-purple to-neon-pink'
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integration',
    description: 'Connect with customers on their favorite messaging platform seamlessly.',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: Phone,
    title: 'Multi-Platform Dialer',
    description: 'Make calls through Twilio, Telnyx, and custom telephony providers.',
    color: 'from-neon-cyan to-blue-500'
  },
  {
    icon: Workflow,
    title: 'Automation Hub',
    description: 'Connect with Zapier, N8N, Make.com and 5000+ apps for powerful workflows.',
    color: 'from-orange-500 to-yellow-400'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights into call performance, sentiment analysis, and conversion rates.',
    color: 'from-pink-500 to-rose-400'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'End-to-end encryption, GDPR compliance, and SOC 2 certified infrastructure.',
    color: 'from-indigo-500 to-purple-400'
  }
];

const integrations = [
  { name: 'Zapier', category: 'Automation' },
  { name: 'N8N', category: 'Workflow' },
  { name: 'Make.com', category: 'Integration' },
  { name: 'Twilio', category: 'Telephony' },
  { name: 'Telnyx', category: 'Telephony' },
  { name: 'WhatsApp', category: 'Messaging' },
  { name: 'Slack', category: 'Communication' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'PayPal', category: 'Payments' },
  { name: 'Wise', category: 'Payments' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO at TechFlow',
    content: 'VoiceAI Pro transformed our customer support. We handle 10x more calls with the same team size.',
    rating: 5
  },
  {
    name: 'Michael Roberts',
    role: 'Head of Sales at DataCorp',
    content: 'The AI agents are incredibly realistic. Our customers can\'t tell they\'re talking to AI!',
    rating: 5
  },
  {
    name: 'Emily Watson',
    role: 'Operations Manager at CloudScale',
    content: 'Best investment we made this year. ROI was visible within the first month.',
    rating: 5
  }
];

const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    description: 'Perfect for small teams getting started',
    features: [
      '2 AI Voice Agents',
      '1,000 minutes/month',
      'WhatsApp Integration',
      'Basic Analytics',
      'Email Support',
      'Zapier Integration'
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    price: 99,
    description: 'For growing businesses with advanced needs',
    features: [
      '10 AI Voice Agents',
      '10,000 minutes/month',
      'WhatsApp Business API',
      'Advanced Analytics',
      'Priority Support',
      'All Integrations',
      'Custom Workflows',
      'API Access'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom requirements',
    features: [
      'Unlimited AI Agents',
      'Unlimited Minutes',
      'Dedicated Infrastructure',
      'Custom AI Training',
      '24/7 Phone Support',
      'SLA Guarantee',
      'On-premise Option',
      'Dedicated Account Manager'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen gradient-mesh">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel border-b border-white/5' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center neon-glow">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">VoiceAI Pro</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</a>
              <a href="#integrations" className="text-sm text-muted-foreground hover:text-white transition-colors">Integrations</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-white transition-colors">Testimonials</a>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="hidden md:flex text-sm"
                onClick={onSignIn}
              >
                Sign In
              </Button>
              <Button 
                className="btn-primary text-sm"
                onClick={onSignUp}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="badge-neon mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              Now with WhatsApp Integration
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of{' '}
              <span className="text-gradient">Voice Communication</span>
              {' '}is Here
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Build AI-powered voice agents, manage multi-platform calls, and automate workflows 
              with the most advanced calling platform in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="btn-primary text-lg px-8"
                onClick={onSignUp}
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-glass text-lg px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10M+', label: 'Calls Handled' },
                { value: '99.9%', label: 'Uptime' },
                { value: '5000+', label: 'Integrations' },
                { value: '4.9/5', label: 'User Rating' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="badge-cyan mb-4">Features</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to{' '}
              <span className="text-gradient">Scale Your Calls</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI voice agents to multi-platform integrations, we provide all the tools 
              you need to revolutionize your communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="glass-card rounded-2xl p-6 card-hover group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="badge-neon mb-4">Integrations</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Connect with{' '}
                <span className="text-gradient">5000+ Apps</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Seamlessly integrate with your favorite tools. From CRMs to payment processors, 
                we\'ve got you covered.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: 'Zapier', desc: '5000+ apps' },
                  { icon: Code, label: 'N8N', desc: 'Workflow automation' },
                  { icon: Sparkles, label: 'Make.com', desc: 'Visual workflows' },
                  { icon: Globe, label: 'Webhooks', desc: 'Custom endpoints' },
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-neon-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {integrations.map((integration, i) => (
                <div 
                  key={i} 
                  className="glass-card rounded-xl p-4 text-center card-hover"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{integration.name[0]}</span>
                  </div>
                  <p className="font-medium text-white text-sm">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">{integration.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="text-center mb-12">
              <Badge className="badge-cyan mb-4">Global Payments</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Accept Payments from{' '}
                <span className="text-gradient">Anywhere</span>
              </h2>
              <p className="text-muted-foreground">
                Support for all major payment methods worldwide
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {['Stripe', 'PayPal', 'Wise', 'Payoneer', 'JazzCash', 'EasyPaisa', 'UPI', 'Bank Transfer'].map((method, i) => (
                <div key={i} className="glass-panel rounded-xl p-4 text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-neon-cyan" />
                  <p className="text-xs text-white">{method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="badge-neon mb-4">Testimonials</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by{' '}
              <span className="text-gradient">Thousands</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="badge-cyan mb-4">Pricing</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Simple,{' '}
              <span className="text-gradient">Transparent</span>{' '}
              Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you\'re ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`glass-card rounded-2xl p-8 ${plan.popular ? 'border-neon-purple/50 neon-glow' : ''}`}
              >
                {plan.popular && (
                  <Badge className="badge-neon mb-4">Most Popular</Badge>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-neon-cyan" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'btn-primary' : 'btn-glass'}`}
                  onClick={onSignUp}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20" />
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Calls?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of businesses using VoiceAI Pro to revolutionize their communication.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="btn-primary text-lg px-8"
                  onClick={onSignUp}
                >
                  Start Free Trial
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="btn-glass text-lg px-8"
                  onClick={onSignIn}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">VoiceAI Pro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The future of voice communication. AI-powered calling for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 VoiceAI Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Import for Code icon
import { Code } from 'lucide-react';
