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
  Wrench, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2, 
  Building2, 
  Cog, 
  Truck, 
  Phone,
  MapPin,
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  reportedBy: string;
  reportedDate: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'open' | 'in-progress' | 'completed' | 'on-hold';
  category: 'plumbing' | 'electrical' | 'hvac' | 'structural' | 'equipment' | 'other';
  assignedTo: string;
  estimatedCompletion: string;
  actualCompletion: string | null;
  cost: number;
  notes: string;
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  location: string;
  department: string;
  purchaseDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: 'operational' | 'maintenance-needed' | 'out-of-service' | 'decommissioned';
  manufacturer: string;
  model: string;
  warrantyExpiry: string;
  assignedTo: string;
}

interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  activeContracts: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'preferred';
  lastServiceDate: string;
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: 'MNT001',
    title: 'HVAC System Malfunction',
    description: 'Air conditioning unit in ICU not maintaining temperature. Critical issue affecting patient care environment.',
    location: 'ICU - Room 302',
    department: 'Intensive Care Unit',
    reportedBy: 'Nurse Johnson',
    reportedDate: '2024-01-20',
    priority: 'emergency',
    status: 'in-progress',
    category: 'hvac',
    assignedTo: 'Facilities Team',
    estimatedCompletion: '2024-01-21',
    actualCompletion: null,
    cost: 2500,
    notes: 'Emergency repair initiated. Temporary cooling unit deployed.'
  },
  {
    id: 'MNT002',
    title: 'Leaking Pipe in Ward',
    description: 'Water leak detected in the ceiling of Ward 205. Risk of water damage and slip hazard.',
    location: 'Ward 205',
    department: 'General Ward',
    reportedBy: 'Cleaning Staff',
    reportedDate: '2024-01-19',
    priority: 'high',
    status: 'open',
    category: 'plumbing',
    assignedTo: 'Plumbing Contractor',
    estimatedCompletion: '2024-01-23',
    actualCompletion: null,
    cost: 800,
    notes: 'Water containment measures in place. Area cordoned off.'
  },
  {
    id: 'MNT003',
    title: 'Elevator Maintenance',
    description: 'Annual elevator maintenance and safety inspection required for all three hospital elevators.',
    location: 'Main Building',
    department: 'Facilities',
    reportedBy: 'Facilities Manager',
    reportedDate: '2024-01-15',
    priority: 'medium',
    status: 'scheduled',
    category: 'equipment',
    assignedTo: 'Elevator Service Co.',
    estimatedCompletion: '2024-01-30',
    actualCompletion: null,
    cost: 4500,
    notes: 'Scheduled maintenance during off-peak hours.'
  },
  {
    id: 'MNT004',
    title: 'Lighting Repair in Lobby',
    description: 'Several fluorescent lights in the main lobby are flickering or burned out.',
    location: 'Main Lobby',
    department: 'Administration',
    reportedBy: 'Reception Staff',
    reportedDate: '2024-01-18',
    priority: 'low',
    status: 'completed',
    category: 'electrical',
    assignedTo: 'Electrical Team',
    estimatedCompletion: '2024-01-20',
    actualCompletion: '2024-01-19',
    cost: 350,
    notes: 'All lights replaced with energy-efficient LED fixtures.'
  },
  {
    id: 'MNT005',
    title: 'Wall Damage in Cafeteria',
    description: 'Drywall damage near the kitchen area due to previous water leak. Requires repair and repainting.',
    location: 'Cafeteria',
    department: 'Food Services',
    reportedBy: 'Cafeteria Manager',
    reportedDate: '2024-01-17',
    priority: 'low',
    status: 'on-hold',
    category: 'structural',
    assignedTo: 'Maintenance Team',
    estimatedCompletion: '2024-02-05',
    actualCompletion: null,
    cost: 1200,
    notes: 'Waiting for paint delivery. Repair scheduled for next week.'
  }
];

