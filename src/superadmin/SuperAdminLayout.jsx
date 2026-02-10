import React, { useState } from 'react';
import { Link, Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronDown,
  Shield,
  Users,
  Package,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Auth guard: redirect to login if no token or wrong role
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  
  if (!token || !userInfo) {
    return <Navigate to="/login_Signup" replace />;
  }
  
  if (userInfo.role !== 'superadmin') {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.dispatchEvent(new Event('userInfoChanged'));
    navigate('/login_Signup', { replace: true });
  };

  const menuItems = [
    { path: '/superadmin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/superadmin/shops', icon: Store, label: 'Shops Management' },
    { path: '/superadmin/shopkeepers', icon: Users, label: 'Shopkeepers' },
    { path: '/superadmin/all-products', icon: Package, label: 'All Products' },
    { path: '/superadmin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/superadmin/settings', icon: Settings, label: 'System Settings' },
  ];

  const isActive = (path) => {
    if (path === '/superadmin') return location.pathname === '/superadmin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r bg-sidebar transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-lg font-semibold tracking-tight">Super Admin</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8"
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  !sidebarOpen && 'justify-center px-2'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t p-3">
          <Link to="/">
            <Button variant="ghost" className={cn('w-full justify-start gap-3 text-muted-foreground', !sidebarOpen && 'justify-center px-2')}>
              <LogOut className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>Back to Store</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-14 items-center justify-between border-b bg-background px-6">
          <div>
            <h2 className="text-lg font-semibold">
              {menuItems.find((item) => isActive(item.path))?.label || 'Super Admin Panel'}
            </h2>
            <p className="text-xs text-muted-foreground">Manage all shops and system settings</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Super Admin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>System Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
