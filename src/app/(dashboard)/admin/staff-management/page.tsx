'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check, Clock, FileText, Plus, Search, Send, User, AlertCircle } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  position: string;
  joiningDate: string;
  salary: number;
  status: 'active' | 'on-leave' | 'inactive';
  shift: 'morning' | 'afternoon' | 'night';
  qualifications: string[];
  certifications: string[];
  emergencyContact: string;
  address: string;
  avatar: string;
}

interface StaffSchedule {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  shift: string;
  startTime: string;
  endTime: string;
  department: string;
  status: 'scheduled' | 'completed' | 'absent';
  overtime: number;
  notes: string;
}

interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  leaveType: 'sick' | 'casual' | 'earned' | 'maternity' | 'paternity' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy: string;
  appliedDate: string;
}

const mockStaff: StaffMember[] = [
  {
    id: 'STF001',
    name: 'Nurse Anita Desai',
    email: 'anita.desai@medvista.com',
    phone: '9876543210',
    role: 'Nurse',
    department: 'ICU',
    position: 'Senior Nurse',
    joiningDate: '2020-03-15',
    salary: 45000,
    status: 'active',
    shift: 'morning',
    qualifications: ['B.Sc Nursing', 'Critical Care Certificate'],
    certifications: ['BLS', 'ACLS'],
    emergencyContact: '9876543211',
    address: 'Andheri West, Mumbai',
    avatar: '',
  },
  {
    id: 'STF002',
    name: 'Dr. Suresh Kumar',
    email: 'suresh.kumar@medvista.com',
    phone: '8765432109',
    role: 'Doctor',
    department: 'Emergency',
    position: 'Emergency Physician',
    joiningDate: '2019-07-20',
    salary: 120000,
    status: 'active',
    shift: 'night',
    qualifications: ['MBBS', 'MD Emergency Medicine'],
    certifications: ['ATLS', 'PALS'],
    emergencyContact: '8765432110',
    address: 'Bandra East, Mumbai',
    avatar: '',
  },
  {
    id: 'STF003',
    name: 'Rajesh Patel',
    email: 'rajesh.patel@medvista.com',
    phone: '7654321098',
    role: 'Technician',
    department: 'Radiology',
    position: 'X-Ray Technician',
    joiningDate: '2021-01-10',
    salary: 35000,
    status: 'on-leave',
    shift: 'morning',
    qualifications: ['Diploma in Radiology'],
    certifications: ['ARRT'],
    emergencyContact: '7654321099',
    address: 'Juhu, Mumbai',
    avatar: '',
  },
  {
    id: 'STF004',
    name: 'Priya Sharma',
    email: 'priya.sharma@medvista.com',
    phone: '6543210987',
    role: 'Nurse',
    department: 'Pediatrics',
    position: 'Staff Nurse',
    joiningDate: '2022-06-01',
    salary: 38000,
    status: 'active',
    shift: 'afternoon',
    qualifications: ['B.Sc Nursing'],
    certifications: ['PALS', 'NRP'],
    emergencyContact: '6543210988',
    address: 'Powai, Mumbai',
    avatar: '',
  },
  {
    id: 'STF005',
    name: 'Amit Singh',
    email: 'amit.singh@medvista.com',
    phone: '5432109876',
    role: 'Admin',
    department: 'Administration',
    position: 'Office Manager',
    joiningDate: '2018-11-15',
    salary: 55000,
    status: 'active',
    shift: 'morning',
    qualifications: ['MBA Healthcare Management'],
    certifications: ['Project Management'],
    emergencyContact: '5432109877',
    address: 'Lower Parel, Mumbai',
    avatar: '',
  },
];

const mockSchedule: StaffSchedule[] = [
  {
    id: 'SCH001',
    staffId: 'STF001',
    staffName: 'Nurse Anita Desai',
    date: '2024-01-22',
    shift: 'Morning',
    startTime: '07:00',
    endTime: '15:00',
    department: 'ICU',
    status: 'completed',
    overtime: 0,
    notes: 'Regular shift',
  },
  {
    id: 'SCH002',
    staffId: 'STF002',
    staffName: 'Dr. Suresh Kumar',
    date: '2024-01-22',
    shift: 'Night',
    startTime: '19:00',
    endTime: '07:00',
    department: 'Emergency',
    status: 'scheduled',
    overtime: 0,
    notes: 'Night shift duty',
  },
  {
    id: 'SCH003',
    staffId: 'STF004',
    staffName: 'Priya Sharma',
    date: '2024-01-22',
    shift: 'Afternoon',
    startTime: '15:00',
    endTime: '23:00',
    department: 'Pediatrics',
    status: 'scheduled',
    overtime: 2,
    notes: 'Extended shift for emergency coverage',
  },
];

