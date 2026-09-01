'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Search, Plus, Eye, Edit, Trash2, Download, Send, Check, X, AlertTriangle, FileText, Users, Stethoscope, Pill, BedDouble, Clock, TrendingUp, Activity } from 'lucide-react';

interface EmergencyCase {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  arrivalTime: string;
  triageLevel: 1 | 2 | 3 | 4 | 5;
  chiefComplaint: string;
  vitalSigns: {
    bp: string;
    heartRate: number;
    temperature: number;
    spo2: number;
    respiratoryRate: number;
  };
  status: 'waiting' | 'in-treatment' | 'stabilized' | 'transferred' | 'discharged';
  assignedDoctor: string;
  department: string;
  notes: string;
}

interface BedInfo {
  id: string;
  number: string;
  type: 'icu' | 'general' | 'private' | 'semi-private' | 'emergency';
  department: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  patientName: string | null;
  admissionDate: string | null;
  expectedDischarge: string | null;
  doctor: string | null;
}

const mockEmergencyCases: EmergencyCase[] = [
  {
    id: 'EMG001',
    patientName: 'Ravi Kumar',
    age: 45,
    gender: 'Male',
    arrivalTime: '2024-01-22 08:30',
    triageLevel: 2,
    chiefComplaint: 'Chest pain and shortness of breath',
    vitalSigns: {
      bp: '160/95',
      heartRate: 105,
      temperature: 98.6,
      spo2: 94,
      respiratoryRate: 24,
    },
    status: 'in-treatment',
    assignedDoctor: 'Dr. Suresh Kumar',
    department: 'Emergency',
    notes: 'Suspected cardiac event, ECG ordered',
  },
  {
    id: 'EMG002',
    patientName: 'Sunita Devi',
    age: 32,
    gender: 'Female',
    arrivalTime: '2024-01-22 09:15',
    triageLevel: 3,
    chiefComplaint: 'Severe abdominal pain',
    vitalSigns: {
      bp: '120/80',
      heartRate: 88,
      temperature: 99.2,
      spo2: 98,
      respiratoryRate: 18,
    },
    status: 'waiting',
    assignedDoctor: '',
    department: 'Emergency',
    notes: 'Awaiting doctor consultation',
  },
  {
    id: 'EMG003',
    patientName: 'Arun Patel',
    age: 67,
    gender: 'Male',
    arrivalTime: '2024-01-22 07:45',
    triageLevel: 1,
    chiefComplaint: 'Stroke symptoms - facial drooping, arm weakness',
    vitalSigns: {
      bp: '180/110',
      heartRate: 92,
      temperature: 98.4,
      spo2: 96,
      respiratoryRate: 20,
    },
    status: 'in-treatment',
    assignedDoctor: 'Dr. Amit Patel',
    department: 'Neurology',
    notes: 'Code stroke activated, CT scan in progress',
  },
  {
    id: 'EMG004',
    patientName: 'Priya Sharma',
    age: 8,
    gender: 'Female',
    arrivalTime: '2024-01-22 10:00',
    triageLevel: 3,
    chiefComplaint: 'High fever and seizures',
    vitalSigns: {
      bp: '95/60',
      heartRate: 120,
      temperature: 103.2,
      spo2: 97,
      respiratoryRate: 28,
    },
    status: 'in-treatment',
    assignedDoctor: 'Dr. Vikram Singh',
    department: 'Pediatrics',
    notes: 'Febrile seizure, antipyretics administered',
  },
];

