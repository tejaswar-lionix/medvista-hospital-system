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
  Upload, 
  Download, 
  Search, 
  Filter,
  Shield,
  BookOpen,
  Users,
  Calendar,
  Eye,
  Edit,
  Plus,
  ClipboardCheck,
  GraduationCap,
  FileWarning,
  TrendingUp
} from 'lucide-react';

interface ComplianceChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'in-progress' | 'not-started';
  dueDate: string;
  lastUpdated: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  documents: string[];
}

interface AuditRecord {
  id: string;
  auditType: string;
  auditDate: string;
  auditor: string;
  department: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'follow-up';
  findings: number;
  score: number;
  nextAuditDate: string;
}

interface TrainingRecord {
  id: string;
  trainingName: string;
  category: string;
  requiredFor: string;
  completionRate: number;
  totalStaff: number;
  completedStaff: number;
  deadline: string;
  status: 'on-track' | 'behind' | 'completed' | 'overdue';
}

interface DocumentRecord {
  id: string;
  documentName: string;
  type: string;
  department: string;
  uploadDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending-review';
  uploadedBy: string;
}

const mockChecklist: ComplianceChecklistItem[] = [
  {
    id: 'COMP001',
    category: 'Patient Safety',
    item: 'Hand Hygiene Compliance',
    description: 'Regular hand hygiene audits and documentation of compliance rates across all departments.',
    status: 'compliant',
    dueDate: '2024-03-31',
    lastUpdated: '2024-01-15',
    assignedTo: 'Infection Control Team',
    priority: 'high',
    documents: ['Hand Hygiene Policy', 'Audit Reports', 'Training Materials']
  },
  {
    id: 'COMP002',
    category: 'Data Privacy',
    item: 'HIPAA Compliance',
    description: 'Ensure all patient data handling procedures meet HIPAA requirements.',
    status: 'in-progress',
    dueDate: '2024-02-28',
    lastUpdated: '2024-01-20',
    assignedTo: 'Privacy Officer',
    priority: 'high',
    documents: ['HIPAA Policy', 'Staff Training Records', 'Incident Reports']
  },
  {
    id: 'COMP003',
    category: 'Facility Safety',
    item: 'Fire Safety Compliance',
    description: 'Fire safety equipment maintenance, evacuation drills, and staff training.',
    status: 'compliant',
    dueDate: '2024-06-30',
    lastUpdated: '2024-01-10',
    assignedTo: 'Facilities Management',
    priority: 'medium',
    documents: ['Fire Safety Plan', 'Drill Records', 'Equipment Maintenance Logs']
  },
  {
    id: 'COMP004',
    category: 'Clinical Standards',
    item: 'Medication Safety',
    description: 'Medication administration protocols, error reporting, and continuous improvement.',
    status: 'non-compliant',
    dueDate: '2024-01-31',
    lastUpdated: '2024-01-22',
    assignedTo: 'Pharmacy Department',
    priority: 'high',
    documents: ['Medication Safety Policy', 'Error Reports', 'Root Cause Analysis']
  },
  {
    id: 'COMP005',
    category: 'Staff Training',
    item: 'Annual Training Completion',
    description: 'Mandatory annual training modules for all staff members.',
    status: 'in-progress',
    dueDate: '2024-03-15',
    lastUpdated: '2024-01-18',
    assignedTo: 'HR Department',
    priority: 'medium',
    documents: ['Training Schedule', 'Completion Reports', 'Training Materials']
  }
];

const mockAudits: AuditRecord[] = [
  {
    id: 'AUD001',
    auditType: 'Internal Safety Audit',
    auditDate: '2024-01-15',
    auditor: 'Dr. Sarah Johnson',
    department: 'Emergency Department',
    status: 'completed',
    findings: 3,
    score: 92,
    nextAuditDate: '2024-07-15'
  },
  {
    id: 'AUD002',
    auditType: 'HIPAA Compliance Audit',
    auditDate: '2024-02-01',
    auditor: 'External Auditor',
    department: 'All Departments',
    status: 'scheduled',
    findings: 0,
    score: 0,
    nextAuditDate: '2025-02-01'
  },
  {
    id: 'AUD003',
    auditType: 'Infection Control Audit',
    auditDate: '2024-01-20',
    auditor: 'Infection Control Team',
    department: 'ICU',
    status: 'in-progress',
    findings: 2,
    score: 88,
    nextAuditDate: '2024-07-20'
  },
  {
    id: 'AUD004',
    auditType: 'Fire Safety Audit',
    auditDate: '2024-01-10',
    auditor: 'Fire Safety Officer',
    department: 'All Buildings',
    status: 'completed',
    findings: 1,
    score: 95,
    nextAuditDate: '2024-07-10'
  }
];

