'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface InsuranceProvider {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  networkStatus: 'in-network' | 'out-of-network';
  activePolicies: number;
  totalClaims: number;
  approvalRate: number;
  averageProcessingDays: number;
  status: 'active' | 'inactive' | 'pending';
}

interface InsuranceClaim {
  id: string;
  patientName: string;
  patientId: string;
  provider: string;
  claimAmount: number;
  approvedAmount: number;
  submissionDate: string;
  status: 'pending' | 'approved' | 'denied' | 'processing' | 'appealed';
  type: 'medical' | 'surgical' | 'pharmacy' | 'diagnostic';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  notes: string;
}

interface ReimbursementRecord {
  id: string;
  claimId: string;
  patientName: string;
  provider: string;
  amount: number;
  reimbursementDate: string;
  status: 'pending' | 'processed' | 'paid' | 'failed';
  paymentMethod: string;
  referenceNumber: string;
  processingTime: number;
}

const mockProviders: InsuranceProvider[] = [
  {
    id: 'INS001',
    name: 'HealthFirst Insurance',
    contactPerson: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@healthfirst.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare Blvd, Medical City, MC 12345',
    networkStatus: 'in-network',
    activePolicies: 1250,
    totalClaims: 3420,
    approvalRate: 92.5,
    averageProcessingDays: 5,
    status: 'active'
  },
  {
    id: 'INS002',
    name: 'MediCare Plus',
    contactPerson: 'Michael Chen',
    email: 'michael.chen@medicareplus.com',
    phone: '+1 (555) 234-5678',
    address: '456 Medical Center Dr, Health Town, HT 67890',
    networkStatus: 'in-network',
    activePolicies: 980,
    totalClaims: 2890,
    approvalRate: 88.3,
    averageProcessingDays: 7,
    status: 'active'
  },
  {
    id: 'INS003',
    name: 'Universal Health Coverage',
    contactPerson: 'Emily Rodriguez',
    email: 'emily.rodriguez@uhc.com',
    phone: '+1 (555) 345-6789',
    address: '789 Wellness Way, Care City, CC 11223',
    networkStatus: 'out-of-network',
    activePolicies: 650,
    totalClaims: 1870,
    approvalRate: 78.9,
    averageProcessingDays: 10,
    status: 'active'
  },
  {
    id: 'INS004',
    name: 'Premium Health Shield',
    contactPerson: 'David Kim',
    email: 'david.kim@premiumhealth.com',
    phone: '+1 (555) 456-7890',
    address: '321 Premium Plaza, Elite District, ED 44556',
    networkStatus: 'in-network',
    activePolicies: 420,
    totalClaims: 1230,
    approvalRate: 95.2,
    averageProcessingDays: 3,
    status: 'active'
  },
  {
    id: 'INS005',
    name: 'Basic Care Insurance',
    contactPerson: 'Lisa Thompson',
    email: 'lisa.thompson@basiccare.com',
    phone: '+1 (555) 567-8901',
    address: '654 Basic Street, Simple Town, ST 77889',
    networkStatus: 'out-of-network',
    activePolicies: 320,
    totalClaims: 890,
    approvalRate: 72.1,
    averageProcessingDays: 12,
    status: 'pending'
  }
];

const mockClaims: InsuranceClaim[] = [
  {
    id: 'CLM001',
    patientName: 'John Smith',
    patientId: 'PAT001',
    provider: 'HealthFirst Insurance',
    claimAmount: 15000,
    approvedAmount: 13500,
    submissionDate: '2024-01-15',
    status: 'approved',
    type: 'surgical',
    priority: 'high',
    assignedTo: 'Dr. Williams',
    notes: 'Cardiac surgery approved with standard coverage'
  },
  {
    id: 'CLM002',
    patientName: 'Maria Garcia',
    patientId: 'PAT002',
    provider: 'MediCare Plus',
    claimAmount: 8500,
    approvedAmount: 0,
    submissionDate: '2024-01-18',
    status: 'processing',
    type: 'medical',
    priority: 'medium',
    assignedTo: 'Nurse Johnson',
    notes: 'Pending additional documentation from specialist'
  },
  {
    id: 'CLM003',
    patientName: 'Robert Wilson',
    patientId: 'PAT003',
    provider: 'Universal Health Coverage',
    claimAmount: 3200,
    approvedAmount: 2880,
    submissionDate: '2024-01-20',
    status: 'pending',
    type: 'pharmacy',
    priority: 'low',
    assignedTo: 'Pharmacy Team',
    notes: 'Prescription medications for chronic condition'
  },
  {
    id: 'CLM004',
    patientName: 'Jennifer Lee',
    patientId: 'PAT004',
    provider: 'Premium Health Shield',
    claimAmount: 22000,
    approvedAmount: 19800,
    submissionDate: '2024-01-22',
    status: 'approved',
    type: 'surgical',
    priority: 'urgent',
    assignedTo: 'Dr. Patel',
    notes: 'Emergency appendectomy approved'
  },
  {
    id: 'CLM005',
    patientName: 'Michael Brown',
    patientId: 'PAT005',
    provider: 'Basic Care Insurance',
    claimAmount: 5600,
    approvedAmount: 0,
    submissionDate: '2024-01-25',
    status: 'denied',
    type: 'diagnostic',
    priority: 'medium',
    assignedTo: 'Admin Team',
    notes: 'Insufficient documentation provided'
  }
];