const mockBeds: BedInfo[] = [
  { id: 'BED001', number: 'ICU-01', type: 'icu', department: 'ICU', status: 'occupied', patientName: 'Ravi Kumar', admissionDate: '2024-01-20', expectedDischarge: '2024-01-25', doctor: 'Dr. Suresh Kumar' },
  { id: 'BED002', number: 'ICU-02', type: 'icu', department: 'ICU', status: 'available', patientName: null, admissionDate: null, expectedDischarge: null, doctor: null },
  { id: 'BED003', number: 'ICU-03', type: 'icu', department: 'ICU', status: 'maintenance', patientName: null, admissionDate: null, expectedDischarge: null, doctor: null },
  { id: 'BED004', number: 'GEN-01', type: 'general', department: 'General', status: 'occupied', patientName: 'Suresh Mehta', admissionDate: '2024-01-21', expectedDischarge: '2024-01-24', doctor: 'Dr. Priya Sharma' },
  { id: 'BED005', number: 'GEN-02', type: 'general', department: 'General', status: 'occupied', patientName: 'Anita Desai', admissionDate: '2024-01-19', expectedDischarge: '2024-01-23', doctor: 'Dr. Sneha Reddy' },
  { id: 'BED006', number: 'PRV-01', type: 'private', department: 'Private', status: 'available', patientName: null, admissionDate: null, expectedDischarge: null, doctor: null },
  { id: 'BED007', number: 'PRV-02', type: 'private', department: 'Private', status: 'reserved', patientName: null, admissionDate: null, expectedDischarge: null, doctor: null },
  { id: 'BED008', number: 'SP-01', type: 'semi-private', department: 'Semi-Private', status: 'occupied', patientName: 'Rajesh Verma', admissionDate: '2024-01-22', expectedDischarge: '2024-01-26', doctor: 'Dr. Meera Iyer' },
  { id: 'BED009', number: 'EMG-01', type: 'emergency', department: 'Emergency', status: 'occupied', patientName: 'Arun Patel', admissionDate: '2024-01-22', expectedDischarge: null, doctor: 'Dr. Amit Patel' },
  { id: 'BED010', number: 'EMG-02', type: 'emergency', department: 'Emergency', status: 'available', patientName: null, admissionDate: null, expectedDischarge: null, doctor: null },
];

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState('cases');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTriage, setFilterTriage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCase, setSelectedCase] = useState<EmergencyCase | null>(null);

  const getTriageBadge = (level: number) => {
    const config: Record<number, { color: string; label: string }> = {
      1: { color: 'bg-red-600 text-white', label: 'Resuscitation' },
      2: { color: 'bg-orange-500 text-white', label: 'Emergent' },
      3: { color: 'bg-yellow-500 text-white', label: 'Urgent' },
      4: { color: 'bg-green-500 text-white', label: 'Less Urgent' },
      5: { color: 'bg-blue-500 text-white', label: 'Non-Urgent' },
    };
    const cfg = config[level] || config[3];
    return <Badge className={cfg.color}>Level {level}: {cfg.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      waiting: { color: 'bg-yellow-100 text-yellow-800', label: 'Waiting' },
      'in-treatment': { color: 'bg-blue-100 text-blue-800', label: 'In Treatment' },
      stabilized: { color: 'bg-green-100 text-green-800', label: 'Stabilized' },
      transferred: { color: 'bg-purple-100 text-purple-800', label: 'Transferred' },
      discharged: { color: 'bg-gray-100 text-gray-800', label: 'Discharged' },
    };
    const cfg = config[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  const getBedStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      available: { color: 'bg-green-100 text-green-800', label: 'Available' },
      occupied: { color: 'bg-red-100 text-red-800', label: 'Occupied' },
      maintenance: { color: 'bg-yellow-100 text-yellow-800', label: 'Maintenance' },
      reserved: { color: 'bg-blue-100 text-blue-800', label: 'Reserved' },
    };
    const cfg = config[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  const filteredCases = mockEmergencyCases.filter((c) => {
    const matchSearch = c.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTriage = filterTriage === 'all' || c.triageLevel === parseInt(filterTriage);
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchTriage && matchStatus;
  });

  const stats = {
    totalCases: mockEmergencyCases.length,
    waiting: mockEmergencyCases.filter((c) => c.status === 'waiting').length,
    inTreatment: mockEmergencyCases.filter((c) => c.status === 'in-treatment').length,
    bedsAvailable: mockBeds.filter((b) => b.status === 'available').length,
    bedsOccupied: mockBeds.filter((b) => b.status === 'occupied').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            Emergency Department
          </h1>
          <p className="text-muted-foreground">Manage emergency cases, triage, and bed allocation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Code Blue
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCases}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.waiting}</div>
            <p className="text-xs text-muted-foreground">Awaiting treatment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Treatment</CardTitle>
            <Stethoscope className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inTreatment}</div>
            <p className="text-xs text-muted-foreground">Being treated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beds Available</CardTitle>
            <BedDouble className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.bedsAvailable}</div>
            <p className="text-xs text-muted-foreground">Out of {mockBeds.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beds Occupied</CardTitle>
            <BedDouble className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.bedsOccupied}</div>
            <p className="text-xs text-muted-foreground">{Math.round((stats.bedsOccupied / mockBeds.length) * 100)}% occupancy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="cases">Emergency Cases</TabsTrigger>
          <TabsTrigger value="beds">Bed Management</TabsTrigger>
          <TabsTrigger value="triage">Triage Protocol</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Emergency Cases</CardTitle>
                  <CardDescription>Current patients in emergency department</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search patients..." className="pl-8 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select value={filterTriage} onValueChange={setFilterTriage}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Triage Level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                      <SelectItem value="4">Level 4</SelectItem>
                      <SelectItem value="5">Level 5</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="waiting">Waiting</SelectItem>
                      <SelectItem value="in-treatment">In Treatment</SelectItem>
                      <SelectItem value="stabilized">Stabilized</SelectItem>
                      <SelectItem value="transferred">Transferred</SelectItem>
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
                    <TableHead>Triage</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Vital Signs</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((emg) => (
                    <TableRow key={emg.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{emg.patientName}</div>
                          <div className="text-sm text-muted-foreground">{emg.age}y, {emg.gender}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getTriageBadge(emg.triageLevel)}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{emg.chiefComplaint}</TableCell>
                      <TableCell>
                        <div className="text-xs space-y-0.5">
                          <div>BP: {emg.vitalSigns.bp}</div>
                          <div>HR: {emg.vitalSigns.heartRate} bpm</div>
                          <div>SpO2: {emg.vitalSigns.spo2}%</div>
                        </div>
                      </TableCell>
                      <TableCell>{emg.assignedDoctor || 'Unassigned'}</TableCell>
                      <TableCell>{getStatusBadge(emg.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedCase(emg)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bed Overview</CardTitle>
              <CardDescription>Real-time bed availability across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bed</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Expected Discharge</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBeds.map((bed) => (
                    <TableRow key={bed.id}>
                      <TableCell className="font-medium">{bed.number}</TableCell>
                      <TableCell className="capitalize">{bed.type}</TableCell>
                      <TableCell>{bed.department}</TableCell>
                      <TableCell>{getBedStatusBadge(bed.status)}</TableCell>
                      <TableCell>{bed.patientName || '-'}</TableCell>
                      <TableCell>{bed.doctor || '-'}</TableCell>
                      <TableCell>{bed.expectedDischarge || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="triage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Triage Protocol</CardTitle>
              <CardDescription>Emergency triage levels and guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { level: 1, name: 'Resuscitation', color: 'border-red-600 bg-red-50', examples: 'Cardiac arrest, severe respiratory distress, major trauma', time: 'Immediate' },
                { level: 2, name: 'Emergent', color: 'border-orange-500 bg-orange-50', examples: 'Chest pain, stroke symptoms, severe bleeding', time: '< 10 minutes' },
                { level: 3, name: 'Urgent', color: 'border-yellow-500 bg-yellow-50', examples: 'Abdominal pain, fractures, moderate allergic reactions', time: '< 30 minutes' },
                { level: 4, name: 'Less Urgent', color: 'border-green-500 bg-green-50', examples: 'Minor wounds, sprains, mild illness', time: '< 60 minutes' },
                { level: 5, name: 'Non-Urgent', color: 'border-blue-500 bg-blue-50', examples: 'Prescription refills, minor complaints', time: '< 120 minutes' },
              ].map((triage) => (
                <div key={triage.level} className={`p-4 rounded-lg border-l-4 ${triage.color}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Level {triage.level}: {triage.name}</h3>
                      <p className="text-sm text-muted-foreground">Examples: {triage.examples}</p>
                    </div>
                    <Badge variant="outline">{triage.time}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCase?.patientName}</DialogTitle>
            <DialogDescription>Emergency Case Details</DialogDescription>
          </DialogHeader>
          {selectedCase && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">Age/Gender</Label><p>{selectedCase.age} years, {selectedCase.gender}</p></div>
                <div><Label className="text-muted-foreground">Arrival Time</Label><p>{selectedCase.arrivalTime}</p></div>
                <div><Label className="text-muted-foreground">Triage Level</Label><div>{getTriageBadge(selectedCase.triageLevel)}</div></div>
                <div><Label className="text-muted-foreground">Status</Label><div>{getStatusBadge(selectedCase.status)}</div></div>
              </div>
              <Separator />
              <div><Label className="text-muted-foreground">Chief Complaint</Label><p>{selectedCase.chiefComplaint}</p></div>
              <div><Label className="text-muted-foreground">Vital Signs</Label>
                <div className="grid grid-cols-5 gap-2 mt-1">
                  <div className="text-center p-2 bg-muted rounded"><div className="text-xs text-muted-foreground">BP</div><div className="font-medium">{selectedCase.vitalSigns.bp}</div></div>
                  <div className="text-center p-2 bg-muted rounded"><div className="text-xs text-muted-foreground">HR</div><div className="font-medium">{selectedCase.vitalSigns.heartRate}</div></div>
                  <div className="text-center p-2 bg-muted rounded"><div className="text-xs text-muted-foreground">Temp</div><div className="font-medium">{selectedCase.vitalSigns.temperature}°F</div></div>
                  <div className="text-center p-2 bg-muted rounded"><div className="text-xs text-muted-foreground">SpO2</div><div className="font-medium">{selectedCase.vitalSigns.spo2}%</div></div>
                  <div className="text-center p-2 bg-muted rounded"><div className="text-xs text-muted-foreground">RR</div><div className="font-medium">{selectedCase.vitalSigns.respiratoryRate}</div></div>
                </div>
              </div>
              <div><Label className="text-muted-foreground">Notes</Label><p>{selectedCase.notes}</p></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCase(null)}>Close</Button>
            <Button>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
