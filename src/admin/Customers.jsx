import React, { useState } from 'react';
import { Search, Mail, Phone, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+977 9801234567', orders: 12, totalSpent: 45000, joinDate: '2025-06-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+977 9807654321', orders: 8, totalSpent: 32000, joinDate: '2025-07-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+977 9812345678', orders: 5, totalSpent: 18500, joinDate: '2025-08-10', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+977 9823456789', orders: 15, totalSpent: 67000, joinDate: '2025-05-01', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+977 9834567890', orders: 3, totalSpent: 12000, joinDate: '2025-09-25', status: 'Active' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', phone: '+977 9845678901', orders: 20, totalSpent: 89000, joinDate: '2025-04-12', status: 'Active' },
  ]);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Customers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="mt-1 text-3xl font-bold">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Active Customers</p>
            <p className="mt-1 text-3xl font-bold">{customers.filter(c => c.status === 'Active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="mt-1 text-3xl font-bold">Rs. {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                      {customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <Badge variant={customer.status === 'Active' ? 'default' : 'outline'} className="mt-0.5">
                      {customer.status}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Email</DropdownMenuItem>
                    <DropdownMenuItem>View Orders</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{customer.phone}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Orders</p>
                  <p className="text-lg font-semibold">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-semibold">Rs. {customer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">Joined: {customer.joinDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Customers;