const mockTraining: TrainingRecord[] = [
  {
    id: 'TRN001',
    trainingName: 'HIPAA Privacy & Security',
    category: 'Compliance',
    requiredFor: 'All Staff',
    completionRate: 78,
    totalStaff: 450,
    completedStaff: 351,
    deadline: '2024-03-31',
    status: 'on-track'
  },
  {
    id: 'TRN002',
    trainingName: 'Infection Prevention',
    category: 'Clinical',
    requiredFor: 'Clinical Staff',
    completionRate: 92,
    totalStaff: 280,
    completedStaff: 258,
    deadline: '2024-02-28',
    status: 'on-track'
  },
  {
    id: 'TRN003',
    trainingName: 'Fire Safety & Evacuation',
    category: 'Safety',
    requiredFor: 'All Staff',
    completionRate: 45,
    totalStaff: 450,
    completedStaff: 203,
    deadline: '2024-01-31',
    status: 'behind'
  },
  {
    id: 'TRN004',
    trainingName: 'Patient Rights & Advocacy',
    category: 'Compliance',
    requiredFor: 'Patient-Facing Staff',
    completionRate: 100,
    totalStaff: 320,
    completedStaff: 320,
    deadline: '2024-01-15',
    status: 'completed'
  }
];

const mockDocuments: DocumentRecord[] = [
  {
    id: 'DOC001',
    documentName: 'Hospital License',
    type: 'License',
    department: 'Administration',
    uploadDate: '2023-12-01',
    expiryDate: '2024-12-01',
    status: 'valid',
    uploadedBy: 'Admin Team'
  },
  {
    id: 'DOC002',
    documentName: 'Insurance Certificate',
    type: 'Insurance',
    department: 'Finance',
    uploadDate: '2023-06-15',
    expiryDate: '2024-06-15',
    status: 'valid',
    uploadedBy: 'Finance Team'
  },
  {
    id: 'DOC003',
    documentName: 'Radiology Equipment Certification',
    type: 'Certification',
    department: 'Radiology',
    uploadDate: '2023-03-01',
    expiryDate: '2024-03-01',
    status: 'expiring',
    uploadedBy: 'Radiology Manager'
  },
  {
    id: 'DOC004',
    documentName: 'Pharmacy License',
    type: 'License',
    department: 'Pharmacy',
    uploadDate: '2023-09-01',
    expiryDate: '2024-09-01',
    status: 'valid',
    uploadedBy: 'Pharmacy Director'
  }
];

