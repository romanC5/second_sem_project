import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Dashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: 'Rs. 45,231', change: '+20.1%', trend: 'up', icon: DollarSign },
    { label: 'Orders', value: '156', change: '+12.5%', trend: 'up', icon: ShoppingCart },
    { label: 'Products', value: '89', change: '+5.2%', trend: 'up', icon: Package },
    { label: 'Customers', value: '1,234', change: '-2.4%', trend: 'down', icon: Users },
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', product: 'Wireless Headphones', amount: 'Rs. 2,500', status: 'Delivered' },
    { id: '#ORD002', customer: 'Jane Smith', product: 'Smart Watch', amount: 'Rs. 5,000', status: 'Pending' },
    { id: '#ORD003', customer: 'Mike Johnson', product: 'Laptop Stand', amount: 'Rs. 1,200', status: 'Processing' },
    { id: '#ORD004', customer: 'Sarah Wilson', product: 'USB-C Hub', amount: 'Rs. 3,500', status: 'Shipped' },
    { id: '#ORD005', customer: 'Tom Brown', product: 'Mechanical Keyboard', amount: 'Rs. 8,000', status: 'Delivered' },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'Pending': return 'outline';
      case 'Processing': return 'secondary';
      case 'Shipped': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-xs font-medium text-muted-foreground">
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className="rounded-lg p-2.5 bg-muted text-foreground">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{order.product}</TableCell>
                  <TableCell className="font-medium">{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
