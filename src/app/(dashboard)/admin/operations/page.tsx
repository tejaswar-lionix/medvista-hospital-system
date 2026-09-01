'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, Check, ChevronsUpDown, Copy, CreditCard, Download, Edit, Eye, FileText, Filter, MoreHorizontal, Plus, RefreshCw, Search, Send, Settings, Trash2, Upload, User, X } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  price: number;
  supplier: string;
  expiryDate: string;
  location: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  reportedBy: string;
  assignedTo: string;
  department: string;
  equipment: string;
  reportedDate: string;
  completedDate: string | null;
  estimatedCost: number;
  actualCost: number | null;
}

interface VisitorLog {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  purpose: string;
  hostName: string;
  hostDepartment: string;
  checkInTime: string;
  checkOutTime: string | null;
  badgeNumber: string;
  idType: string;
  idNumber: string;
  vehicleNumber: string;
  status: 'checked-in' | 'checked-out' | 'pending';
}

const mockInventory: InventoryItem[] = [
  {
    id: 'INV001',
    name: 'Paracetamol 500mg',
    category: 'Medicine',
    quantity: 5000,
    unit: 'tablets',
    minStock: 1000,
    maxStock: 10000,
    price: 0.5,
    supplier: 'MediSupply Co.',
    expiryDate: '2025-12-31',
    location: 'Pharmacy - Shelf A1',
    lastRestocked: '2024-01-15',
    status: 'in-stock',
  },
  {
    id: 'INV002',
    name: 'Disposable Gloves (M)',
    category: 'Consumable',
    quantity: 150,
    unit: 'boxes',
    minStock: 200,
    maxStock: 1000,
    price: 12.0,
    supplier: 'SafeHands Medical',
    expiryDate: '2026-06-30',
    location: 'Store Room B',
    lastRestocked: '2024-01-10',
    status: 'low-stock',
  },
  {
    id: 'INV003',
    name: 'IV Fluid - Normal Saline',
    category: 'Medical Supply',
    quantity: 0,
    unit: 'bottles',
    minStock: 50,
    maxStock: 500,
    price: 3.5,
    supplier: 'InfuCare Ltd.',
    expiryDate: '2025-03-15',
    location: 'Emergency Store',
    lastRestocked: '2023-12-20',
    status: 'out-of-stock',
  },
  {
    id: 'INV004',
    name: 'Surgical Masks',
    category: 'PPE',
    quantity: 2000,
    unit: 'pieces',
    minStock: 500,
    maxStock: 5000,
    price: 0.3,
    supplier: 'SafeHands Medical',
    expiryDate: '2024-06-30',
    location: 'PPE Store',
    lastRestocked: '2024-01-20',
    status: 'expired',
  },
  {
    id: 'INV005',
    name: 'Stethoscope - Littmann',
    category: 'Equipment',
    quantity: 25,
    unit: 'pieces',
    minStock: 10,
    maxStock: 50,
    price: 150.0,
    supplier: '3M Medical',
    expiryDate: 'N/A',
    location: 'Equipment Room',
    lastRestocked: '2023-11-15',
    status: 'in-stock',
  },
  {
    id: 'INV006',
    name: 'Blood Test Strips',
    category: 'Diagnostic',
    quantity: 800,
    unit: 'strips',
    minStock: 200,
    maxStock: 2000,
    price: 1.2,
    supplier: 'AccuCheck',
    expiryDate: '2025-08-15',
    location: 'Lab Store',
    lastRestocked: '2024-01-18',
    status: 'in-stock',
  },
];