const mockReimbursements: ReimbursementRecord[] = [
  {
    id: 'REM001',
    claimId: 'CLM001',
    patientName: 'John Smith',
    provider: 'HealthFirst Insurance',
    amount: 13500,
    reimbursementDate: '2024-01-25',
    status: 'paid',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'REF20240125001',
    processingTime: 10
  },
  {
    id: 'REM002',
    claimId: 'CLM004',
    patientName: 'Jennifer Lee',
    provider: 'Premium Health Shield',
    amount: 19800,
    reimbursementDate: '2024-01-28',
    status: 'processed',
    paymentMethod: 'Check',
    referenceNumber: 'REF20240128001',
    processingTime: 6
  },
  {
    id: 'REM003',
    claimId: 'CLM003',
    patientName: 'Robert Wilson',
    provider: 'Universal Health Coverage',
    amount: 2880,
    reimbursementDate: '2024-01-30',
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'REF20240130001',
    processingTime: 10
  }
];

export default function InsuranceManagementPage() {
  const [providers, setProviders] = useState<InsuranceProvider[]>(mockProviders);
  const [claims, setClaims] = useState<InsuranceClaim[]>(mockClaims);
  const [reimbursements, setReimbursements] = useState<ReimbursementRecord[]>(mockReimbursements);
  const [activeTab, setActiveTab] = useState<'providers' | 'claims' | 'reimbursements'>('providers');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [isAddClaimOpen, setIsAddClaimOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);
  const [isClaimDetailOpen, setIsClaimDetailOpen] = useState(false);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || provider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredReimbursements = reimbursements.filter(reimb => {
    const matchesSearch = reimb.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reimb.claimId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reimb.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'inactive': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'denied': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'processing': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'paid': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'failed': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'processed': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'in-network': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'out-of-network': { color: 'bg-orange-100 text-orange-800', icon: AlertCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={priorityConfig[priority as keyof typeof priorityConfig]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const handleApproveClaim = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'approved' as const } : claim
    ));
    setIsClaimDetailOpen(false);
  };

  const handleDenyClaim = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'denied' as const } : claim
    ));
    setIsClaimDetailOpen(false);
  };

  const getStatistics = () => {
    const totalClaims = claims.length;
    const approvedClaims = claims.filter(c => c.status === 'approved').length;
    const pendingClaims = claims.filter(c => c.status === 'pending' || c.status === 'processing').length;
    const totalClaimAmount = claims.reduce((sum, claim) => sum + claim.claimAmount, 0);
    const totalApprovedAmount = claims.reduce((sum, claim) => sum + claim.approvedAmount, 0);
    const approvalRate = totalClaims > 0 ? (approvedClaims / totalClaims * 100).toFixed(1) : 0;
    
    return {
      totalClaims,
      approvedClaims,
      pendingClaims,
      totalClaimAmount,
      totalApprovedAmount,
      approvalRate
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Insurance Management</h1>
          <p className="text-muted-foreground">Manage insurance providers, claims, and reimbursements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          {activeTab === 'providers' && (
            <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Provider
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Insurance Provider</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Provider Name</label>
                    <Input placeholder="Enter provider name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <Input placeholder="Enter contact person" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="Enter phone number" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Textarea placeholder="Enter full address" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Network Status</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select network status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-network">In-Network</SelectItem>
                        <SelectItem value="out-of-network">Out-of-Network</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddProviderOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsAddProviderOpen(false)}>Save Provider</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {activeTab === 'claims' && (
            <Dialog open={isAddClaimOpen} onOpenChange={setIsAddClaimOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Claim
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Submit New Insurance Claim</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient Name</label>
                    <Input placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient ID</label>
                    <Input placeholder="Enter patient ID" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Insurance Provider</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map(provider => (
                          <SelectItem key={provider.id} value={provider.name}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Claim Amount</label>
                    <Input type="number" placeholder="Enter claim amount" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Claim Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select claim type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="surgical">Surgical</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="diagnostic">Diagnostic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea placeholder="Enter claim notes and details" />
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddClaimOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsAddClaimOpen(false)}>Submit Claim</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold">{stats.totalClaims}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Claims</p>
                <p className="text-2xl font-bold text-green-600">{stats.approvedClaims}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Claims</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingClaims}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold text-blue-600">{stats.approvalRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Claim Amount</p>
                <p className="text-2xl font-bold">${stats.totalClaimAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Approved Amount</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalApprovedAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeTab === 'providers' ? 'default' : 'outline'}
          onClick={() => setActiveTab('providers')}
        >
          Providers ({providers.length})
        </Button>
        <Button
          variant={activeTab === 'claims' ? 'default' : 'outline'}
          onClick={() => setActiveTab('claims')}
        >
          Claims ({claims.length})
        </Button>
        <Button
          variant={activeTab === 'reimbursements' ? 'default' : 'outline'}
          onClick={() => setActiveTab('reimbursements')}
        >
          Reimbursements ({reimbursements.length})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {activeTab === 'providers' && 'Insurance Providers'}
              {activeTab === 'claims' && 'Insurance Claims'}
              {activeTab === 'reimbursements' && 'Reimbursement Tracking'}
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {activeTab === 'providers' && (
                    <>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </>
                  )}
                  {activeTab === 'claims' && (
                    <>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="denied">Denied</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </>
                  )}
                  {activeTab === 'reimbursements' && (
                    <>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processed">Processed</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'providers' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Policies</TableHead>
                  <TableHead>Approval Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-muted-foreground">{provider.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{provider.contactPerson}</p>
                        <p className="text-sm text-muted-foreground">{provider.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(provider.networkStatus)}</TableCell>
                    <TableCell>{provider.activePolicies.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${provider.approvalRate}%` }}
                          />
                        </div>
                        <span className="text-sm">{provider.approvalRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(provider.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'claims' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{claim.patientName}</p>
                        <p className="text-sm text-muted-foreground">{claim.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{claim.provider}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">${claim.claimAmount.toLocaleString()}</p>
                        {claim.approvedAmount > 0 && (
                          <p className="text-sm text-green-600">
                            Approved: ${claim.approvedAmount.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{claim.type}</Badge>
                    </TableCell>
                    <TableCell>{getPriorityBadge(claim.priority)}</TableCell>
                    <TableCell>{getStatusBadge(claim.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedClaim(claim);
                            setIsClaimDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {claim.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleApproveClaim(claim.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDenyClaim(claim.id)}
                            >
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'reimbursements' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reimbursement ID</TableHead>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReimbursements.map((reimbursement) => (
                  <TableRow key={reimbursement.id}>
                    <TableCell className="font-medium">{reimbursement.id}</TableCell>
                    <TableCell>{reimbursement.claimId}</TableCell>
                    <TableCell>{reimbursement.patientName}</TableCell>
                    <TableCell className="font-medium">${reimbursement.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {reimbursement.reimbursementDate}
                      </div>
                    </TableCell>
                    <TableCell>{reimbursement.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(reimbursement.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isClaimDetailOpen} onOpenChange={setIsClaimDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Claim Details - {selectedClaim?.id}</DialogTitle>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-medium">{selectedClaim.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient ID</p>
                  <p className="font-medium">{selectedClaim.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Insurance Provider</p>
                  <p className="font-medium">{selectedClaim.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Claim Amount</p>
                  <p className="font-medium">${selectedClaim.claimAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submission Date</p>
                  <p className="font-medium">{selectedClaim.submissionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{selectedClaim.assignedTo}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium">{selectedClaim.notes}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsClaimDetailOpen(false)}>Close</Button>
                {selectedClaim.status === 'pending' && (
                  <>
                    <Button 
                      variant="destructive"
                      onClick={() => handleDenyClaim(selectedClaim.id)}
                    >
                      Deny Claim
                    </Button>
                    <Button 
                      onClick={() => handleApproveClaim(selectedClaim.id)}
                    >
                      Approve Claim
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}