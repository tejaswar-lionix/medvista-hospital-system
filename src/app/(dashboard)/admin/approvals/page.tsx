'use client';

import { useState } from 'react';
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
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Bell,
  Users,
  Stethoscope,
  Building2
} from 'lucide-react';

interface ApprovalRequest {
  id: string;
  type: 'insurance-preauth' | 'referral' | 'surgery' | 'medication' | 'procedure';
  title: string;
  description: string;
  requesterName: string;
  requesterRole: string;
  patientName: string;
  patientId: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'denied' | 'in-review';
  submittedDate: string;
  dueDate: string;
  assignedTo: string;
  notes: string;
  documents: string[];
}

const mockApprovalRequests: ApprovalRequest[] = [
  {
    id: 'APR001',
    type: 'insurance-preauth',
    title: 'Cardiac Surgery Pre-Authorization',
    description: 'Pre-authorization request for cardiac bypass surgery for patient John Smith. Patient has been diagnosed with severe coronary artery disease and requires immediate surgical intervention.',
    requesterName: 'Dr. Sarah Williams',
    requesterRole: 'Cardiologist',
    patientName: 'John Smith',
    patientId: 'PAT001',
    department: 'Cardiology',
    priority: 'urgent',
    status: 'pending',
    submittedDate: '2024-01-20',
    dueDate: '2024-01-25',
    assignedTo: 'Insurance Team',
    notes: 'Patient condition is critical. Surgery recommended within 48 hours.',
    documents: ['Medical Records', 'ECG Report', 'Blood Test Results', 'Surgery Plan']
  },
  {
    id: 'APR002',
    type: 'referral',
    title: 'Specialist Referral - Neurology',
    description: 'Referral request for patient Maria Garcia to see neurologist for persistent headaches and neurological symptoms.',
    requesterName: 'Dr. Michael Chen',
    requesterRole: 'General Practitioner',
    patientName: 'Maria Garcia',
    patientId: 'PAT002',
    department: 'Neurology',
    priority: 'medium',
    status: 'in-review',
    submittedDate: '2024-01-18',
    dueDate: '2024-01-28',
    assignedTo: 'Dr. Emily Rodriguez',
    notes: 'Patient has been experiencing chronic headaches for 3 months. MRI recommended.',
    documents: ['Patient History', 'Previous Treatment Records']
  },
  {
    id: 'APR003',
    type: 'surgery',
    title: 'Orthopedic Surgery Approval',
    description: 'Approval request for knee replacement surgery for patient Robert Wilson. Patient has severe arthritis affecting mobility.',
    requesterName: 'Dr. James Johnson',
    requesterRole: 'Orthopedic Surgeon',
    patientName: 'Robert Wilson',
    patientId: 'PAT003',
    department: 'Orthopedics',
    priority: 'high',
    status: 'pending',
    submittedDate: '2024-01-22',
    dueDate: '2024-01-30',
    assignedTo: 'Surgery Committee',
    notes: 'Patient has failed conservative treatment options. Surgery is the next step.',
    documents: ['X-Ray Reports', 'Physical Therapy Records', 'Surgery Proposal']
  },
  {
    id: 'APR004',
    type: 'medication',
    title: 'Specialty Medication Approval',
    description: 'Request for approval of specialty medication for patient Jennifer Lee. Standard medications have not been effective.',
    requesterName: 'Dr. Lisa Park',
    requesterRole: 'Oncologist',
    patientName: 'Jennifer Lee',
    patientId: 'PAT004',
    department: 'Oncology',
    priority: 'high',
    status: 'pending',
    submittedDate: '2024-01-19',
    dueDate: '2024-01-26',
    assignedTo: 'Pharmacy Committee',
    notes: 'Patient requires targeted therapy. Standard chemotherapy protocols have failed.',
    documents: ['Treatment History', 'Lab Results', 'Insurance Coverage Check']
  },
  {
    id: 'APR005',
    type: 'procedure',
    title: 'Advanced Imaging Procedure',
    description: 'Request for CT scan with contrast for patient Michael Brown to diagnose suspected pulmonary embolism.',
    requesterName: 'Dr. David Kim',
    requesterRole: 'Emergency Physician',
    patientName: 'Michael Brown',
    patientId: 'PAT005',
    department: 'Emergency',
    priority: 'urgent',
    status: 'approved',
    submittedDate: '2024-01-21',
    dueDate: '2024-01-22',
    assignedTo: 'Radiology Department',
    notes: 'Emergency case. Patient presents with chest pain and shortness of breath.',
    documents: ['Emergency Assessment', 'Vital Signs', 'Initial X-Ray']
  },
  {
    id: 'APR006',
    type: 'insurance-preauth',
    title: 'Rehabilitation Services Pre-Authorization',
    description: 'Pre-authorization for physical rehabilitation services for patient David Thompson following hip surgery.',
    requesterName: 'Dr. Amanda Foster',
    requesterRole: 'Physical Medicine Specialist',
    patientName: 'David Thompson',
    patientId: 'PAT006',
    department: 'Rehabilitation',
    priority: 'medium',
    status: 'in-review',
    submittedDate: '2024-01-17',
    dueDate: '2024-01-27',
    assignedTo: 'Insurance Team',
    notes: 'Patient requires 6 weeks of intensive physical therapy post-surgery.',
    documents: ['Surgery Report', 'Rehabilitation Plan', 'Insurance Policy']
  }
];

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockApprovalRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [actionNotes, setActionNotes] = useState('');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'denied': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'in-review': { color: 'bg-blue-100 text-blue-800', icon: Eye }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
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

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      'insurance-preauth': { label: 'Insurance Pre-Auth', color: 'bg-purple-100 text-purple-800' },
      'referral': { label: 'Referral', color: 'bg-blue-100 text-blue-800' },
      'surgery': { label: 'Surgery', color: 'bg-red-100 text-red-800' },
      'medication': { label: 'Medication', color: 'bg-green-100 text-green-800' },
      'procedure': { label: 'Procedure', color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.procedure;
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' as const } : req
    ));
    setIsDetailOpen(false);
    setActionNotes('');
  };

  const handleDeny = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'denied' as const } : req
    ));
    setIsDetailOpen(false);
    setActionNotes('');
  };

  const getStatistics = () => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const denied = requests.filter(r => r.status === 'denied').length;
    const inReview = requests.filter(r => r.status === 'in-review').length;
    const urgent = requests.filter(r => r.priority === 'urgent').length;
    
    return { total, pending, approved, denied, inReview, urgent };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Approval Workflows</h1>
          <p className="text-muted-foreground">Manage and process approval requests across departments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications ({stats.urgent})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inReview}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('all')}
        >
          All ({stats.total})
        </Button>
        <Button
          variant={statusFilter === 'pending' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('pending')}
        >
          Pending ({stats.pending})
        </Button>
        <Button
          variant={statusFilter === 'in-review' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('in-review')}
        >
          In Review ({stats.inReview})
        </Button>
        <Button
          variant={statusFilter === 'approved' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('approved')}
        >
          Approved ({stats.approved})
        </Button>
        <Button
          variant={statusFilter === 'denied' ? 'default' : 'outline'}
          onClick={() => setStatusFilter('denied')}
        >
          Denied ({stats.denied})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Approval Requests</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="insurance-preauth">Insurance Pre-Auth</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.title}</p>
                      <p className="text-sm text-muted-foreground">{request.id}</p>
                      <p className="text-sm text-muted-foreground">By: {request.requesterName}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(request.type)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.patientName}</p>
                      <p className="text-sm text-muted-foreground">{request.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {request.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeny(request.id)}
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
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRequest?.title}
              {selectedRequest && getStatusBadge(selectedRequest.status)}
            </DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Request ID</p>
                  <p className="font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{getTypeBadge(selectedRequest.type)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium">{selectedRequest.patientName} ({selectedRequest.patientId})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{selectedRequest.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Requester</p>
                  <p className="font-medium">{selectedRequest.requesterName} - {selectedRequest.requesterRole}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{selectedRequest.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted Date</p>
                  <p className="font-medium">{selectedRequest.submittedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{selectedRequest.dueDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedRequest.description}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Notes</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedRequest.notes}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Attached Documents</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.documents.map((doc, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                      <FileText className="h-3 w-3 mr-1" />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Action Notes</p>
                <Textarea
                  placeholder="Add notes for this action..."
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button 
                      variant="destructive"
                      onClick={() => handleDeny(selectedRequest.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Deny Request
                    </Button>
                    <Button 
                      onClick={() => handleApprove(selectedRequest.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Request
                    </Button>
                  </>
                )}
                {selectedRequest.status === 'in-review' && (
                  <Button onClick={() => handleApprove(selectedRequest.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Review
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}