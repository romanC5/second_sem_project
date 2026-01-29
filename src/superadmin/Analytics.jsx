import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <metric.icon size={20} className="text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {metric.trend === 'up' ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
              <span className={metric.trend === 'up' ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue</h3>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{data.month}</span>
                  <span className="font-medium text-gray-900">Rs. {(data.revenue / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full transition-all"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Categories</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{category.name}</span>
                    <span className="text-gray-900">{category.sales}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4">
                  {category.trend === 'up' ? (
                    <TrendingUp size={18} className="text-green-500" />
                  ) : (
                    <TrendingDown size={18} className="text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Regional Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active Shops</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {regionalData.map((region, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{region.region}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{region.shops} shops</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{region.revenue}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                      <TrendingUp size={14} />
                      {region.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
