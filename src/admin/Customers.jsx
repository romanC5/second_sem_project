import React, { useState } from 'react';
import { Search, Mail, Phone, MoreVertical } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+977 9801234567', orders: 12, totalSpent: 45000, joinDate: '2025-06-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+977 9807654321', orders: 8, totalSpent: 32000, joinDate: '2025-07-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+977 9812345678', orders: 5, totalSpent: 18500, joinDate: '2025-08-10', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+977 9823456789', orders: 15, totalSpent: 67000, joinDate: '2025-05-01', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+977 9834567890', orders: 3, totalSpent: 12000, joinDate: '2025-09-25', status: 'Active' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', phone: '+977 9845678901', orders: 20, totalSpent: 89000, joinDate: '2025-04-12', status: 'Active' },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Customers</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Active Customers</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{customers.filter(c => c.status === 'Active').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">Rs. {customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreVertical size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>{customer.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Orders</p>
                <p className="text-lg font-semibold text-gray-900">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Spent</p>
                <p className="text-lg font-semibold text-gray-900">Rs. {customer.totalSpent.toLocaleString()}</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">Joined: {customer.joinDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
