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
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Eye, Edit, Send, FileText, Users, GraduationCap, Award, BookOpen } from 'lucide-react';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  instructor: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  certification: boolean;
  requirements: string[];
  location: string;
  fee: number;
}

interface TrainingRecord {
  id: string;
  staffName: string;
  staffId: string;
  programTitle: string;
  completedDate: string;
  score: number;
  passed: boolean;
  certificateNumber: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'expiring-soon';
}

const mockPrograms: TrainingProgram[] = [
  {
    id: 'TRG001',
    title: 'Basic Life Support (BLS)',
    description: 'American Heart Association BLS certification for healthcare providers',
    category: 'Emergency',
    duration: '8 hours',
    instructor: 'Dr. Suresh Kumar',
    startDate: '2024-02-01',
    endDate: '2024-02-01',
    maxParticipants: 20,
    currentParticipants: 15,
    status: 'upcoming',
    certification: true,
    requirements: ['Valid medical license', 'Previous CPR experience'],
    location: 'Training Center - Room 101',
    fee: 5000,
  },
  {
    id: 'TRG002',
    title: 'Advanced Cardiac Life Support (ACLS)',
    description: 'Advanced training for cardiac emergency management',
    category: 'Emergency',
    duration: '16 hours',
    instructor: 'Dr. Amit Patel',
    startDate: '2024-02-15',
    endDate: '2024-02-16',
    maxParticipants: 15,
    currentParticipants: 12,
    status: 'upcoming',
    certification: true,
    requirements: ['BLS certification', '2 years clinical experience'],
    location: 'Simulation Lab',
    fee: 12000,
  },
  {
    id: 'TRG003',
    title: 'Infection Control Practices',
    description: 'Hospital-acquired infection prevention and control measures',
    category: 'Safety',
    duration: '4 hours',
    instructor: 'Nurse Anita Desai',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    maxParticipants: 30,
    currentParticipants: 30,
    status: 'ongoing',
    certification: false,
    requirements: [],
    location: 'Conference Hall',
    fee: 0,
  },
  {
    id: 'TRG004',
    title: 'Electronic Health Records Training',
    description: 'Comprehensive training on hospital EHR system',
    category: 'Technology',
    duration: '6 hours',
    instructor: 'IT Department',
    startDate: '2024-01-10',
    endDate: '2024-01-10',
    maxParticipants: 25,
    currentParticipants: 25,
    status: 'completed',
    certification: false,
    requirements: ['Basic computer literacy'],
    location: 'Computer Lab',
    fee: 0,
  },
];

