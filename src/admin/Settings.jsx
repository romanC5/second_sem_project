import React, { useState } from 'react';
import { Save, Store, Bell, Lock, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const Settings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Kinmel Store',
    email: 'contact@kinmel.com',
    phone: '+977 9801234567',
    address: 'Kathmandu, Nepal',
    currency: 'NPR',
    taxRate: '13'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    customerMessages: true,
    marketingEmails: false
  });

  const handleSaveStore = (e) => {
    e.preventDefault();
    alert('Store settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="store" className="space-y-6">
        <Card>
          <CardContent className="p-1">
            <TabsList className="w-full justify-start h-auto p-1 gap-1">
              <TabsTrigger value="store" className="gap-2 px-4 py-2">
                <Store className="h-4 w-4" /> Store Details
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 px-4 py-2">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 px-4 py-2">
                <Lock className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="payments" className="gap-2 px-4 py-2">
                <CreditCard className="h-4 w-4" /> Payments
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>

        {/* Store Details Tab */}
        <TabsContent value="store">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSaveStore} className="max-w-2xl space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" value={storeSettings.storeName} onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={storeSettings.email} onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={storeSettings.phone} onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={storeSettings.address} onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={storeSettings.currency} onValueChange={(val) => setStoreSettings({ ...storeSettings, currency: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NPR">NPR - Nepalese Rupee</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input id="taxRate" type="number" value={storeSettings.taxRate} onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })} />
                  </div>
                </div>
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              <div className="max-w-2xl space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                      <p className="text-sm text-muted-foreground">Receive notifications for {key.toLowerCase()}</p>
                    </div>
                    <Switch checked={value} onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, [key]: checked })} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6">
              <div className="max-w-2xl space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <Card>
            <CardContent className="pt-6">
              <div className="max-w-2xl space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Payment Methods</h3>
                  <div className="space-y-3">
                    {['Cash on Delivery', 'eSewa', 'Khalti', 'Bank Transfer'].map((method, i) => (
                      <label key={method} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 transition-colors">
                        <Checkbox defaultChecked={i < 2} />
                        <span className="text-sm font-medium">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
