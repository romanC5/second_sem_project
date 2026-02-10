import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState([
    { id: 'ORD001', customer: 'John Doe', email: 'john@example.com', date: '2026-01-25', items: 3, total: 7500, status: 'Delivered' },
    { id: 'ORD002', customer: 'Jane Smith', email: 'jane@example.com', date: '2026-01-24', items: 1, total: 5000, status: 'Pending' },
    { id: 'ORD003', customer: 'Mike Johnson', email: 'mike@example.com', date: '2026-01-24', items: 2, total: 3200, status: 'Processing' },
    { id: 'ORD004', customer: 'Sarah Wilson', email: 'sarah@example.com', date: '2026-01-23', items: 4, total: 12500, status: 'Shipped' },
    { id: 'ORD005', customer: 'Tom Brown', email: 'tom@example.com', date: '2026-01-23', items: 1, total: 8000, status: 'Delivered' },
    { id: 'ORD006', customer: 'Emily Davis', email: 'emily@example.com', date: '2026-01-22', items: 2, total: 4500, status: 'Cancelled' },
  ]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'Pending': return 'outline';
      case 'Processing': return 'secondary';
      case 'Shipped': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary">#{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell className="font-medium">Rs. {order.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(val) => handleStatusChange(order.id, val)}>
                      <SelectTrigger className="h-7 w-[130px] text-xs border-none shadow-none">
                        <Badge variant={getStatusVariant(order.status)} className="pointer-events-none">
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {statuses.map(status => {
          const count = orders.filter(o => o.status === status).length;
          return (
            <Card key={status}>
              <CardContent className="p-4">
                <Badge variant={getStatusVariant(status)} className="mb-2">{status}</Badge>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground">orders</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
