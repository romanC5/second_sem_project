import React, { useState } from 'react';
import { Save, Globe, Bell, Shield, Database, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'Kinmel Marketplace',
    platformEmail: 'admin@kinmel.com',
    supportEmail: 'support@kinmel.com',
    commissionRate: '10',
    minOrderAmount: '500',
    taxRate: '13',
    enableRegistration: true,
    requireApproval: true,
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('System settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <Card>
          <CardContent className="p-1">
            <TabsList className="w-full justify-start h-auto p-1 gap-1">
              <TabsTrigger value="general" className="gap-2 px-4 py-2">
                <Globe className="h-4 w-4" /> General
              </TabsTrigger>
              <TabsTrigger value="commerce" className="gap-2 px-4 py-2">
                <Zap className="h-4 w-4" /> Commerce
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 px-4 py-2">
                <Bell className="h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 px-4 py-2">
                <Shield className="h-4 w-4" /> Security
              </TabsTrigger>
              <TabsTrigger value="database" className="gap-2 px-4 py-2">
                <Database className="h-4 w-4" /> Database
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>

        <form onSubmit={handleSave}>
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-2xl space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" value={settings.platformName} onChange={(e) => setSettings({ ...settings, platformName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platformEmail">Platform Email</Label>
                    <Input id="platformEmail" type="email" value={settings.platformEmail} onChange={(e) => setSettings({ ...settings, platformEmail: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input id="supportEmail" type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Enable to make the platform unavailable to users</p>
                    </div>
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                    />
                  </div>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commerce Settings */}
          <TabsContent value="commerce">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-2xl space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                      <Input id="commissionRate" type="number" value={settings.commissionRate} onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })} />
                      <p className="text-xs text-muted-foreground">Platform commission on each sale</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input id="taxRate" type="number" value={settings.taxRate} onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minOrderAmount">Min Order Amount (Rs.)</Label>
                      <Input id="minOrderAmount" type="number" value={settings.minOrderAmount} onChange={(e) => setSettings({ ...settings, minOrderAmount: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={settings.enableRegistration}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableRegistration: checked })}
                      />
                      <span className="text-sm font-medium">Allow New Shop Registration</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={settings.requireApproval}
                        onCheckedChange={(checked) => setSettings({ ...settings, requireApproval: checked })}
                      />
                      <span className="text-sm font-medium">Require Admin Approval for New Shops</span>
                    </label>
                  </div>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-2xl space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send email notifications for important events</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Send SMS for critical alerts</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-2xl space-y-6">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="mt-1 text-sm text-muted-foreground">Add an extra layer of security to super admin accounts</p>
                    <Button className="mt-4">Enable 2FA</Button>
                  </div>
                  <div className="space-y-2 rounded-lg border p-4">
                    <Label>Session Timeout</Label>
                    <Select defaultValue="30">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Settings */}
          <TabsContent value="database">
            <Card>
              <CardContent className="pt-6">
                <div className="max-w-2xl space-y-6">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Database Backup</h4>
                    <p className="mt-1 text-sm text-muted-foreground">Last backup: January 27, 2026 at 2:30 AM</p>
                    <Button className="mt-4" variant="outline">Backup Now</Button>
                  </div>
                  <div className="space-y-2 rounded-lg border p-4">
                    <Label>Auto Backup Schedule</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily at 2:00 AM</SelectItem>
                        <SelectItem value="12hours">Every 12 hours</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
