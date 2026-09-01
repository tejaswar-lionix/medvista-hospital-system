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
import { Search, Plus, Eye, Edit, Send, FileText, DollarSign, TrendingUp, CreditCard, Receipt } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  address: string;
  gstNumber: string;
  paymentTerms: string;
  rating: number;
  totalOrders: number;
  totalSpend: number;
  status: 'active' | 'inactive' | 'blocked';
  lastOrderDate: string;
}

interface PurchaseOrder {
  id: string;
  vendorId: string;
  vendorName: string;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
  orderDate: string;
  expectedDelivery: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'ordered' | 'received' | 'cancelled';
  approvedBy: string;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
}

const mockVendors: Vendor[] = [
  { id: 'VND001', name: 'MediSupply India', contactPerson: 'Rajesh Gupta', email: 'rajesh@medisupply.in', phone: '9876543210', category: 'Medical Supplies', address: 'Mumbai, Maharashtra', gstNumber: '27AABCM1234F1Z5', paymentTerms: 'Net 30', rating: 4.5, totalOrders: 45, totalSpend: 2500000, status: 'active', lastOrderDate: '2024-01-20' },
  { id: 'VND002', name: 'PharmaChem Labs', contactPerson: 'Sunita Sharma', email: 'sunita@pharmachem.in', phone: '8765432109', category: 'Pharmaceuticals', address: 'Pune, Maharashtra', gstNumber: '27AABCP5678G1Z8', paymentTerms: 'Net 45', rating: 4.2, totalOrders: 32, totalSpend: 1800000, status: 'active', lastOrderDate: '2024-01-18' },
  { id: 'VND003', name: 'TechMed Equipment', contactPerson: 'Amit Patel', email: 'amit@techmed.in', phone: '7654321098', category: 'Equipment', address: 'Delhi, NCR', gstNumber: '07AABCT9012H1Z3', paymentTerms: 'Net 60', rating: 4.8, totalOrders: 12, totalSpend: 5000000, status: 'active', lastOrderDate: '2024-01-05' },
  { id: 'VND004', name: 'SafeHands PPE', contactPerson: 'Priya Verma', email: 'priya@safehands.in', phone: '6543210987', category: 'PPE', address: 'Ahmedabad, Gujarat', gstNumber: '24AABCS3456I1Z6', paymentTerms: 'Net 30', rating: 3.9, totalOrders: 28, totalSpend: 800000, status: 'active', lastOrderDate: '2024-01-22' },
  { id: 'VND005', name: 'LabPro Diagnostics', contactPerson: 'Vikram Singh', email: 'vikram@labpro.in', phone: '5432109876', category: 'Diagnostics', address: 'Bangalore, Karnataka', gstNumber: '29AABCL7890J1Z9', paymentTerms: 'Net 30', rating: 4.6, totalOrders: 18, totalSpend: 1200000, status: 'inactive', lastOrderDate: '2023-12-15' },
];

const mockOrders: PurchaseOrder[] = [
  { id: 'PO001', vendorId: 'VND001', vendorName: 'MediSupply India', items: [{ name: 'Surgical Gloves (M)', quantity: 500, unitPrice: 12, total: 6000 }, { name: 'Face Masks N95', quantity: 1000, unitPrice: 25, total: 25000 }], orderDate: '2024-01-20', expectedDelivery: '2024-01-25', totalAmount: 31000, status: 'ordered', approvedBy: 'Amit Singh', paymentStatus: 'unpaid' },
  { id: 'PO002', vendorId: 'VND002', vendorName: 'PharmaChem Labs', items: [{ name: 'Paracetamol 500mg', quantity: 10000, unitPrice: 0.5, total: 5000 }, { name: 'Amoxicillin 250mg', quantity: 5000, unitPrice: 1.2, total: 6000 }], orderDate: '2024-01-18', expectedDelivery: '2024-01-23', totalAmount: 11000, status: 'received', approvedBy: 'Dr. Suresh Kumar', paymentStatus: 'paid' },
  { id: 'PO003', vendorId: 'VND003', vendorName: 'TechMed Equipment', items: [{ name: 'Patient Monitor', quantity: 5, unitPrice: 150000, total: 750000 }, { name: 'Infusion Pump', quantity: 10, unitPrice: 45000, total: 450000 }], orderDate: '2024-01-15', expectedDelivery: '2024-02-15', totalAmount: 1200000, status: 'approved', approvedBy: 'Hospital Director', paymentStatus: 'partial' },
];

export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      blocked: { color: 'bg-red-100 text-red-800', label: 'Blocked' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-blue-100 text-blue-800', label: 'Approved' },
      ordered: { color: 'bg-purple-100 text-purple-800', label: 'Ordered' },
      received: { color: 'bg-green-100 text-green-800', label: 'Received' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      unpaid: { color: 'bg-red-100 text-red-800', label: 'Unpaid' },
      partial: { color: 'bg-yellow-100 text-yellow-800', label: 'Partial' },
      paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
    };
    const cfg = config[status] || { color: 'bg-gray-100 text-gray-800', label: status };
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  const filteredVendors = mockVendors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'all' || v.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Receipt className="h-8 w-8" />
            Procurement & Vendors
          </h1>
          <p className="text-muted-foreground">Manage vendors, purchase orders, and procurement</p>
        </div>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockVendors.length}</div>
            <p className="text-xs text-muted-foreground">{mockVendors.filter((v) => v.status === 'active').length} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockOrders.filter((o) => o.status === 'pending' || o.status === 'ordered').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(mockVendors.reduce((sum, v) => sum + v.totalSpend, 0) / 100000).toFixed(1)}L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unpaid Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mockOrders.filter((o) => o.paymentStatus === 'unpaid').length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Vendor Directory</CardTitle><CardDescription>All registered vendors and suppliers</CardDescription></div>
                <div className="flex items-center gap-2">
                  <div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search vendors..." className="pl-8 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                      <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="PPE">PPE</SelectItem>
                      <SelectItem value="Diagnostics">Diagnostics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div><div className="font-medium">{vendor.name}</div><div className="text-sm text-muted-foreground">{vendor.contactPerson}</div></div>
                      </TableCell>
                      <TableCell>{vendor.category}</TableCell>
                      <TableCell>
                        <div className="text-sm"><div>{vendor.email}</div><div className="text-muted-foreground">{vendor.phone}</div></div>
                      </TableCell>
                      <TableCell>{vendor.totalOrders}</TableCell>
                      <TableCell>₹{(vendor.totalSpend / 100000).toFixed(1)}L</TableCell>
                      <TableCell><span className="text-yellow-600">★</span> {vendor.rating}</TableCell>
                      <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle>Purchase Orders</CardTitle><CardDescription>Track and manage purchase orders</CardDescription></div>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />New Order</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.vendorName}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
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
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>Register a new vendor or supplier</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Vendor Name</Label><Input placeholder="Company name" /></div>
            <div className="space-y-2"><Label>Contact Person</Label><Input placeholder="Contact name" /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@vendor.com" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input placeholder="Phone number" /></div>
            <div className="space-y-2"><Label>Category</Label><Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="medical">Medical Supplies</SelectItem><SelectItem value="pharma">Pharmaceuticals</SelectItem><SelectItem value="equipment">Equipment</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>GST Number</Label><Input placeholder="GST number" /></div>
            <div className="col-span-2 space-y-2"><Label>Address</Label><Textarea placeholder="Full address" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>Add Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
