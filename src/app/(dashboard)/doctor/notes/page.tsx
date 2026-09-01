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
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Edit, 
  Eye, 
  Trash2, 
  Download, 
  Printer, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Paperclip, 
  CheckCircle, 
  AlertCircle,
  Stethoscope,
  ClipboardList,
  Template,
  History
} from 'lucide-react';

interface ClinicalNote {
  id: string;
  patientName: string;
  patientId: string;
  visitDate: string;
  visitType: 'initial' | 'follow-up' | 'emergency' | 'telehealth' | 'procedure';
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  assessment: string;
  plan: string;
  medications: string[];
  followUp: string;
  notes: string;
  attachments: string[];
  templates: string[];
  status: 'draft' | 'final' | 'amended';
  lastModified: string;
  author: string;
  department: string;
  tags: string[];
}

const mockNotes: ClinicalNote[] = [
  {
    id: 'NOTE001',
    patientName: 'John Smith',
    patientId: 'PAT001',
    visitDate: '2024-01-20',
    visitType: 'follow-up',
    chiefComplaint: 'Chest pain and shortness of breath',
    historyOfPresentIllness: 'Patient presents with recurring chest pain for the past 3 days. Pain is described as sharp, localized to the left chest, and worsens with deep inspiration. Associated with mild dyspnea on exertion. No radiation to arm or jaw. No diaphoresis or nausea.',
    physicalExamination: 'Vitals: BP 130/85, HR 88, RR 18, Temp 98.6°F, SpO2 96% on room air. General: Alert and oriented, appears uncomfortable. Cardiovascular: Regular rate and rhythm, no murmurs, rubs, or gallops. Lungs: Clear to auscultation bilaterally, no wheezes or crackles. Chest: Mild tenderness to palpation over left 5th intercostal space.',
    assessment: '1. Atypical chest pain, likely musculoskeletal\n2. Rule out cardiac etiology\n3. Anxiety-related symptoms',
    plan: '1. Order ECG and chest X-ray\n2. Start ibuprofen 600mg TID for pain\n3. Follow up in 1 week with results\n4. Return immediately if symptoms worsen',
    medications: ['Ibuprofen 600mg TID', 'Acetaminophen 500mg PRN'],
    followUp: '1 week',
    notes: 'Patient anxious about cardiac symptoms. Discussed risk factors and reassured. ECG scheduled for tomorrow.',
    attachments: ['ECG_Report.pdf', 'Chest_XRay.jpg'],
    templates: ['Cardiac Follow-up Template'],
    status: 'final',
    lastModified: '2024-01-20 14:30',
    author: 'Dr. Sarah Williams',
    department: 'Cardiology',
    tags: ['cardiac', 'chest-pain', 'follow-up']
  },
  {
    id: 'NOTE002',
    patientName: 'Maria Garcia',
    patientId: 'PAT002',
    visitDate: '2024-01-19',
    visitType: 'initial',
    chiefComplaint: 'Persistent headaches for 3 months',
    historyOfPresentIllness: 'Patient reports daily headaches for the past 3 months, predominantly frontal and bilateral. Pain is described as throbbing, moderate intensity (5-7/10), and associated with photophobia and mild nausea. No vomiting, visual changes, or neurological symptoms. Previously treated with OTC analgesics with minimal relief.',
    physicalExamination: 'Vitals: BP 118/72, HR 72, RR 16, Temp 98.4°F, SpO2 99%. General: Well-appearing, in no acute distress. Neurological: Alert and oriented x3, cranial nerves II-XII intact, motor strength 5/5 throughout, sensation intact, reflexes 2+ and symmetric, gait normal. Fundoscopic exam: No papilledema.',
    assessment: '1. Chronic daily headaches, tension-type vs. migraine\n2. No red flags for increased ICP',
    plan: '1. Start amitriptyline 25mg QHS\n2. Maintain headache diary\n3. Stress management techniques\n4. Follow up in 4 weeks\n5. Consider neurology referral if no improvement',
    medications: ['Amitriptyline 25mg QHS', 'Sumatriptan 50mg PRN for severe headaches'],
    followUp: '4 weeks',
    notes: 'Discussed trigger factors and lifestyle modifications. Patient interested in mindfulness techniques.',
    attachments: ['Headache_Diary_Template.pdf'],
    templates: ['Neurology Consult Template'],
    status: 'final',
    lastModified: '2024-01-19 16:45',
    author: 'Dr. Michael Chen',
    department: 'Primary Care',
    tags: ['neurology', 'headache', 'chronic-pain']
  },
  {
    id: 'NOTE003',
    patientName: 'Robert Wilson',
    patientId: 'PAT003',
    visitDate: '2024-01-18',
    visitType: 'procedure',
    chiefComplaint: 'Knee pain requiring injection',
    historyOfPresentIllness: 'Patient with known osteoarthritis of right knee presents for scheduled corticosteroid injection. Previous injections provided 3-4 months of relief. Current pain level 6/10, limiting daily activities.',
    physicalExamination: 'Vitals: BP 125/78, HR 76, RR 16, Temp 98.5°F. Right knee: Swelling noted, crepitus with range of motion, tenderness over medial joint line, no erythema or warmth. Range of motion limited to 110 degrees flexion. Ligaments stable.',
    assessment: '1. Osteoarthritis, right knee, moderate severity\n2. Scheduled intra-articular injection',
    plan: '1. Administered corticosteroid injection (triamcinolone 40mg)\n2. Ice and rest for 24 hours\n3. Resume normal activities as tolerated\n4. Follow up in 2 weeks\n5. Consider physical therapy referral',
    medications: ['Triamcinolone 40mg intra-articular (administered)'],
    followUp: '2 weeks',
    notes: 'Procedure tolerated well. No immediate complications. Discussed expected timeline for relief (3-7 days).',
    attachments: ['Injection_Record.pdf', 'Consent_Form.pdf'],
    templates: ['Joint Injection Template'],
    status: 'final',
    lastModified: '2024-01-18 11:20',
    author: 'Dr. James Johnson',
    department: 'Orthopedics',
    tags: ['orthopedics', 'injection', 'osteoarthritis']
  },
  {
    id: 'NOTE004',
    patientName: 'Jennifer Lee',
    patientId: 'PAT004',
    visitDate: '2024-01-21',
    visitType: 'telehealth',
    chiefComplaint: 'Follow-up on chemotherapy side effects',
    historyOfPresentIllness: 'Patient status post 3rd cycle of chemotherapy for breast cancer. Reports increased fatigue, mild nausea controlled with antiemetics, and hair loss. No fever, chills, or signs of infection. Able to maintain adequate nutrition and hydration.',
    physicalExamination: 'Vitals: Patient-reported BP 110/68, HR 80. General: Appears well, good energy level for current treatment phase. No acute distress noted on video examination. Patient reports no new symptoms.',
    assessment: '1. Breast cancer, responding to treatment\n2. Chemotherapy side effects, manageable\n3. No evidence of complications',
    plan: '1. Continue current chemotherapy regimen\n2. Maintain antiemetic regimen\n3. Report any fever >100.4°F immediately\n4. Lab work before next cycle\n5. Follow up in 2 weeks for 4th cycle',
    medications: ['Ondansetron 8mg TID PRN', 'Dexamethasone 4mg daily x 3 days post-chemo'],
    followUp: '2 weeks',
    notes: 'Patient in good spirits. Discussed wig options and support groups. Family providing excellent support.',
    attachments: ['Lab_Results.pdf', 'Treatment_Plan.pdf'],
    templates: ['Oncology Follow-up Template'],
    status: 'final',
    lastModified: '2024-01-21 10:15',
    author: 'Dr. Lisa Park',
    department: 'Oncology',
    tags: ['oncology', 'chemotherapy', 'telehealth']
  }
];

