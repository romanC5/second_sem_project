import React, { useState } from 'react';
import { Search, Plus, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

const ShopsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [shops, setShops] = useState([
    { id: 1, name: 'Tech Paradise', owner: 'John Doe', email: 'john@techparadise.com', phone: '+977 9801234567', products: 145, status: 'Active', joinDate: '2025-06-15' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', email: 'jane@fashionhub.com', phone: '+977 9807654321', products: 234, status: 'Active', joinDate: '2025-07-20' },
    { id: 3, name: 'Electronics Zone', owner: 'Mike Johnson', email: 'mike@electronicszone.com', phone: '+977 9812345678', products: 189, status: 'Active', joinDate: '2025-08-10' },
    { id: 4, name: 'Home Decor', owner: 'Sarah Wilson', email: 'sarah@homedecor.com', phone: '+977 9823456789', products: 167, status: 'Active', joinDate: '2025-05-01' },
    { id: 5, name: 'Sports Arena', owner: 'Tom Brown', email: 'tom@sportsarena.com', phone: '+977 9834567890', products: 123, status: 'Pending', joinDate: '2025-09-25' },
    { id: 6, name: 'Book World', owner: 'Emily Davis', email: 'emily@bookworld.com', phone: '+977 9845678901', products: 98, status: 'Inactive', joinDate: '2025-04-12' },
  ]);

  const [newShop, setNewShop] = useState({ name: '', owner: '', email: '', phone: '' });

  const handleAddShop = (e) => {
    e.preventDefault();
    const shop = {
      id: shops.length + 1,
      ...newShop,
      products: 0,
      status: 'Pending',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setShops([...shops, shop]);
    setNewShop({ name: '', owner: '', email: '', phone: '' });
    setShowModal(false);
  };

  const handleStatusChange = (shopId, newStatus) => {
    setShops(shops.map(shop => shop.id === shopId ? { ...shop, status: newStatus } : shop));
  };

  const handleDeleteShop = (id) => {
    if (confirm('Are you sure you want to delete this shop?')) {
      setShops(shops.filter(s => s.id !== id));
    }
  };

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Pending': return 'outline';
      case 'Inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search shops..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowModal(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Shop
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Active Shops</p>
            <p className="text-2xl font-bold">{shops.filter(s => s.status === 'Active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold">{shops.filter(s => s.status === 'Pending').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">Inactive Shops</p>
            <p className="text-2xl font-bold">{shops.filter(s => s.status === 'Inactive').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Shops Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop Details</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{shop.name}</div>
                      <div className="text-sm text-muted-foreground">Owner: {shop.owner}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{shop.email}</div>
                    <div className="text-sm text-muted-foreground">{shop.phone}</div>
                  </TableCell>
                  <TableCell>{shop.products}</TableCell>
                  <TableCell className="text-muted-foreground">{shop.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(shop.status)}>{shop.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {shop.status === 'Pending' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStatusChange(shop.id, 'Active')} title="Approve">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {shop.status === 'Active' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleStatusChange(shop.id, 'Inactive')} title="Deactivate">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteShop(shop.id)} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Shop Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Shop</DialogTitle>
            <DialogDescription>Register a new shop on the platform.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddShop} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input id="shopName" required value={newShop.name} onChange={(e) => setNewShop({ ...newShop, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input id="ownerName" required value={newShop.owner} onChange={(e) => setNewShop({ ...newShop, owner: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopEmail">Email</Label>
              <Input id="shopEmail" type="email" required value={newShop.email} onChange={(e) => setNewShop({ ...newShop, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopPhone">Phone</Label>
              <Input id="shopPhone" type="tel" required value={newShop.phone} onChange={(e) => setNewShop({ ...newShop, phone: e.target.value })} />
            </div>
            <DialogFooter className="gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="submit">Add Shop</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopsManagement;
