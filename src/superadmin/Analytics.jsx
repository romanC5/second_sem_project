import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Analytics = () => {
  const salesData = [
    { month: 'Jan', revenue: 85000, orders: 234 },
    { month: 'Feb', revenue: 92000, orders: 267 },
    { month: 'Mar', revenue: 78000, orders: 198 },
    { month: 'Apr', revenue: 105000, orders: 312 },
    { month: 'May', revenue: 118000, orders: 356 },
    { month: 'Jun', revenue: 125000, orders: 389 },
  ];

  const topCategories = [
    { name: 'Electronics', sales: 'Rs. 4.5L', percentage: 35, trend: 'up' },
    { name: 'Fashion', sales: 'Rs. 3.2L', percentage: 25, trend: 'up' },
    { name: 'Home & Living', sales: 'Rs. 2.8L', percentage: 22, trend: 'down' },
    { name: 'Sports', sales: 'Rs. 1.5L', percentage: 12, trend: 'up' },
    { name: 'Books', sales: 'Rs. 0.8L', percentage: 6, trend: 'down' },
  ];

  const regionalData = [
    { region: 'Kathmandu', shops: 12, revenue: 'Rs. 5.2L', growth: '+15%' },
    { region: 'Pokhara', shops: 6, revenue: 'Rs. 3.1L', growth: '+22%' },
    { region: 'Lalitpur', shops: 4, revenue: 'Rs. 2.5L', growth: '+18%' },
    { region: 'Bharatpur', shops: 2, revenue: 'Rs. 1.2L', growth: '+10%' },
  ];

  const metrics = [
    { label: 'Avg Order Value', value: 'Rs. 2,847', change: '+12.5%', trend: 'up', icon: DollarSign },
    { label: 'Total Orders', value: '1,556', change: '+8.2%', trend: 'up', icon: ShoppingCart },
    { label: 'Products Sold', value: '3,428', change: '+15.3%', trend: 'up', icon: Package },
    { label: 'Active Customers', value: '8,234', change: '+5.7%', trend: 'up', icon: Users },
  ];

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <metric.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <div className="mt-2 flex items-center gap-1">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">{data.month}</span>
                    <span className="font-medium">Rs. {(data.revenue / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-foreground transition-all"
                      style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span>{category.sales}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-foreground"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                  {category.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Active Shops</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Growth Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionalData.map((region, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{region.region}</TableCell>
                  <TableCell>{region.shops} shops</TableCell>
                  <TableCell className="font-medium">{region.revenue}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {region.growth}
                    </span>
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

export default Analytics;