const mockMaintenance: MaintenanceRequest[] = [
  {
    id: 'MNT001',
    title: 'MRI Machine Calibration',
    description: 'Monthly calibration due for MRI scanner in Radiology department',
    priority: 'high',
    status: 'in-progress',
    reportedBy: 'Dr. Sharma',
    assignedTo: 'Tech Solutions Inc.',
    department: 'Radiology',
    equipment: 'Siemens MAGNETOM',
    reportedDate: '2024-01-20',
    completedDate: null,
    estimatedCost: 5000,
    actualCost: null,
  },
  {
    id: 'MNT002',
    title: 'AC Unit Not Cooling',
    description: 'AC in ICU Room 3 not maintaining temperature',
    priority: 'critical',
    status: 'pending',
    reportedBy: 'Nurse Patel',
    assignedTo: 'Facilities Team',
    department: 'ICU',
    equipment: 'HVAC System',
    reportedDate: '2024-01-22',
    completedDate: null,
    estimatedCost: 800,
    actualCost: null,
  },
  {
    id: 'MNT003',
    title: 'Printer Maintenance',
    description: 'Printer in admin office jamming frequently',
    priority: 'low',
    status: 'completed',
    reportedBy: 'Admin Staff',
    assignedTo: 'IT Support',
    department: 'Administration',
    equipment: 'HP LaserJet Pro',
    reportedDate: '2024-01-18',
    completedDate: '2024-01-19',
    estimatedCost: 150,
    actualCost: 120,
  },
];

const mockVisitors: VisitorLog[] = [
  {
    id: 'VIS001',
    visitorName: 'Rajesh Kumar',
    visitorPhone: '9876543210',
    visitorEmail: 'rajesh@email.com',
    purpose: 'Patient Visit',
    hostName: 'Suresh Kumar',
    hostDepartment: 'Orthopedics',
    checkInTime: '2024-01-22 10:30',
    checkOutTime: '2024-01-22 12:45',
    badgeNumber: 'V-B001',
    idType: 'Aadhaar',
    idNumber: '1234-5678-9012',
    vehicleNumber: 'MH-12-AB-1234',
    status: 'checked-out',
  },
  {
    id: 'VIS002',
    visitorName: 'Priya Verma',
    visitorPhone: '8765432109',
    visitorEmail: 'priya@email.com',
    purpose: 'Doctor Consultation',
    hostName: 'Dr. Amit Patel',
    hostDepartment: 'Neurology',
    checkInTime: '2024-01-22 14:00',
    checkOutTime: null,
    badgeNumber: 'V-B002',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    vehicleNumber: '',
    status: 'checked-in',
  },
  {
    id: 'VIS003',
    visitorName: 'Amit Singh',
    visitorPhone: '7654321098',
    visitorEmail: 'amit.singh@email.com',
    purpose: 'Delivery',
    hostName: 'Pharmacy Dept',
    hostDepartment: 'Pharmacy',
    checkInTime: '2024-01-22 15:30',
    checkOutTime: null,
    badgeNumber: 'V-B003',
    idType: 'Driving License',
    idNumber: 'DL-1234567890',
    vehicleNumber: 'MH-02-CD-5678',
    status: 'checked-in',
  },
];

