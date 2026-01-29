import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

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

  const [newShop, setNewShop] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
  });

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
    setShops(shops.map(shop => 
      shop.id === shopId ? { ...shop, status: newStatus } : shop
    ));
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search shops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={20} />
            Add Shop
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 font-medium">Active Shops</p>
          <p className="text-2xl font-bold text-green-700">{shops.filter(s => s.status === 'Active').length}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-yellow-600 font-medium">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-700">{shops.filter(s => s.status === 'Pending').length}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-sm text-red-600 font-medium">Inactive Shops</p>
          <p className="text-2xl font-bold text-red-700">{shops.filter(s => s.status === 'Inactive').length}</p>
        </div>
      </div>

      {/* Shops Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{shop.name}</div>
                      <div className="text-sm text-gray-500">Owner: {shop.owner}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{shop.email}</div>
                    <div className="text-sm text-gray-500">{shop.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{shop.products}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{shop.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shop.status)}`}>
                      {shop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye size={18} />
                      </button>
                      {shop.status === 'Pending' && (
                        <button 
                          onClick={() => handleStatusChange(shop.id, 'Active')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" 
                          title="Approve"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {shop.status === 'Active' && (
                        <button 
                          onClick={() => handleStatusChange(shop.id, 'Inactive')}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" 
                          title="Deactivate"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteShop(shop.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Shop Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Shop</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddShop} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                <input
                  type="text"
                  required
                  value={newShop.name}
                  onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  value={newShop.owner}
                  onChange={(e) => setNewShop({ ...newShop, owner: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newShop.email}
                  onChange={(e) => setNewShop({ ...newShop, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={newShop.phone}
                  onChange={(e) => setNewShop({ ...newShop, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopsManagement;
