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
  UserCheck, 
  UserX, 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Printer, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Users,
  LogIn,
  LogOut,
  BadgeCheck,
  Shield
} from 'lucide-react';

interface Visitor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  purpose: string;
  visitType: 'family' | 'business' | 'delivery' | 'maintenance' | 'official' | 'other';
  patientName: string;
  patientId: string;
  department: string;
  floor: string;
  checkInTime: string;
  checkOutTime: string | null;
  expectedDuration: string;
  badgeNumber: string;
  badgeStatus: 'active' | 'returned' | 'expired';
  hostName: string;
  hostDepartment: string;
  idType: 'drivers-license' | 'passport' | 'employee-id' | 'other';
  idNumber: string;
  status: 'checked-in' | 'checked-out' | 'expected';
  notes: string;
}

const mockVisitors: Visitor[] = [
  {
    id: 'VIS001',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@email.com',
    phone: '+1 (555) 123-4567',
    photoUrl: null,
    purpose: 'Family visit to patient',
    visitType: 'family',
    patientName: 'John Smith',
    patientId: 'PAT001',
    department: 'Cardiology',
    floor: '3rd Floor',
    checkInTime: '2024-01-20 09:15 AM',
    checkOutTime: null,
    expectedDuration: '2 hours',
    badgeNumber: 'V-B001',
    badgeStatus: 'active',
    hostName: 'Dr. Sarah Williams',
    hostDepartment: 'Cardiology',
    idType: 'drivers-license',
    idNumber: 'DL123456789',
    status: 'checked-in',
    notes: 'Visitor is patient\'s daughter. Arrived with flowers.'
  },
  {
    id: 'VIS002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@medequip.com',
    phone: '+1 (555) 234-5678',
    photoUrl: null,
    purpose: 'Equipment maintenance',
    visitType: 'maintenance',
    patientName: '',
    patientId: '',
    department: 'Radiology',
    floor: '2nd Floor',
    checkInTime: '2024-01-20 10:30 AM',
    checkOutTime: '2024-01-20 11:45 AM',
    expectedDuration: '1.5 hours',
    badgeNumber: 'V-B002',
    badgeStatus: 'returned',
    hostName: 'Robert Tech',
    hostDepartment: 'Facilities',
    idType: 'employee-id',
    idNumber: 'EMP987654',
    status: 'checked-out',
    notes: 'Scheduled maintenance for MRI equipment.'
  },
  {
    id: 'VIS003',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@email.com',
    phone: '+1 (555) 345-6789',
    photoUrl: null,
    purpose: 'Business meeting with administration',
    visitType: 'business',
    patientName: '',
    patientId: '',
    department: 'Administration',
    floor: '5th Floor',
    checkInTime: '2024-01-20 01:00 PM',
    checkOutTime: null,
    expectedDuration: '1 hour',
    badgeNumber: 'V-B003',
    badgeStatus: 'active',
    hostName: 'Admin Director',
    hostDepartment: 'Administration',
    idType: 'drivers-license',
    idNumber: 'DL987654321',
    status: 'checked-in',
    notes: 'Vendor representative for new software presentation.'
  },
  {
    id: 'VIS004',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@email.com',
    phone: '+1 (555) 456-7890',
    photoUrl: null,
    purpose: 'Delivery of medical supplies',
    visitType: 'delivery',
    patientName: '',
    patientId: '',
    department: 'Pharmacy',
    floor: '1st Floor',
    checkInTime: '2024-01-20 02:30 PM',
    checkOutTime: '2024-01-20 03:00 PM',
    expectedDuration: '30 minutes',
    badgeNumber: 'V-B004',
    badgeStatus: 'returned',
    hostName: 'Pharmacy Manager',
    hostDepartment: 'Pharmacy',
    idType: 'other',
    idNumber: 'DLV123456',
    status: 'checked-out',
    notes: 'Regular weekly delivery from MedSupply Co.'
  },
  {
    id: 'VIS005',
    firstName: 'Jennifer',
    lastName: 'Davis',
    email: 'jennifer.davis@email.com',
    phone: '+1 (555) 567-8901',
    photoUrl: null,
    purpose: 'Official inspection',
    visitType: 'official',
    patientName: '',
    patientId: '',
    department: 'All Departments',
    floor: 'All Floors',
    checkInTime: '2024-01-20 08:00 AM',
    checkOutTime: null,
    expectedDuration: '4 hours',
    badgeNumber: 'V-B005',
    badgeStatus: 'active',
    hostName: 'Chief Medical Officer',
    hostDepartment: 'Administration',
    idType: 'other',
    idNumber: 'GOV987654',
    status: 'checked-in',
    notes: 'Health department inspection. Requires access to all areas.'
  }
];

