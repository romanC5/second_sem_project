import React from 'react';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  // Dummy data for dashboard
  const stats = [
    { 
      label: 'Total Revenue', 
      value: 'Rs. 45,231', 
      change: '+20.1%', 
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      label: 'Orders', 
      value: '156', 
      change: '+12.5%', 
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    { 
      label: 'Products', 
      value: '89', 
      change: '+5.2%', 
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    { 
      label: 'Customers', 
      value: '1,234', 
      change: '-2.4%', 
      trend: 'down',
      icon: Users,
      color: 'bg-orange-500'
    },
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', product: 'Wireless Headphones', amount: 'Rs. 2,500', status: 'Delivered' },
    { id: '#ORD002', customer: 'Jane Smith', product: 'Smart Watch', amount: 'Rs. 5,000', status: 'Pending' },
    { id: '#ORD003', customer: 'Mike Johnson', product: 'Laptop Stand', amount: 'Rs. 1,200', status: 'Processing' },
    { id: '#ORD004', customer: 'Sarah Wilson', product: 'USB-C Hub', amount: 'Rs. 3,500', status: 'Shipped' },
    { id: '#ORD005', customer: 'Tom Brown', product: 'Mechanical Keyboard', amount: 'Rs. 8,000', status: 'Delivered' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-400 text-sm">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
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

export default Dashboard;
