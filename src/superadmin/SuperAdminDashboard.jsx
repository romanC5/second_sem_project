import React from 'react';
import { Store, Users, Package, DollarSign, TrendingUp, Activity, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SuperAdminDashboard = () => {
  const stats = [
    { label: 'Total Shops', value: '24', change: '+3 this month', icon: Store },
    { label: 'Total Shopkeepers', value: '32', change: '+5 this month', icon: Users },
    { label: 'All Products', value: '2,458', change: '+156 this week', icon: Package },
    { label: 'Total Revenue', value: 'Rs. 12.5L', change: '+18.2%', icon: DollarSign },
    { label: 'Active Orders', value: '543', change: '+28 today', icon: ShoppingBag },
    { label: 'Platform Users', value: '15,234', change: '+234 this week', icon: Activity },
  ];

  const topShops = [
    { id: 1, name: 'Tech Paradise', owner: 'John Doe', products: 145, orders: 456, revenue: 'Rs. 2.5L', status: 'Active' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', products: 234, orders: 389, revenue: 'Rs. 2.1L', status: 'Active' },
    { id: 3, name: 'Electronics Zone', owner: 'Mike Johnson', products: 189, orders: 345, revenue: 'Rs. 1.8L', status: 'Active' },
    { id: 4, name: 'Home Decor', owner: 'Sarah Wilson', products: 167, orders: 298, revenue: 'Rs. 1.5L', status: 'Active' },
    { id: 5, name: 'Sports Arena', owner: 'Tom Brown', products: 123, orders: 267, revenue: 'Rs. 1.3L', status: 'Pending' },
  ];

  const recentActivities = [
    { id: 1, action: 'New shop registered', shop: 'Book World', time: '5 mins ago', type: 'shop' },
    { id: 2, action: 'Product added', shop: 'Tech Paradise', time: '12 mins ago', type: 'product' },
    { id: 3, action: 'Large order placed', shop: 'Fashion Hub', time: '25 mins ago', type: 'order' },
    { id: 4, action: 'Shopkeeper verified', shop: 'Sports Arena', time: '1 hour ago', type: 'user' },
    { id: 5, action: 'Payment received', shop: 'Electronics Zone', time: '2 hours ago', type: 'payment' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'shop': return <Store className="h-4 w-4 text-foreground" />;
      case 'product': return <Package className="h-4 w-4 text-foreground" />;
      case 'order': return <ShoppingBag className="h-4 w-4 text-foreground" />;
      case 'user': return <Users className="h-4 w-4 text-foreground" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-foreground" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{stat.change}</span>
                  </div>
                </div>
                <div className="rounded-xl p-3.5 bg-muted text-foreground">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top Performing Shops */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Performing Shops</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topShops.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{shop.name}</div>
                        <div className="text-sm text-muted-foreground">{shop.owner}</div>
                      </div>
                    </TableCell>
                    <TableCell>{shop.products}</TableCell>
                    <TableCell>{shop.orders}</TableCell>
                    <TableCell className="font-medium">{shop.revenue}</TableCell>
                    <TableCell>
                      <Badge variant={shop.status === 'Active' ? 'default' : 'outline'}>
                        {shop.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-muted p-1.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.shop}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
