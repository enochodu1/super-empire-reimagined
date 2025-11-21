import { useState, useMemo, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Product, Order } from '@/types/product';
import { SuperEmpireDB } from '@/lib/database';
import { COMPANY_INFO } from '@/lib/companyInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, DollarSign, Package, FileSpreadsheet, Eye, EyeOff, Download, Upload, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Load products and orders from database
  useEffect(() => {
    if (isAuthenticated) {
      const loadedProducts = SuperEmpireDB.getAllProducts();
      setProducts(loadedProducts);

      const loadedOrders = SuperEmpireDB.getAllOrders();
      setOrders(loadedOrders);
    }
  }, [isAuthenticated]);

  // Simple authentication (in production, use proper backend auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, use proper auth)
    if (password === 'superempire2024' || password === 'admin') {
      setIsAuthenticated(true);
      toast.success('Successfully logged in');
    } else {
      toast.error('Invalid password');
    }
  };

  const handlePriceChange = (productId: string, newPrice: string) => {
    const price = parseFloat(newPrice);
    if (!isNaN(price) && price >= 0) {
      setEditedPrices(prev => ({ ...prev, [productId]: price }));
    }
  };

  const handleSavePrices = () => {
    const updatedCount = SuperEmpireDB.updateMultiplePrices(editedPrices);

    // Reload products to reflect changes
    const loadedProducts = SuperEmpireDB.getAllProducts();
    setProducts(loadedProducts);

    toast.success(`Updated prices for ${updatedCount} products`, {
      description: 'Price changes have been saved with history tracking',
    });
    setEditedPrices({});
  };

  const handleExportCSV = () => {
    const csv = [
      ['SKU', 'Product Name', 'Category', 'Pack Size', 'Unit', 'Current Price'].join(','),
      ...products.map(p => [
        p.id,
        `"${p.name}"`,
        p.category,
        `"${p.packSize}"`,
        p.unit,
        p.price,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `super-empire-products-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Product list exported successfully');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.id.toLowerCase().includes(lowerQuery) ||
      p.subcategory?.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription>
              Enter password to access the admin panel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" size="lg">
                <Lock className="h-4 w-4 mr-2" />
                Login to Admin Panel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage products, prices, and orders</p>
        </div>

        <Tabs defaultValue="prices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="prices">
              <DollarSign className="h-4 w-4 mr-2" />
              Price Management
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Orders ({orders.length})
            </TabsTrigger>
          </TabsList>

          {/* Price Management Tab */}
          <TabsContent value="prices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Update Product Prices</CardTitle>
                <CardDescription>
                  Modify prices for products. Changes are highlighted in green.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleExportCSV} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  {Object.keys(editedPrices).length > 0 && (
                    <Button onClick={handleSavePrices} className="bg-green-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes ({Object.keys(editedPrices).length})
                    </Button>
                  )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Pack Size</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>New Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.slice(0, 50).map((product) => (
                        <TableRow
                          key={product.id}
                          className={editedPrices[product.id] ? 'bg-green-50' : ''}
                        >
                          <TableCell className="font-mono text-sm">{product.id}</TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {product.packSize}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatPrice(product.price)}
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder={product.price.toString()}
                              value={editedPrices[product.id] || ''}
                              onChange={(e) => handlePriceChange(product.id, e.target.value)}
                              className="w-28"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredProducts.length > 50 && (
                  <p className="text-sm text-gray-600 text-center">
                    Showing 50 of {filteredProducts.length} products. Use search to find specific items.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Overview Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{allProducts.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Produce Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">
                    {allProducts.filter(p => p.category === 'produce').length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tortilla Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">
                    {allProducts.filter(p => p.category === 'tortilla').length}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-gray-600 py-12">
                    No orders yet. Orders will appear here when customers place them.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg">
                                Order #{order.orderNumber}
                              </CardTitle>
                              <CardDescription>{order.customerName}</CardDescription>
                            </div>
                            <Badge>{order.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Email:</span>
                              <p className="font-medium">{order.customerEmail}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Phone:</span>
                              <p className="font-medium">{order.customerPhone}</p>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-600">Delivery Address:</span>
                              <p className="font-medium">{order.deliveryAddress}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Items:</span>
                              <p className="font-medium">{order.items.length} products</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Total:</span>
                              <p className="font-medium text-green-600">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                          </div>
                          {order.notes && (
                            <>
                              <Separator />
                              <div>
                                <span className="text-gray-600 text-sm">Notes:</span>
                                <p className="text-sm">{order.notes}</p>
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