const mockEquipment: Equipment[] = [
  {
    id: 'EQP001',
    name: 'MRI Scanner',
    category: 'Diagnostic Imaging',
    location: 'Radiology Department',
    department: 'Radiology',
    purchaseDate: '2020-06-15',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    status: 'operational',
    manufacturer: 'Siemens',
    model: 'Magnetom Aera',
    warrantyExpiry: '2025-06-15',
    assignedTo: 'Radiology Tech Team'
  },
  {
    id: 'EQP002',
    name: 'Ventilator Unit',
    category: 'Life Support',
    location: 'ICU',
    department: 'Intensive Care Unit',
    purchaseDate: '2021-03-20',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-04-05',
    status: 'operational',
    manufacturer: 'Philips',
    model: 'Respironics V60',
    warrantyExpiry: '2026-03-20',
    assignedTo: 'Biomedical Engineering'
  },
  {
    id: 'EQP003',
    name: 'Patient Monitor',
    category: 'Monitoring',
    location: 'Emergency Department',
    department: 'Emergency',
    purchaseDate: '2019-11-10',
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-06-15',
    status: 'maintenance-needed',
    manufacturer: 'GE Healthcare',
    model: 'Carescape B650',
    warrantyExpiry: '2024-11-10',
    assignedTo: 'Biomedical Engineering'
  },
  {
    id: 'EQP004',
    name: 'Surgical Laser System',
    category: 'Surgical Equipment',
    location: 'Operating Theater 1',
    department: 'Surgery',
    purchaseDate: '2022-08-25',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-07-15',
    status: 'operational',
    manufacturer: 'Lumenis',
    model: 'UltraPulse',
    warrantyExpiry: '2027-08-25',
    assignedTo: 'Surgical Team'
  },
  {
    id: 'EQP005',
    name: 'CT Scanner',
    category: 'Diagnostic Imaging',
    location: 'Radiology Department',
    department: 'Radiology',
    purchaseDate: '2018-04-12',
    lastMaintenance: '2023-11-20',
    nextMaintenance: '2024-05-20',
    status: 'out-of-service',
    manufacturer: 'GE Healthcare',
    model: 'Revolution CT',
    warrantyExpiry: '2023-04-12',
    assignedTo: 'Radiology Tech Team'
  }
];

