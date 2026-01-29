import React from 'react';
import { Store, Users, Package, DollarSign, TrendingUp, Activity, ShoppingBag } from 'lucide-react';

const SuperAdminDashboard = () => {
  const stats = [
    { 
      label: 'Total Shops', 
      value: '24', 
      change: '+3 this month', 
      trend: 'up',
      icon: Store,
      color: 'bg-blue-500'
    },
    { 
      label: 'Total Shopkeepers', 
      value: '32', 
      change: '+5 this month', 
      trend: 'up',
      icon: Users,
      color: 'bg-green-500'
    },
    { 
      label: 'All Products', 
      value: '2,458', 
      change: '+156 this week', 
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    { 
      label: 'Total Revenue', 
      value: 'Rs. 12.5L', 
      change: '+18.2%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    { 
      label: 'Active Orders', 
      value: '543', 
      change: '+28 today', 
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-orange-500'
    },
    { 
      label: 'Platform Users', 
      value: '15,234', 
      change: '+234 this week', 
      trend: 'up',
      icon: Activity,
      color: 'bg-pink-500'
    },
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
      case 'shop': return <Store size={16} className="text-blue-500" />;
      case 'product': return <Package size={16} className="text-purple-500" />;
      case 'order': return <ShoppingBag size={16} className="text-orange-500" />;
      case 'user': return <Users size={16} className="text-green-500" />;
      case 'payment': return <DollarSign size={16} className="text-yellow-500" />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp size={14} className="text-green-500" />
                  <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-xl`}>
                <stat.icon size={28} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Shops */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Shops</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topShops.map((shop) => (
                  <tr key={shop.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{shop.name}</div>
                        <div className="text-sm text-gray-500">{shop.owner}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shop.products}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{shop.orders}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{shop.revenue}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        shop.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {shop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.shop}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
