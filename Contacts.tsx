import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Upload,
  Download,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Edit2,
  Trash2,
  Star,
  Building2,
  Tag,
  Import,
  ArrowRightLeft
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

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  favorite: boolean;
  lastContact: string;
  avatar?: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    tags: ['Lead', 'Hot'],
    favorite: true,
    lastContact: '2 hours ago'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.net',
    phone: '+1 (555) 987-6543',
    company: 'Digital Solutions',
    tags: ['Customer', 'VIP'],
    favorite: false,
    lastContact: '1 day ago'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'm.chen@startup.io',
    phone: '+1 (555) 456-7890',
    company: 'StartupXYZ',
    tags: ['Prospect'],
    favorite: false,
    lastContact: '3 days ago'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@enterprise.com',
    phone: '+1 (555) 789-0123',
    company: 'Enterprise Co',
    tags: ['Customer', 'Enterprise'],
    favorite: true,
    lastContact: '1 week ago'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'd.wilson@smallbiz.com',
    phone: '+1 (555) 321-6547',
    company: 'SmallBiz Ltd',
    tags: ['Lead'],
    favorite: false,
    lastContact: '2 weeks ago'
  },
];

const availableTags = ['Lead', 'Customer', 'VIP', 'Hot', 'Cold', 'Enterprise', 'Prospect'];

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => contact.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleFavorite = (id: string) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, favorite: !c.favorite } : c
    ));
  };

  const deleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
      toast.success('Contact deleted');
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Contact Management</h1>
          <p className="text-muted-foreground">Manage and organize your contacts</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
            <DialogTrigger asChild>
              <Button className="btn-glass">
                <Import className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-white/10">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">Import Contacts</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-white mb-2">Drop your CSV file here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  <Button className="btn-primary">
                    Choose File
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 btn-glass">
                    <Building2 className="w-4 h-4 mr-2" />
                    From CRM
                  </Button>
                  <Button className="flex-1 btn-glass">
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Transfer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-panel border-white/10 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">Add New Contact</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl input-glass" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl input-glass" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl input-glass" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl input-glass" placeholder="Company Name" />
                </div>
                <Button 
                  className="w-full btn-primary"
                  onClick={() => {
                    toast.success('Contact added successfully');
                    setShowAddDialog(false);
                  }}
                >
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Contacts', value: contacts.length, icon: Users },
          { label: 'Favorites', value: contacts.filter(c => c.favorite).length, icon: Star },
          { label: 'Leads', value: contacts.filter(c => c.tags.includes('Lead')).length, icon: Tag },
          { label: 'Customers', value: contacts.filter(c => c.tags.includes('Customer')).length, icon: Building2 },
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
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-3 rounded-xl input-glass"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-neon-purple text-white'
                  : 'glass-card text-muted-foreground hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      <Card className="glass-card border-0 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/5">
                <tr className="text-left">
                  <th className="p-4 text-sm font-medium text-muted-foreground">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                  </th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Contact</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Company</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Tags</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Last Contact</th>
                  <th className="p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white font-semibold">
                          {contact.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-white">{contact.name}</p>
                          <button 
                            onClick={() => toggleFavorite(contact.id)}
                            className="text-xs text-muted-foreground hover:text-yellow-400 transition-colors"
                          >
                            {contact.favorite ? <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> : 'Add to favorites'}
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-white">{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{contact.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-white">{contact.company}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1 flex-wrap">
                        {contact.tags.map((tag, i) => (
                          <Badge key={i} className="badge-neon text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{contact.lastContact}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button className="btn-glass px-2 py-1">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button className="btn-glass px-2 py-1">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="btn-glass px-2 py-1">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-panel border-white/10">
                            <DropdownMenuItem>
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteContact(contact.id)} className="text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </p>
        <div className="flex gap-2">
          <Button className="btn-glass">Previous</Button>
          <Button className="btn-primary">1</Button>
          <Button className="btn-glass">2</Button>
          <Button className="btn-glass">3</Button>
          <Button className="btn-glass">Next</Button>
        </div>
      </div>
    </div>
  );
}
