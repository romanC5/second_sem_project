import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  LogOut,
  ChevronDown,
  Shield,
  Users,
  Package
} from 'lucide-react';

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/superadmin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/superadmin/shops', icon: Store, label: 'Shops Management' },
    { path: '/superadmin/shopkeepers', icon: Users, label: 'Shopkeepers' },
    { path: '/superadmin/all-products', icon: Package, label: 'All Products' },
    { path: '/superadmin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/superadmin/settings', icon: Settings, label: 'System Settings' },
  ];

  const isActive = (path) => {
    if (path === '/superadmin') {
      return location.pathname === '/superadmin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-purple-900 to-purple-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-purple-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="text-yellow-400" size={24} />
              <h1 className="text-xl font-bold">Super Admin</h1>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-purple-700 rounded-lg"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'bg-yellow-500 text-purple-900 font-semibold' 
                  : 'hover:bg-purple-700 text-purple-100'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-700">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-700 text-purple-100 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => isActive(item.path))?.label || 'Super Admin Panel'}
            </h2>
            <p className="text-sm text-gray-500">Manage all shops and system settings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg">
              <Shield size={18} />
              <span className="font-medium">Super Admin</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