export default function CompliancePage() {
  const [checklist, setChecklist] = useState<ComplianceChecklistItem[]>(mockChecklist);
  const [audits, setAudits] = useState<AuditRecord[]>(mockAudits);
  const [training, setTraining] = useState<TrainingRecord[]>(mockTraining);
  const [documents, setDocuments] = useState<DocumentRecord[]>(mockDocuments);
  const [activeTab, setActiveTab] = useState<'checklist' | 'audits' | 'training' | 'documents'>('checklist');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any }> = {
      'compliant': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'non-compliant': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'not-started': { color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
      'scheduled': { color: 'bg-yellow-100 text-yellow-800', icon: Calendar },
      'completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'follow-up': { color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
      'on-track': { color: 'bg-green-100 text-green-800', icon: TrendingUp },
      'behind': { color: 'bg-red-100 text-red-800', icon: AlertCircle },
      'overdue': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'valid': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'expiring': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'expired': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'pending-review': { color: 'bg-blue-100 text-blue-800', icon: Eye }
    };
    
    const config = statusConfig[status] || statusConfig['not-started'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, string> = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={priorityConfig[priority] || priorityConfig.low}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const filteredChecklist = checklist.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatistics = () => {
    const compliantItems = checklist.filter(c => c.status === 'compliant').length;
    const nonCompliantItems = checklist.filter(c => c.status === 'non-compliant').length;
    const overallScore = checklist.length > 0 ? Math.round((compliantItems / checklist.length) * 100) : 0;
    const pendingTrainings = training.filter(t => t.status === 'behind' || t.status === 'overdue').length;
    const expiringDocuments = documents.filter(d => d.status === 'expiring' || d.status === 'expired').length;
    
    return {
      compliantItems,
      nonCompliantItems,
      overallScore,
      pendingTrainings,
      expiringDocuments,
      totalChecklistItems: checklist.length,
      completedAudits: audits.filter(a => a.status === 'completed').length
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
          <p className="text-muted-foreground">Monitor compliance status, audits, and regulatory requirements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-green-600">{stats.overallScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliant Items</p>
                <p className="text-2xl font-bold text-blue-600">{stats.compliantItems}/{stats.totalChecklistItems}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Trainings</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingTrainings}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Documents</p>
                <p className="text-2xl font-bold text-red-600">{stats.expiringDocuments}</p>
              </div>
              <FileWarning className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeTab === 'checklist' ? 'default' : 'outline'}
          onClick={() => setActiveTab('checklist')}
        >
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Compliance Checklist
        </Button>
        <Button
          variant={activeTab === 'audits' ? 'default' : 'outline'}
          onClick={() => setActiveTab('audits')}
        >
          <Eye className="h-4 w-4 mr-2" />
          Audit Readiness
        </Button>
        <Button
          variant={activeTab === 'training' ? 'default' : 'outline'}
          onClick={() => setActiveTab('training')}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Training Status
        </Button>
        <Button
          variant={activeTab === 'documents' ? 'default' : 'outline'}
          onClick={() => setActiveTab('documents')}
        >
          <FileText className="h-4 w-4 mr-2" />
          Document Management
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {activeTab === 'checklist' && 'Compliance Checklist'}
              {activeTab === 'audits' && 'Audit Schedule & Results'}
              {activeTab === 'training' && 'Training Compliance'}
              {activeTab === 'documents' && 'Document Management'}
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
                  <SelectItem value="compliant">Compliant</SelectItem>
                  <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'checklist' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChecklist.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {item.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>{item.assignedTo}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDetailOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'audits' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audit Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Auditor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audits.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className="font-medium">{audit.auditType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {audit.auditDate}
                      </div>
                    </TableCell>
                    <TableCell>{audit.auditor}</TableCell>
                    <TableCell>{audit.department}</TableCell>
                    <TableCell>{getStatusBadge(audit.status)}</TableCell>
                    <TableCell>
                      <span className={audit.findings > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                        {audit.findings} {audit.findings === 1 ? 'finding' : 'findings'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {audit.score > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${audit.score >= 90 ? 'bg-green-500' : audit.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${audit.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{audit.score}%</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Pending</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'training' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Training</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Required For</TableHead>
                  <TableHead>Completion</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {training.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.trainingName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.category}</Badge>
                    </TableCell>
                    <TableCell>{record.requiredFor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${record.completionRate >= 90 ? 'bg-green-500' : record.completionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${record.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{record.completionRate}%</span>
                        <span className="text-xs text-muted-foreground">
                          ({record.completedStaff}/{record.totalStaff})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {record.deadline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'documents' && (
            <div>
              <div className="flex justify-end mb-4">
                <Dialog open={isAddDocumentOpen} onOpenChange={setIsAddDocumentOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload New Document</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Document Name</label>
                        <Input placeholder="Enter document name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Document Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="license">License</SelectItem>
                            <SelectItem value="certification">Certification</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="policy">Policy</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Department</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administration">Administration</SelectItem>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="radiology">Radiology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Upload File</label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddDocumentOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsAddDocumentOpen(false)}>Upload</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{doc.documentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>{doc.department}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.item || selectedItem?.auditType || selectedItem?.trainingName}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{selectedItem.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{getStatusBadge(selectedItem.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{selectedItem.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{selectedItem.assignedTo}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedItem.description}</p>
              </div>
              {selectedItem.documents && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Related Documents</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.documents.map((doc: string, index: number) => (
                      <Badge key={index} variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                <Button>Edit</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}