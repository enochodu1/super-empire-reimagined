import { useState } from 'react';
import { ArrowLeft, Bell, DollarSign, TrendingDown, Package, AlertCircle, TestTube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { notificationService } from '@/services/notificationService';
import { useAuth } from '@/contexts/AuthContext';

interface PriceAlert {
  id: string;
  product: string;
  currentPrice: number;
  targetPrice: number;
  condition: 'below' | 'above';
  active: boolean;
}

const NotificationPreferences = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [priceDropAlerts, setPriceDropAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [newProductAlerts, setNewProductAlerts] = useState(false);

  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    { id: '1', product: 'Roma Tomatoes', currentPrice: 1.25, targetPrice: 1.00, condition: 'below', active: true },
    { id: '2', product: 'Organic Spinach', currentPrice: 3.00, targetPrice: 2.50, condition: 'below', active: true },
  ]);

  const [newAlert, setNewAlert] = useState({
    product: '',
    targetPrice: '',
    condition: 'below' as 'below' | 'above',
  });

  const handleSavePreferences = () => {
    toast.success('Notification preferences saved!');
  };

  const handleAddPriceAlert = () => {
    if (!newAlert.product || !newAlert.targetPrice) {
      toast.error('Please fill in all fields');
      return;
    }

    const alert: PriceAlert = {
      id: Date.now().toString(),
      product: newAlert.product,
      currentPrice: 0, // Would fetch from API
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      active: true,
    };

    setPriceAlerts([...priceAlerts, alert]);
    setNewAlert({ product: '', targetPrice: '', condition: 'below' });
    toast.success('Price alert created!');
  };

  const toggleAlert = (id: string) => {
    setPriceAlerts(priceAlerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== id));
    toast.success('Price alert deleted');
  };

  // Demo notification generators
  const sendDemoPriceAlert = () => {
    if (!user?.id) {
      toast.error('Please sign in to test notifications');
      return;
    }

    notificationService.createNotification({
      userId: user.id,
      type: 'price_alert',
      title: 'Price Alert: Roma Tomatoes',
      message: 'Roma Tomatoes dropped to $0.95/lb - 24% below your target price!',
      read: false,
    });

    toast.success('Demo notification created!', {
      description: 'Check the notification bell icon in the navigation bar',
    });
  };

  const sendDemoStockAlert = () => {
    if (!user?.id) {
      toast.error('Please sign in to test notifications');
      return;
    }

    notificationService.createNotification({
      userId: user.id,
      type: 'stock_alert',
      title: 'Back in Stock!',
      message: 'Organic Spinach is now available - 150 units in stock',
      read: false,
    });

    toast.success('Demo notification created!');
  };

  const sendDemoOrderUpdate = () => {
    if (!user?.id) {
      toast.error('Please sign in to test notifications');
      return;
    }

    notificationService.createNotification({
      userId: user.id,
      type: 'order_update',
      title: 'Order Shipped!',
      message: 'Order #SEP-12345678 has been shipped and is on its way',
      read: false,
    });

    toast.success('Demo notification created!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <Bell className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Notification Preferences</h1>
              <p className="text-blue-100">Manage price alerts and notification settings</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* General Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>General Notifications</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive text message alerts</p>
              </div>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Alert Types */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Alert Types</CardTitle>
            <CardDescription>Select which alerts you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-green-600" />
                <div className="space-y-0.5">
                  <Label>Price Drop Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when prices decrease</p>
                </div>
              </div>
              <Switch checked={priceDropAlerts} onCheckedChange={setPriceDropAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div className="space-y-0.5">
                  <Label>Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Be notified when items are back in stock</p>
                </div>
              </div>
              <Switch checked={stockAlerts} onCheckedChange={setStockAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600" />
                <div className="space-y-0.5">
                  <Label>Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Track order status changes</p>
                </div>
              </div>
              <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                <div className="space-y-0.5">
                  <Label>New Product Alerts</Label>
                  <p className="text-sm text-muted-foreground">Discover new products as they're added</p>
                </div>
              </div>
              <Switch checked={newProductAlerts} onCheckedChange={setNewProductAlerts} />
            </div>
          </CardContent>
        </Card>

        {/* Price Alerts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Price Alerts</CardTitle>
            <CardDescription>Set custom price alerts for specific products</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add New Alert */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-3">Create New Price Alert</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    value={newAlert.product}
                    onChange={(e) => setNewAlert({ ...newAlert, product: e.target.value })}
                    placeholder="Roma Tomatoes"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newAlert.targetPrice}
                    onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                    placeholder="1.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Button
                    variant={newAlert.condition === 'below' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setNewAlert({ ...newAlert, condition: newAlert.condition === 'below' ? 'above' : 'below' })}
                  >
                    {newAlert.condition === 'below' ? '≤ Below' : '≥ Above'}
                  </Button>
                </div>
              </div>
              <Button onClick={handleAddPriceAlert} className="mt-3 w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Create Alert
              </Button>
            </div>

            {/* Active Alerts */}
            <div className="space-y-3">
              <h4 className="font-semibold">Active Price Alerts</h4>
              {priceAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold">{alert.product}</h5>
                      {alert.active ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline">Paused</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Alert me when price is {alert.condition} ${alert.targetPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={alert.active}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Notification Tester */}
        <Card className="mb-6 border-dashed border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-purple-600" />
              Test Notifications
            </CardTitle>
            <CardDescription>
              Try out different notification types to see how they work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={sendDemoPriceAlert}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <TrendingDown className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold">Price Alert</div>
                  <div className="text-xs text-muted-foreground">Test price drop</div>
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={sendDemoStockAlert}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <Package className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-semibold">Stock Alert</div>
                  <div className="text-xs text-muted-foreground">Test restock</div>
                </div>
              </Button>

              <Button
                variant="outline"
                onClick={sendDemoOrderUpdate}
                className="flex flex-col items-center gap-2 h-auto py-4"
              >
                <Package className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold">Order Update</div>
                  <div className="text-xs text-muted-foreground">Test shipping</div>
                </div>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              Click any button to generate a demo notification. Check the bell icon in the navigation bar!
            </p>
          </CardContent>
        </Card>

        <Button onClick={handleSavePreferences} className="w-full" size="lg">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