const mockRecords: TrainingRecord[] = [
  { id: 'REC001', staffName: 'Nurse Anita Desai', staffId: 'STF001', programTitle: 'BLS Certification', completedDate: '2023-06-15', score: 92, passed: true, certificateNumber: 'BLS-2023-001', expiryDate: '2025-06-15', status: 'valid' },
  { id: 'REC002', staffName: 'Dr. Suresh Kumar', staffId: 'STF002', programTitle: 'ACLS Certification', completedDate: '2023-08-20', score: 88, passed: true, certificateNumber: 'ACLS-2023-045', expiryDate: '2025-08-20', status: 'valid' },
  { id: 'REC003', staffName: 'Priya Sharma', staffId: 'STF004', programTitle: 'PALS Certification', completedDate: '2022-12-10', score: 85, passed: true, certificateNumber: 'PALS-2022-112', expiryDate: '2024-12-10', status: 'expiring-soon' },
  { id: 'REC004', staffName: 'Rajesh Patel', staffId: 'STF003', programTitle: 'Radiation Safety', completedDate: '2022-03-05', score: 90, passed: true, certificateNumber: 'RAD-2022-023', expiryDate: '2024-03-05', status: 'expired' },
];

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState('programs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      upcoming: { color: 'bg-blue-100 text-blue-800', label: 'Upcoming' },
      ongoing: { color: 'bg-green-100 text-green-800', label: 'Ongoing' },
      completed: { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      valid: { color: 'bg-green-100 text-green-800', label: 'Valid' },
      expired: { color: 'bg-red-100 text-red-800', label: 'Expired' },
      'expiring-soon': { color: 'bg-yellow-100 text-yellow-800', label: 'Expiring Soon' },
    };
    const cfg = config[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  const filteredPrograms = mockPrograms.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            Training & Compliance
          </h1>
          <p className="text-muted-foreground">Manage staff training programs and compliance tracking</p>
        </div>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPrograms.filter((p) => p.status === 'ongoing').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certifications Valid</CardTitle>
            <Award className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockRecords.filter((r) => r.status === 'valid').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockRecords.filter((r) => r.status === 'expiring-soon').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <Award className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mockRecords.filter((r) => r.status === 'expired').length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="programs">Training Programs</TabsTrigger>
          <TabsTrigger value="records">Certification Records</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Training Programs</CardTitle>
                  <CardDescription>Available and upcoming training sessions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search programs..." className="pl-8 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedProgram(program)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{program.title}</CardTitle>
                          <CardDescription>{program.category}</CardDescription>
                        </div>
                        {getStatusBadge(program.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-muted-foreground">Duration:</span> {program.duration}</div>
                        <div><span className="text-muted-foreground">Instructor:</span> {program.instructor}</div>
                        <div><span className="text-muted-foreground">Location:</span> {program.location}</div>
                        <div><span className="text-muted-foreground">Fee:</span> ₹{program.fee.toLocaleString()}</div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Participants</span>
                          <span>{program.currentParticipants}/{program.maxParticipants}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(program.currentParticipants / program.maxParticipants) * 100}%` }} />
                        </div>
                      </div>
                      {program.certification && <Badge className="mt-2 bg-purple-100 text-purple-800">Certification Program</Badge>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certification Records</CardTitle>
              <CardDescription>Staff certification tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{record.staffName}</div>
                          <div className="text-sm text-muted-foreground">{record.staffId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{record.programTitle}</TableCell>
                      <TableCell>{record.completedDate}</TableCell>
                      <TableCell><span className={record.score >= 80 ? 'text-green-600' : 'text-red-600'}>{record.score}%</span></TableCell>
                      <TableCell><Badge variant="outline">{record.certificateNumber}</Badge></TableCell>
                      <TableCell>{record.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Training Program</DialogTitle>
            <DialogDescription>Set up a new training session</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Program Title</Label><Input placeholder="Enter title" /></div>
            <div className="space-y-2"><Label>Category</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="emergency">Emergency</SelectItem><SelectItem value="safety">Safety</SelectItem><SelectItem value="tech">Technology</SelectItem></SelectContent></Select></div>
            <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea placeholder="Program description" /></div>
            <div className="space-y-2"><Label>Duration</Label><Input placeholder="e.g., 8 hours" /></div>
            <div className="space-y-2"><Label>Instructor</Label><Input placeholder="Instructor name" /></div>
            <div className="space-y-2"><Label>Start Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Max Participants</Label><Input type="number" placeholder="20" /></div>
            <div className="space-y-2"><Label>Fee (₹)</Label><Input type="number" placeholder="0" /></div>
            <div className="space-y-2"><Label>Location</Label><Input placeholder="Training location" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Create Program</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProgram?.title}</DialogTitle>
            <DialogDescription>Program Details</DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-4">
              <p>{selectedProgram.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><Label className="text-muted-foreground">Duration</Label><p>{selectedProgram.duration}</p></div>
                <div><Label className="text-muted-foreground">Instructor</Label><p>{selectedProgram.instructor}</p></div>
                <div><Label className="text-muted-foreground">Start Date</Label><p>{selectedProgram.startDate}</p></div>
                <div><Label className="text-muted-foreground">Location</Label><p>{selectedProgram.location}</p></div>
                <div><Label className="text-muted-foreground">Fee</Label><p>₹{selectedProgram.fee.toLocaleString()}</p></div>
                <div><Label className="text-muted-foreground">Certification</Label><p>{selectedProgram.certification ? 'Yes' : 'No'}</p></div>
              </div>
              {selectedProgram.requirements.length > 0 && (
                <div><Label className="text-muted-foreground">Requirements</Label>
                  <ul className="list-disc list-inside mt-1">{selectedProgram.requirements.map((req, i) => <li key={i} className="text-sm">{req}</li>)}</ul>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProgram(null)}>Close</Button>
            <Button>Enroll Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
