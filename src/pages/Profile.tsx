import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, User, Package, Settings, LogOut, ShoppingCart, RotateCcw, Plus } from 'lucide-react';
import { db } from '@/lib/supabase';
import { SuperEmpireDB } from '@/lib/database';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function Profile() {
  const { user, profile, signOut, updateProfile, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    business_name: profile?.business_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state: profile?.state || '',
    zip: profile?.zip || '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        business_name: profile.business_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip: profile.zip || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await db.getOrders(user.id);
    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await updateProfile(formData);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleReorderAll = async (order: any) => {
    if (!order.order_items || order.order_items.length === 0) {
      toast.error('No items to reorder');
      return;
    }

    // Get all products from database
    const allProducts = SuperEmpireDB.getAllProducts();
    let addedCount = 0;

    // Add each item from the order to cart
    order.order_items.forEach((orderItem: any) => {
      const product = allProducts.find(p => p.id === orderItem.product_id);
      if (product) {
        addToCart(product, orderItem.quantity);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      toast.success(`Added ${addedCount} item${addedCount > 1 ? 's' : ''} to cart`, {
        description: 'Review your cart and checkout when ready',
        action: {
          label: 'View Cart',
          onClick: () => navigate('/cart'),
        },
      });
    } else {
      toast.error('Could not find products from this order');
    }
  };

  const handleAddItemToCart = (orderItem: any) => {
    const allProducts = SuperEmpireDB.getAllProducts();
    const product = allProducts.find(p => p.id === orderItem.product_id);

    if (product) {
      addToCart(product, orderItem.quantity);
      toast.success(`Added ${product.name} to cart`);
    } else {
      toast.error('Product not found');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your profile and view your order history
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Package className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              {/* Membership Info Card */}
              <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Member Since</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile?.created_at ? format(new Date(profile.created_at), 'MMMM yyyy') : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
                        {profile?.role === 'admin' ? '👑 Admin Account' : '✓ Verified Business'}
                      </Badge>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Account ID: {user?.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  {profile?.business_name && (
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Business:</strong> {profile.business_name}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details and business information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business_name">Business Name</Label>
                        <Input
                          id="business_name"
                          name="business_name"
                          value={formData.business_name}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={profile?.email || ''} disabled />
                      <p className="text-sm text-gray-500">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          disabled={loading}
                          maxLength={2}
                          placeholder="TX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View all your past orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        No orders yet
                      </p>
                      <Button onClick={() => navigate('/products')}>
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {format(new Date(order.created_at), 'MMM dd, yyyy')}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>

                          {/* Order Items List */}
                          {order.order_items && order.order_items.length > 0 && (
                            <div className="mb-4 space-y-2 border-t pt-3">
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Order Items:
                              </h4>
                              {order.order_items.map((item: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center text-sm py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded"
                                >
                                  <div className="flex-1">
                                    <span className="font-medium">{item.product_name}</span>
                                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                                      × {item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="font-semibold">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAddItemToCart(item)}
                                      className="h-7"
                                    >
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <Separator className="my-3" />

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Items:</span>
                              <span>{order.order_items?.length || 0} items</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Total:</span>
                              <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Delivery:</span>
                              <span>{order.delivery_city}, {order.delivery_state}</span>
                            </div>
                          </div>

                          <Separator className="my-3" />

                          {/* Quick Reorder Button */}
                          <Button
                            onClick={() => handleReorderAll(order)}
                            className="w-full"
                            variant="default"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reorder All Items
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Account Type</h3>
                    <Badge variant={profile?.role === 'admin' ? 'default' : 'secondary'}>
                      {profile?.role === 'admin' ? 'Administrator' : 'Customer'}
                    </Badge>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Account Actions</h3>
                    <Button
                      variant="destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