const mockVendors: Vendor[] = [
  {
    id: 'VND001',
    name: 'MedEquip Services',
    serviceType: 'Medical Equipment Maintenance',
    contactPerson: 'Robert Martinez',
    email: 'robert@medequip.com',
    phone: '+1 (555) 111-2222',
    address: '123 Medical Drive, Tech City, TC 12345',
    rating: 4.8,
    activeContracts: 3,
    totalSpent: 125000,
    status: 'preferred',
    lastServiceDate: '2024-01-15'
  },
  {
    id: 'VND002',
    name: 'FacilityPro Solutions',
    serviceType: 'General Facility Maintenance',
    contactPerson: 'Amanda White',
    email: 'amanda@facilitypro.com',
    phone: '+1 (555) 222-3333',
    address: '456 Service Lane, Build Town, BT 67890',
    rating: 4.5,
    activeContracts: 2,
    totalSpent: 85000,
    status: 'active',
    lastServiceDate: '2024-01-10'
  },
  {
    id: 'VND003',
    name: 'HVAC Experts Inc.',
    serviceType: 'HVAC Systems',
    contactPerson: 'David Chen',
    email: 'david@hvacexperts.com',
    phone: '+1 (555) 333-4444',
    address: '789 Climate Way, Air City, AC 11223',
    rating: 4.2,
    activeContracts: 1,
    totalSpent: 45000,
    status: 'active',
    lastServiceDate: '2024-01-05'
  },
  {
    id: 'VND004',
    name: 'ElectraFix Solutions',
    serviceType: 'Electrical Services',
    contactPerson: 'Sarah Thompson',
    email: 'sarah@electrafix.com',
    phone: '+1 (555) 444-5555',
    address: '321 Power Street, Volt City, VC 44556',
    rating: 4.6,
    activeContracts: 2,
    totalSpent: 62000,
    status: 'active',
    lastServiceDate: '2024-01-12'
  }
];

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [activeTab, setActiveTab] = useState<'requests' | 'equipment' | 'vendors'>('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any }> = {
      'open': { color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      'in-progress': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'completed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'on-hold': { color: 'bg-gray-100 text-gray-800', icon: XCircle },
      'scheduled': { color: 'bg-purple-100 text-purple-800', icon: Calendar },
      'operational': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'maintenance-needed': { color: 'bg-yellow-100 text-yellow-800', icon: Wrench },
      'out-of-service': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'decommissioned': { color: 'bg-gray-100 text-gray-800', icon: XCircle },
      'active': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'inactive': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'preferred': { color: 'bg-purple-100 text-purple-800', icon: Star }
    };
    
    const config = statusConfig[status] || statusConfig['open'];
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
      'high': 'bg-orange-100 text-orange-800',
      'emergency': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={priorityConfig[priority] || priorityConfig.low}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatistics = () => {
    const openRequests = requests.filter(r => r.status === 'open').length;
    const inProgressRequests = requests.filter(r => r.status === 'in-progress').length;
    const emergencyRequests = requests.filter(r => r.priority === 'emergency').length;
    const totalCost = requests.reduce((sum, r) => sum + r.cost, 0);
    const operationalEquipment = equipment.filter(e => e.status === 'operational').length;
    const maintenanceNeeded = equipment.filter(e => e.status === 'maintenance-needed').length;
    
    return {
      openRequests,
      inProgressRequests,
      emergencyRequests,
      totalCost,
      operationalEquipment,
      maintenanceNeeded,
      totalEquipment: equipment.length,
      totalVendors: vendors.length
    };
  };

  const stats = getStatistics();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Facility Maintenance</h1>
          <p className="text-muted-foreground">Manage maintenance requests, equipment, and vendors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Maintenance Request</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Brief description of the issue" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Detailed description of the maintenance issue" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Building/Floor/Room" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="icu">Intensive Care Unit</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="radiology">Radiology</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
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
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea placeholder="Additional notes or instructions" />
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddRequestOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsAddRequestOpen(false)}>Create Request</Button>
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
                <p className="text-sm text-muted-foreground">Open Requests</p>
                <p className="text-2xl font-bold text-blue-600">{stats.openRequests}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgressRequests}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Emergency</p>
                <p className="text-2xl font-bold text-red-600">{stats.emergencyRequests}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold">${stats.totalCost.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button
          variant={activeTab === 'requests' ? 'default' : 'outline'}
          onClick={() => setActiveTab('requests')}
        >
          <Wrench className="h-4 w-4 mr-2" />
          Maintenance Requests
        </Button>
        <Button
          variant={activeTab === 'equipment' ? 'default' : 'outline'}
          onClick={() => setActiveTab('equipment')}
        >
          <Cog className="h-4 w-4 mr-2" />
          Equipment Tracking
        </Button>
        <Button
          variant={activeTab === 'vendors' ? 'default' : 'outline'}
          onClick={() => setActiveTab('vendors')}
        >
          <Truck className="h-4 w-4 mr-2" />
          Vendor Management
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {activeTab === 'requests' && 'Maintenance Requests'}
              {activeTab === 'equipment' && 'Equipment Inventory'}
              {activeTab === 'vendors' && 'Vendor Directory'}
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
                  {activeTab === 'requests' && (
                    <>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </>
                  )}
                  {activeTab === 'equipment' && (
                    <>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="maintenance-needed">Maintenance Needed</SelectItem>
                      <SelectItem value="out-of-service">Out of Service</SelectItem>
                    </>
                  )}
                  {activeTab === 'vendors' && (
                    <>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="preferred">Preferred</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === 'requests' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Est. Completion</TableHead>
                  <TableHead>Cost</TableHead>
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
                        <p className="text-sm text-muted-foreground">Reported by: {request.reportedBy}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{request.location}</p>
                          <p className="text-sm text-muted-foreground">{request.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.assignedTo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {request.estimatedCompletion}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${request.cost.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedItem(request);
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

          {activeTab === 'equipment' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{item.location}</p>
                          <p className="text-sm text-muted-foreground">{item.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.manufacturer}</p>
                        <p className="text-sm text-muted-foreground">{item.model}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.lastMaintenance}</TableCell>
                    <TableCell>{item.nextMaintenance}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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

          {activeTab === 'vendors' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Active Contracts</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">{vendor.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{vendor.serviceType}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{vendor.contactPerson}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {vendor.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </TableCell>
                    <TableCell>{vendor.activeContracts}</TableCell>
                    <TableCell className="font-medium">${vendor.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title || selectedItem?.name}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">ID</p>
                  <p className="font-medium">{selectedItem.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{getStatusBadge(selectedItem.status)}</p>
                </div>
                {selectedItem.location && (
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedItem.location}</p>
                  </div>
                )}
                {selectedItem.department && (
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedItem.department}</p>
                  </div>
                )}
                {selectedItem.assignedTo && (
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{selectedItem.assignedTo}</p>
                  </div>
                )}
                {selectedItem.cost && (
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Cost</p>
                    <p className="font-medium">${selectedItem.cost.toLocaleString()}</p>
                  </div>
                )}
              </div>
              {selectedItem.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedItem.description}</p>
                </div>
              )}
              {selectedItem.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{selectedItem.notes}</p>
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