const noteTemplates = [
  { id: 'TPL001', name: 'General Follow-up', category: 'Primary Care' },
  { id: 'TPL002', name: 'Cardiac Assessment', category: 'Cardiology' },
  { id: 'TPL003', name: 'Neurological Exam', category: 'Neurology' },
  { id: 'TPL004', name: 'Musculoskeletal', category: 'Orthopedics' },
  { id: 'TPL005', name: 'Post-Procedure', category: 'Surgery' },
  { id: 'TPL006', name: 'Oncology Follow-up', category: 'Oncology' },
  { id: 'TPL007', name: 'Telehealth Visit', category: 'General' }
];

export default function DoctorNotesPage() {
  const [notes, setNotes] = useState<ClinicalNote[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [visitTypeFilter, setVisitTypeFilter] = useState<string>('all');
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<ClinicalNote | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    patientName: '',
    patientId: '',
    visitType: '',
    chiefComplaint: '',
    historyOfPresentIllness: '',
    physicalExamination: '',
    assessment: '',
    plan: '',
    medications: '',
    followUp: '',
    notes: '',
    tags: ''
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any }> = {
      'draft': { color: 'bg-yellow-100 text-yellow-800', icon: Edit },
      'final': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'amended': { color: 'bg-blue-100 text-blue-800', icon: AlertCircle }
    };
    
    const config = statusConfig[status] || statusConfig['draft'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getVisitTypeBadge = (type: string) => {
    const typeConfig: Record<string, { label: string; color: string }> = {
      'initial': { label: 'Initial Visit', color: 'bg-purple-100 text-purple-800' },
      'follow-up': { label: 'Follow-up', color: 'bg-blue-100 text-blue-800' },
      'emergency': { label: 'Emergency', color: 'bg-red-100 text-red-800' },
      'telehealth': { label: 'Telehealth', color: 'bg-green-100 text-green-800' },
      'procedure': { label: 'Procedure', color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = typeConfig[type] || typeConfig['follow-up'];
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || note.status === statusFilter;
    const matchesType = visitTypeFilter === 'all' || note.visitType === visitTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateNote = () => {
    const newNoteEntry: ClinicalNote = {
      id: `NOTE${String(notes.length + 1).padStart(3, '0')}`,
      patientName: newNote.patientName,
      patientId: newNote.patientId,
      visitDate: new Date().toISOString().split('T')[0],
      visitType: newNote.visitType as any,
      chiefComplaint: newNote.chiefComplaint,
      historyOfPresentIllness: newNote.historyOfPresentIllness,
      physicalExamination: newNote.physicalExamination,
      assessment: newNote.assessment,
      plan: newNote.plan,
      medications: newNote.medications.split(',').map(m => m.trim()),
      followUp: newNote.followUp,
      notes: newNote.notes,
      attachments: [],
      templates: [],
      status: 'draft',
      lastModified: new Date().toLocaleString(),
      author: 'Dr. Current User',
      department: 'Current Department',
      tags: newNote.tags.split(',').map(t => t.trim())
    };
    
    setNotes([newNoteEntry, ...notes]);
    setIsCreateNoteOpen(false);
    setNewNote({
      patientName: '',
      patientId: '',
      visitType: '',
      chiefComplaint: '',
      historyOfPresentIllness: '',
      physicalExamination: '',
      assessment: '',
      plan: '',
      medications: '',
      followUp: '',
      notes: '',
      tags: ''
    });
  };

  const getStatistics = () => {
    const totalNotes = notes.length;
    const draftNotes = notes.filter(n => n.status === 'draft').length;
    const finalNotes = notes.filter(n => n.status === 'final').length;
    const todayNotes = notes.filter(n => n.visitDate === new Date().toISOString().split('T')[0]).length;
    
    return {
      totalNotes,
      draftNotes,
      finalNotes,
      todayNotes
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clinical Notes</h1>
          <p className="text-muted-foreground">Create and manage patient clinical documentation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsTemplateOpen(true)}>
            <Template className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button variant="outline">
            <History className="h-4 w-4 mr-2" />
            Recent Notes
          </Button>
          <Dialog open={isCreateNoteOpen} onOpenChange={setIsCreateNoteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Clinical Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient Name</label>
                    <Input 
                      placeholder="Enter patient name" 
                      value={newNote.patientName}
                      onChange={(e) => setNewNote({...newNote, patientName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Patient ID</label>
                    <Input 
                      placeholder="Enter patient ID" 
                      value={newNote.patientId}
                      onChange={(e) => setNewNote({...newNote, patientId: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visit Type</label>
                    <Select value={newNote.visitType} onValueChange={(value) => setNewNote({...newNote, visitType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="initial">Initial Visit</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="telehealth">Telehealth</SelectItem>
                        <SelectItem value="procedure">Procedure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Follow-up</label>
                    <Input 
                      placeholder="e.g., 2 weeks" 
                      value={newNote.followUp}
                      onChange={(e) => setNewNote({...newNote, followUp: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chief Complaint</label>
                  <Input 
                    placeholder="Enter chief complaint" 
                    value={newNote.chiefComplaint}
                    onChange={(e) => setNewNote({...newNote, chiefComplaint: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">History of Present Illness</label>
                  <Textarea 
                    placeholder="Detailed history..." 
                    rows={4}
                    value={newNote.historyOfPresentIllness}
                    onChange={(e) => setNewNote({...newNote, historyOfPresentIllness: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Physical Examination</label>
                  <Textarea 
                    placeholder="Examination findings..." 
                    rows={4}
                    value={newNote.physicalExamination}
                    onChange={(e) => setNewNote({...newNote, physicalExamination: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assessment</label>
                  <Textarea 
                    placeholder="Diagnosis and assessment..." 
                    rows={3}
                    value={newNote.assessment}
                    onChange={(e) => setNewNote({...newNote, assessment: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plan</label>
                  <Textarea 
                    placeholder="Treatment plan..." 
                    rows={3}
                    value={newNote.plan}
                    onChange={(e) => setNewNote({...newNote, plan: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Medications (comma-separated)</label>
                  <Input 
                    placeholder="e.g., Aspirin 81mg daily, Lisinopril 10mg daily" 
                    value={newNote.medications}
                    onChange={(e) => setNewNote({...newNote, medications: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Notes</label>
                  <Textarea 
                    placeholder="Any additional notes..." 
                    rows={2}
                    value={newNote.notes}
                    onChange={(e) => setNewNote({...newNote, notes: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input 
                    placeholder="e.g., cardiac, follow-up" 
                    value={newNote.tags}
                    onChange={(e) => setNewNote({...newNote, tags: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attachments</label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Paperclip className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag and drop files or click to upload</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateNoteOpen(false)}>Cancel</Button>
                  <Button variant="outline">Save as Draft</Button>
                  <Button onClick={handleCreateNote}>Save Note</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Notes</p>
                <p className="text-2xl font-bold">{stats.totalNotes}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Draft Notes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.draftNotes}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Final Notes</p>
                <p className="text-2xl font-bold text-green-600">{stats.finalNotes}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Notes</p>
                <p className="text-2xl font-bold text-purple-600">{stats.todayNotes}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Clinical Notes</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="final">Final</SelectItem>
                  <SelectItem value="amended">Amended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={visitTypeFilter} onValueChange={setVisitTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="initial">Initial Visit</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="telehealth">Telehealth</SelectItem>
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
                <TableHead>Patient</TableHead>
                <TableHead>Visit</TableHead>
                <TableHead>Chief Complaint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{note.patientName}</p>
                        <p className="text-sm text-muted-foreground">{note.patientId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getVisitTypeBadge(note.visitType)}
                      <p className="text-sm text-muted-foreground mt-1">{note.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium line-clamp-2">{note.chiefComplaint}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(note.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {note.visitDate}
                    </div>
                  </TableCell>
                  <TableCell>{note.author}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedNote(note);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Clinical Note - {selectedNote?.patientName}
              {selectedNote && getStatusBadge(selectedNote.status)}
            </DialogTitle>
          </DialogHeader>
          {selectedNote && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium">{selectedNote.patientName} ({selectedNote.patientId})</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visit Date</p>
                  <p className="font-medium">{selectedNote.visitDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visit Type</p>
                  <p className="font-medium">{getVisitTypeBadge(selectedNote.visitType)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{selectedNote.department}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Chief Complaint</p>
                <p className="text-sm bg-muted p-3 rounded-lg font-medium">{selectedNote.chiefComplaint}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">History of Present Illness</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedNote.historyOfPresentIllness}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Physical Examination</p>
                <p className="text-sm bg-muted p-3 rounded-lg">{selectedNote.physicalExamination}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Assessment</p>
                <p className="text-sm bg-muted p-3 rounded-lg whitespace-pre-line">{selectedNote.assessment}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Plan</p>
                <p className="text-sm bg-muted p-3 rounded-lg whitespace-pre-line">{selectedNote.plan}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Medications</p>
                <div className="flex flex-wrap gap-2">
                  {selectedNote.medications.map((med, index) => (
                    <Badge key={index} variant="outline">{med}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Follow-up</p>
                <p className="font-medium">{selectedNote.followUp}</p>
              </div>

              {selectedNote.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Additional Notes</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedNote.notes}</p>
                </div>
              )}

              {selectedNote.attachments.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Attachments</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNote.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-muted">
                        <Paperclip className="h-3 w-3 mr-1" />
                        {attachment}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedNote.tags.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNote.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Note
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Note Templates</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select a template to start your clinical note:</p>
            <div className="grid gap-3">
              {noteTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Template className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.category}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Use</Button>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsTemplateOpen(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}