export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string }> = {
      'in-stock': { color: 'bg-green-100 text-green-800', label: 'In Stock' },
      'low-stock': { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' },
      'out-of-stock': { color: 'bg-red-100 text-red-800', label: 'Out of Stock' },
      expired: { color: 'bg-gray-100 text-gray-800', label: 'Expired' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      'checked-in': { color: 'bg-blue-100 text-blue-800', label: 'Checked In' },
      'checked-out': { color: 'bg-green-100 text-green-800', label: 'Checked Out' },
    };
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { color: string; label: string }> = {
      low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
      medium: { color: 'bg-blue-100 text-blue-800', label: 'Medium' },
      high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
      critical: { color: 'bg-red-100 text-red-800', label: 'Critical' },
    };
    const config = priorityConfig[priority] || { color: 'bg-gray-100 text-gray-800', label: priority };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredMaintenance = mockMaintenance.filter((req) => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredVisitors = mockVisitors.filter((visitor) => {
    const matchesSearch = visitor.visitorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || visitor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const inventoryStats = {
    total: mockInventory.length,
    inStock: mockInventory.filter((i) => i.status === 'in-stock').length,
    lowStock: mockInventory.filter((i) => i.status === 'low-stock').length,
    outOfStock: mockInventory.filter((i) => i.status === 'out-of-stock').length,
    expired: mockInventory.filter((i) => i.status === 'expired').length,
  };

  const maintenanceStats = {
    total: mockMaintenance.length,
    pending: mockMaintenance.filter((m) => m.status === 'pending').length,
    inProgress: mockMaintenance.filter((m) => m.status === 'in-progress').length,
    completed: mockMaintenance.filter((m) => m.status === 'completed').length,
  };

  const visitorStats = {
    total: mockVisitors.length,
    checkedIn: mockVisitors.filter((v) => v.status === 'checked-in').length,
    checkedOut: mockVisitors.filter((v) => v.status === 'checked-out').length,
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Operations Management</h1>
          <p className="text-muted-foreground">Manage inventory, maintenance, and visitor logs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.total}</div>
            <p className="text-xs text-muted-foreground">Inventory items tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStock}</div>
            <p className="text-xs text-muted-foreground">Items need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceStats.pending + maintenanceStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Maintenance pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorStats.checkedIn}</div>
            <p className="text-xs text-muted-foreground">Currently in hospital</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Log</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Track and manage hospital inventory</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search items..."
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Consumable">Consumable</SelectItem>
                      <SelectItem value="Medical Supply">Medical Supply</SelectItem>
                      <SelectItem value="PPE">PPE</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{item.quantity} {item.unit}</span>
                          <div className="w-16">
                            <Progress
                              value={(item.quantity / item.maxStock) * 100}
                              className="h-2"
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedItem(item)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Restock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>Track equipment and facility maintenance</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search requests..."
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
                    <TableHead>Department</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Reported</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaintenance.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{req.title}</div>
                          <div className="text-sm text-muted-foreground">{req.equipment}</div>
                        </div>
                      </TableCell>
                      <TableCell>{req.department}</TableCell>
                      <TableCell>{getPriorityBadge(req.priority)}</TableCell>
                      <TableCell>{req.assignedTo}</TableCell>
                      <TableCell>{req.reportedDate}</TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Assign Team
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Visitor Log</CardTitle>
                  <CardDescription>Track hospital visitors</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search visitors..."
                      className="pl-8 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="checked-out">Checked Out</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Check In
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitor</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Badge</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{visitor.visitorName}</div>
                          <div className="text-sm text-muted-foreground">{visitor.visitorPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{visitor.purpose}</TableCell>
                      <TableCell>
                        <div>
                          <div>{visitor.hostName}</div>
                          <div className="text-sm text-muted-foreground">{visitor.hostDepartment}</div>
                        </div>
                      </TableCell>
                      <TableCell>{visitor.checkInTime}</TableCell>
                      <TableCell>{visitor.checkOutTime || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{visitor.badgeNumber}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(visitor.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {visitor.status === 'checked-in' && (
                              <DropdownMenuItem>
                                <LogOut className="h-4 w-4 mr-2" />
                                Check Out
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Print Badge
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Print Pass
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>Add a new item to inventory</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input id="itemName" placeholder="Enter item name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Consumable">Consumable</SelectItem>
                  <SelectItem value="Medical Supply">Medical Supply</SelectItem>
                  <SelectItem value="PPE">PPE</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" placeholder="e.g., pieces, boxes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Unit</Label>
              <Input id="price" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input id="supplier" placeholder="Supplier name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Storage Location</Label>
              <Input id="location" placeholder="e.g., Pharmacy - Shelf A1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>Item Details</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Category</Label>
                  <p className="font-medium">{selectedItem.category}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div>{getStatusBadge(selectedItem.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Quantity</Label>
                  <p className="font-medium">{selectedItem.quantity} {selectedItem.unit}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Price</Label>
                  <p className="font-medium">${selectedItem.price.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Supplier</Label>
                  <p className="font-medium">{selectedItem.supplier}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Expiry Date</Label>
                  <p className="font-medium">{selectedItem.expiryDate}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="font-medium">{selectedItem.location}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Restocked</Label>
                  <p className="font-medium">{selectedItem.lastRestocked}</p>
                </div>
              </div>
              <Separator />
              <div>
                <Label className="text-muted-foreground">Stock Level</Label>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{selectedItem.quantity} / {selectedItem.maxStock}</span>
                    <span>{Math.round((selectedItem.quantity / selectedItem.maxStock) * 100)}%</span>
                  </div>
                  <Progress value={(selectedItem.quantity / selectedItem.maxStock) * 100} className="h-3" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)}>
              Close
            </Button>
            <Button>Edit Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function Wrench(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
    </svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function UserPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}

function LogOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