const mockLeaves: LeaveRequest[] = [
  {
    id: 'LVE001',
    staffId: 'STF003',
    staffName: 'Rajesh Patel',
    leaveType: 'sick',
    startDate: '2024-01-22',
    endDate: '2024-01-24',
    days: 3,
    reason: 'Fever and cold',
    status: 'approved',
    approvedBy: 'Dr. Suresh Kumar',
    appliedDate: '2024-01-21',
  },
  {
    id: 'LVE002',
    staffId: 'STF001',
    staffName: 'Nurse Anita Desai',
    leaveType: 'casual',
    startDate: '2024-01-28',
    endDate: '2024-01-29',
    days: 2,
    reason: 'Personal work',
    status: 'pending',
    approvedBy: '',
    appliedDate: '2024-01-22',
  },
];

export default function StaffManagementPage() {
  const [activeTab, setActiveTab] = useState('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const getShiftBadge = (shift: string) => {
    const shiftConfig: Record<string, { color: string; icon: React.ReactNode }> = {
      morning: { color: 'bg-orange-100 text-orange-800', icon: <Clock className="h-3 w-3" /> },
      afternoon: { color: 'bg-blue-100 text-blue-800', icon: <Clock className="h-3 w-3" /> },
      night: { color: 'bg-purple-100 text-purple-800', icon: <Clock className="h-3 w-3" /> },
    };
    const config = shiftConfig[shift] || shiftConfig.morning;
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {shift.charAt(0).toUpperCase() + shift.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      'on-leave': { color: 'bg-yellow-100 text-yellow-800', label: 'On Leave' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      absent: { color: 'bg-red-100 text-red-800', label: 'Absent' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
    };
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredStaff = mockStaff.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department === filterDepartment;
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-muted-foreground">Manage hospital staff, schedules, and leaves</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStaff.length}</div>
            <p className="text-xs text-muted-foreground">All staff members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockStaff.filter((s) => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently on duty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockStaff.filter((s) => s.status === 'on-leave').length}
            </div>
            <p className="text-xs text-muted-foreground">Staff on leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockLeaves.filter((l) => l.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="directory">Staff Directory</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="leaves">Leave Management</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Directory</CardTitle>
                  <CardDescription>Complete list of hospital staff</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search staff..."
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="Nurse">Nurse</SelectItem>
                      <SelectItem value="Technician">Technician</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{getShiftBadge(member.shift)}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStaff(member)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Staff Schedule</CardTitle>
                  <CardDescription>Today&apos;s shift schedule</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shift
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Overtime</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSchedule.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.staffName}</TableCell>
                      <TableCell>{schedule.shift}</TableCell>
                      <TableCell>
                        {schedule.startTime} - {schedule.endTime}
                      </TableCell>
                      <TableCell>{schedule.department}</TableCell>
                      <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                      <TableCell>
                        {schedule.overtime > 0 ? (
                          <Badge className="bg-orange-100 text-orange-800">
                            {schedule.overtime}h OT
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {schedule.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaves" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>Manage staff leave applications</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Apply Leave
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell className="font-medium">{leave.staffName}</TableCell>
                      <TableCell>
                        <Badge className="capitalize">{leave.leaveType}</Badge>
                      </TableCell>
                      <TableCell>
                        {leave.startDate} to {leave.endDate}
                      </TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {leave.reason}
                      </TableCell>
                      <TableCell>{getStatusBadge(leave.status)}</TableCell>
                      <TableCell>
                        {leave.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="text-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
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
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>Enter staff details to add a new member</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@medvista.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icu">ICU</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="radiology">Radiology</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift">Shift</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (7AM - 3PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (3PM - 11PM)</SelectItem>
                  <SelectItem value="night">Night (11PM - 7AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Add Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedStaff} onOpenChange={() => setSelectedStaff(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedStaff?.name}</DialogTitle>
            <DialogDescription>Staff Profile</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStaff.name}</h3>
                  <p className="text-muted-foreground">{selectedStaff.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedStaff.status)}
                    {getShiftBadge(selectedStaff.shift)}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedStaff.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedStaff.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="font-medium">{selectedStaff.department}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Joining Date</Label>
                  <p className="font-medium">{selectedStaff.joiningDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Salary</Label>
                  <p className="font-medium">${selectedStaff.salary.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Emergency Contact</Label>
                  <p className="font-medium">{selectedStaff.emergencyContact}</p>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-muted-foreground">Qualifications</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedStaff.qualifications.map((qual, index) => (
                    <Badge key={index} variant="outline">
                      {qual}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Certifications</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedStaff.certifications.map((cert, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedStaff(null)}>
              Close
            </Button>
            <Button>Edit Profile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