export default function VisitorLogPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [visitTypeFilter, setVisitTypeFilter] = useState<string>('all');
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any }> = {
      'checked-in': { color: 'bg-green-100 text-green-800', icon: LogIn },
      'checked-out': { color: 'bg-gray-100 text-gray-800', icon: LogOut },
      'expected': { color: 'bg-blue-100 text-blue-800', icon: Clock },
      'active': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'returned': { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      'expired': { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    
    const config = statusConfig[status] || statusConfig['checked-in'];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  const getVisitTypeBadge = (type: string) => {
    const typeConfig: Record<string, { label: string; color: string }> = {
      'family': { label: 'Family Visit', color: 'bg-blue-100 text-blue-800' },
      'business': { label: 'Business', color: 'bg-purple-100 text-purple-800' },
      'delivery': { label: 'Delivery', color: 'bg-orange-100 text-orange-800' },
      'maintenance': { label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' },
      'official': { label: 'Official', color: 'bg-red-100 text-red-800' },
      'other': { label: 'Other', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = typeConfig[type] || typeConfig['other'];
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredVisitors = visitors.filter(visitor => {
    const fullName = `${visitor.firstName} ${visitor.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         visitor.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
    const matchesType = visitTypeFilter === 'all' || visitor.visitType === visitTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCheckOut = (visitorId: string) => {
    setVisitors(visitors.map(visitor => 
      visitor.id === visitorId ? { 
        ...visitor, 
        status: 'checked-out' as const,
        checkOutTime: new Date().toLocaleString(),
        badgeStatus: 'returned' as const
      } : visitor
    ));
    setIsDetailOpen(false);
  };

  const getStatistics = () => {
    const totalVisitors = visitors.length;
    const checkedIn = visitors.filter(v => v.status === 'checked-in').length;
    const checkedOut = visitors.filter(v => v.status === 'checked-out').length;
    const expected = visitors.filter(v => v.status === 'expected').length;
    const todayVisitors = visitors.filter(v => v.checkInTime.includes('2024-01-20')).length;
    
    return {
      totalVisitors,
      checkedIn,
      checkedOut,
      expected,
      todayVisitors
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Visitor Log</h1>
          <p className="text-muted-foreground">Track and manage hospital visitors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print Badge
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Log
          </Button>
          <Dialog open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Check In Visitor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Check In New Visitor</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Enter last name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visit Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family Visit</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="official">Official</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Purpose</label>
                  <Input placeholder="Enter visit purpose" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name (if applicable)</label>
                  <Input placeholder="Enter patient name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="radiology">Radiology</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Host Name</label>
                  <Input placeholder="Enter host name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expected Duration</label>
                  <Input placeholder="e.g., 2 hours" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ID Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drivers-license">Driver's License</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="employee-id">Employee ID</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ID Number</label>
                  <Input placeholder="Enter ID number" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea placeholder="Additional notes or instructions" />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCheckInOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsCheckInOpen(false)}>Check In</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">{stats.totalVisitors}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Checked In</p>
                <p className="text-2xl font-bold text-green-600">{stats.checkedIn}</p>
              </div>
              <LogIn className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Checked Out</p>
                <p className="text-2xl font-bold text-gray-600">{stats.checkedOut}</p>
              </div>
              <LogOut className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expected</p>
                <p className="text-2xl font-bold text-blue-600">{stats.expected}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Visitors</p>
                <p className="text-2xl font-bold text-purple-600">{stats.todayVisitors}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Visitor Log</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search visitors..."
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
                  <SelectItem value="checked-in">Checked In</SelectItem>
                  <SelectItem value="checked-out">Checked Out</SelectItem>
                  <SelectItem value="expected">Expected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={visitTypeFilter} onValueChange={setVisitTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="family">Family Visit</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="official">Official</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitor</TableHead>
                <TableHead>Badge</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Visiting</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {visitor.firstName[0]}{visitor.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{visitor.firstName} {visitor.lastName}</p>
                        <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{visitor.badgeNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{visitor.purpose}</p>
                      {getVisitTypeBadge(visitor.visitType)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {visitor.patientName ? (
                        <p className="font-medium">{visitor.patientName}</p>
                      ) : (
                        <p className="text-muted-foreground">N/A</p>
                      )}
                      <p className="text-sm text-muted-foreground">Host: {visitor.hostName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{visitor.department}</p>
                        <p className="text-sm text-muted-foreground">{visitor.floor}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4 text-green-500" />
                      <span>{visitor.checkInTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {visitor.checkOutTime ? (
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4 text-gray-500" />
                        <span>{visitor.checkOutTime}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(visitor.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedVisitor(visitor);
                          setIsDetailOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {visitor.status === 'checked-in' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleCheckOut(visitor.id)}
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Visitor Details
              {selectedVisitor && getStatusBadge(selectedVisitor.status)}
            </DialogTitle>
          </DialogHeader>
          {selectedVisitor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border">
                  <span className="text-xl font-bold">
                    {selectedVisitor.firstName[0]}{selectedVisitor.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedVisitor.firstName} {selectedVisitor.lastName}</h3>
                  <p className="text-muted-foreground">Badge: {selectedVisitor.badgeNumber}</p>
                  <p className="text-muted-foreground">{selectedVisitor.phone}</p>
                  <p className="text-muted-foreground">{selectedVisitor.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Visit Type</p>
                  <p className="font-medium">{getVisitTypeBadge(selectedVisitor.visitType)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purpose</p>
                  <p className="font-medium">{selectedVisitor.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium">{selectedVisitor.patientName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{selectedVisitor.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Host</p>
                  <p className="font-medium">{selectedVisitor.hostName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Duration</p>
                  <p className="font-medium">{selectedVisitor.expectedDuration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check In Time</p>
                  <p className="font-medium">{selectedVisitor.checkInTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Check Out Time</p>
                  <p className="font-medium">{selectedVisitor.checkOutTime || 'Not checked out'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Type</p>
                  <p className="font-medium">{selectedVisitor.idType.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p className="font-medium">{selectedVisitor.idNumber}</p>
                </div>
              </div>
              
              {selectedVisitor.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedVisitor.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                {selectedVisitor.status === 'checked-in' && (
                  <Button onClick={() => handleCheckOut(selectedVisitor.id)}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Check Out
                  </Button>
                )}
                <Button>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Badge
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}