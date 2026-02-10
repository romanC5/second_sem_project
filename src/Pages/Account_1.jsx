import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation } from '../services/dummyApi';
import {
  User, Mail, Phone, MapPin, Shield, Lock, LogOut, ChevronRight,
  Package, ShoppingBag, Heart, CreditCard, Settings, Store, LayoutDashboard
} from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Separator } from '@/Components/ui/separator';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/Components/ui/dialog';

const Account_1 = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '', phone: '',
    address: { street: '', city: '', state: '', zipCode: '' },
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');
  const { data: userData, isLoading, error: fetchError } = useGetMeQuery(undefined, { skip: !token });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  useEffect(() => {
    if (userData?.data) {
      setProfileForm({
        name: userData.data.name || '',
        phone: userData.data.phone || '',
        address: {
          street: userData.data.address?.street || '',
          city: userData.data.address?.city || '',
          state: userData.data.address?.state || '',
          zipCode: userData.data.address?.zipCode || '',
        },
      });
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.dispatchEvent(new Event('userInfoChanged'));
    navigate('/login_Signup', { replace: true });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      const result = await updateProfile(profileForm).unwrap();
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setActiveSection('overview');
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...profileForm }));
        window.dispatchEvent(new Event('userInfoChanged'));
      }
    } catch (err) {
      setError(err?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { setError('Passwords do not match'); return; }
    if (passwordForm.newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    try {
      const result = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      if (result.success) {
        setSuccess('Password changed successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => { setShowPasswordDialog(false); setSuccess(''); }, 1500);
      }
    } catch (err) {
      setError(err?.data?.message || 'Failed to change password');
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <User size={48} className="text-muted-foreground" />
        <p className="text-xl text-muted-foreground">You are not logged in.</p>
        <Button onClick={() => navigate('/login_Signup')}>Sign In</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading your account...</div>
      </div>
    );
  }

  if (fetchError || !userData?.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xl text-destructive">Failed to load account information</p>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>
    );
  }

  const user = userData.data;
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
  const roleBadgeVariant = user.role === 'superadmin' ? 'destructive' : user.role === 'shopkeeper' ? 'default' : 'secondary';
  const hasAddress = user.address?.street || user.address?.city;

  // Amazon-style quick-action tiles
  const quickActions = [
    { icon: Package, label: 'Your Orders', desc: 'Track, return, or buy things again', href: '/cart' },
    { icon: Lock, label: 'Login & Security', desc: 'Edit login, name, and mobile number', action: () => setActiveSection('security') },
    { icon: MapPin, label: 'Your Addresses', desc: 'Edit addresses for orders', action: () => setActiveSection('address') },
    { icon: CreditCard, label: 'Payment Options', desc: 'Edit or add payment methods', action: () => {} },
    ...(user.role === 'shopkeeper' ? [{ icon: Store, label: 'Seller Dashboard', desc: 'Manage your shop and products', href: '/admin' }] : []),
    ...(user.role === 'superadmin' ? [{ icon: LayoutDashboard, label: 'Super Admin', desc: 'Manage platform and shops', href: '/superadmin' }] : []),
  ];

  return (
    <div className="min-h-screen bg-muted/40 pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 space-y-6">

        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Your Account</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Hello, {user.name?.split(' ')[0]}</h1>
              <Badge variant={roleBadgeVariant} className="capitalize">{user.role}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>

        {/* Status messages */}
        {success && activeSection !== 'security' && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">{success}</div>
        )}
        {error && activeSection !== 'security' && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">{error}</div>
        )}

        {/* Overview — Quick Action Grid (Amazon style) */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((item) => {
              const Wrapper = item.href ? Link : 'button';
              const wrapperProps = item.href
                ? { to: item.href }
                : { onClick: item.action, type: 'button' };
              return (
                <Wrapper key={item.label} {...wrapperProps} className="text-left">
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                        <item.icon size={22} className="text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{item.label}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground mt-1 shrink-0" />
                    </CardContent>
                  </Card>
                </Wrapper>
              );
            })}
          </div>
        )}

        {/* Profile Overview Card (always visible) */}
        {activeSection === 'overview' && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Account Details</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveSection('edit')} className="gap-1.5 text-primary">
                  Edit <ChevronRight size={14} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted"><User size={16} className="text-muted-foreground" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="text-sm font-medium">{user.name || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted"><Mail size={16} className="text-muted-foreground" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted"><Phone size={16} className="text-muted-foreground" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted"><Shield size={16} className="text-muted-foreground" /></div>
                  <div>
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="text-sm font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              {hasAddress && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-muted mt-0.5"><MapPin size={16} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Default Address</p>
                      <p className="text-sm font-medium">
                        {[user.address?.street, user.address?.city, user.address?.state, user.address?.zipCode]
                          .filter(Boolean).join(', ') || 'No address saved'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Edit Profile Section */}
        {activeSection === 'edit' && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setActiveSection('overview'); setError(''); }}>
                  ← Back
                </Button>
                <div>
                  <CardTitle>Edit Your Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-5">
                {error && <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">{error}</div>}
                {success && <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">{success}</div>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input id="edit-name" value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled className="bg-muted" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input id="edit-phone" type="tel" value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} disabled className="bg-muted" />
                  </div>
                </div>

                <Separator />
                <h3 className="font-semibold text-sm">Address</h3>

                <div className="space-y-2">
                  <Label htmlFor="edit-street">Street Address</Label>
                  <Input id="edit-street" value={profileForm.address.street}
                    onChange={(e) => setProfileForm({ ...profileForm, address: { ...profileForm.address, street: e.target.value } })}
                    placeholder="Street address" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-city">City</Label>
                    <Input id="edit-city" value={profileForm.address.city}
                      onChange={(e) => setProfileForm({ ...profileForm, address: { ...profileForm.address, city: e.target.value } })}
                      placeholder="City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-state">State / Province</Label>
                    <Input id="edit-state" value={profileForm.address.state}
                      onChange={(e) => setProfileForm({ ...profileForm, address: { ...profileForm.address, state: e.target.value } })}
                      placeholder="State" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-zip">Zip Code</Label>
                    <Input id="edit-zip" value={profileForm.address.zipCode}
                      onChange={(e) => setProfileForm({ ...profileForm, address: { ...profileForm.address, zipCode: e.target.value } })}
                      placeholder="Zip code" />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1"
                    onClick={() => {
                      setActiveSection('overview'); setError('');
                      setProfileForm({
                        name: userData.data.name || '', phone: userData.data.phone || '',
                        address: {
                          street: userData.data.address?.street || '', city: userData.data.address?.city || '',
                          state: userData.data.address?.state || '', zipCode: userData.data.address?.zipCode || '',
                        },
                      });
                    }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isUpdating}>
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Address Section */}
        {activeSection === 'address' && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setActiveSection('overview')}>← Back</Button>
                <div>
                  <CardTitle>Your Addresses</CardTitle>
                  <CardDescription>Manage your saved addresses</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {hasAddress ? (
                <div className="border rounded-lg p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{user.name}</p>
                    <Badge variant="outline">Default</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.address?.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {[user.address?.city, user.address?.state, user.address?.zipCode].filter(Boolean).join(', ')}
                  </p>
                  {user.phone && <p className="text-sm text-muted-foreground">Phone: {user.phone}</p>}
                  <div className="pt-2">
                    <Button variant="link" size="sm" className="h-auto p-0 text-primary" onClick={() => setActiveSection('edit')}>
                      Edit this address
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin size={40} className="mx-auto text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground mb-3">No address saved yet.</p>
                  <Button onClick={() => setActiveSection('edit')}>Add Address</Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setActiveSection('overview'); setError(''); }}>← Back</Button>
                <div>
                  <CardTitle>Login & Security</CardTitle>
                  <CardDescription>Manage your login credentials</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-0 divide-y">
              <div className="flex items-center justify-between py-4">
                <div><p className="text-sm font-medium">Name</p><p className="text-sm text-muted-foreground">{user.name}</p></div>
                <Button variant="outline" size="sm" onClick={() => setActiveSection('edit')}>Edit</Button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div><p className="text-sm font-medium">Email</p><p className="text-sm text-muted-foreground">{user.email}</p></div>
                <Badge variant="secondary">Verified</Badge>
              </div>
              <div className="flex items-center justify-between py-4">
                <div><p className="text-sm font-medium">Phone</p><p className="text-sm text-muted-foreground">{user.phone || 'Not provided'}</p></div>
                <Button variant="outline" size="sm" onClick={() => setActiveSection('edit')}>Edit</Button>
              </div>
              <div className="flex items-center justify-between py-4">
                <div><p className="text-sm font-medium">Password</p><p className="text-sm text-muted-foreground">••••••••</p></div>
                <Button variant="outline" size="sm" onClick={() => { setShowPasswordDialog(true); setError(''); setSuccess(''); }}>
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={(open) => {
        setShowPasswordDialog(open);
        if (!open) { setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); setError(''); setSuccess(''); }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and a new password.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">{error}</div>}
            {success && <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">{success}</div>}
            <div className="space-y-2">
              <Label htmlFor="pw-current">Current Password</Label>
              <Input id="pw-current" type="password" required value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw-new">New Password</Label>
              <Input id="pw-new" type="password" required value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw-confirm">Confirm New Password</Label>
              <Input id="pw-confirm" type="password" required value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? 'Changing...' : 'Save Password'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Account_1;