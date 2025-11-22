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
import { Lock, DollarSign, Package, FileSpreadsheet, Eye, EyeOff, Download, Upload, Save, AlertTriangle, TrendingUp, TrendingDown, Minus, Plus } from 'lucide-react';
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
  const [editedStockQuantities, setEditedStockQuantities] = useState<Record<string, number>>({});
  const [editedStockStatuses, setEditedStockStatuses] = useState<Record<string, Product['stockStatus']>>({});

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
      ['SKU', 'Product Name', 'Category', 'Pack Size', 'Unit', 'Current Price', 'Stock Quantity', 'Stock Status'].join(','),
      ...products.map(p => [
        p.id,
        `"${p.name}"`,
        p.category,
        `"${p.packSize}"`,
        p.unit,
        p.price,
        p.stockQuantity || 0,
        p.stockStatus || 'in-stock',
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

  const handleStockQuantityChange = (productId: string, change: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const currentQuantity = editedStockQuantities[productId] ?? product.stockQuantity ?? 0;
    const newQuantity = Math.max(0, currentQuantity + change);

    setEditedStockQuantities(prev => ({ ...prev, [productId]: newQuantity }));

    // Auto-update stock status based on quantity
    let newStatus: Product['stockStatus'] = 'in-stock';
    if (newQuantity === 0) {
      newStatus = 'out-of-stock';
    } else if (newQuantity < 20) {
      newStatus = 'low-stock';
    }
    setEditedStockStatuses(prev => ({ ...prev, [productId]: newStatus }));
  };

  const handleSaveInventory = () => {
    let updatedCount = 0;

    Object.entries(editedStockQuantities).forEach(([productId, quantity]) => {
      const status = editedStockStatuses[productId];
      SuperEmpireDB.updateProduct(productId, {
        stockQuantity: quantity,
        stockStatus: status,
      });
      updatedCount++;
    });

    // Reload products
    const loadedProducts = SuperEmpireDB.getAllProducts();
    setProducts(loadedProducts);

    toast.success(`Updated inventory for ${updatedCount} products`, {
      description: 'Stock levels have been updated successfully',
    });

    setEditedStockQuantities({});
    setEditedStockStatuses({});
  };

  const getStockBadgeVariant = (status?: Product['stockStatus']) => {
    switch (status) {
      case 'in-stock':
        return 'default';
      case 'low-stock':
        return 'secondary';
      case 'out-of-stock':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const lowStockProducts = useMemo(() => {
    return products.filter(p => p.stockStatus === 'low-stock' || p.stockStatus === 'out-of-stock');
  }, [products]);

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

          {/* Inventory Management Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Inventory Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{products.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {products.filter(p => p.category === 'produce').length} produce • {products.filter(p => p.category === 'tortilla').length} tortilla
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    In Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {products.filter(p => p.stockStatus === 'in-stock').length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Available for sale</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    Low Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600">
                    {products.filter(p => p.stockStatus === 'low-stock').length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Needs restock soon</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    Out of Stock
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600">
                    {products.filter(p => p.stockStatus === 'out-of-stock').length}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
                    <AlertTriangle className="h-5 w-5" />
                    {lowStockProducts.length} Items Need Attention
                  </CardTitle>
                  <CardDescription>
                    These products are low or out of stock
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {lowStockProducts.slice(0, 10).map(p => (
                      <Badge key={p.id} variant={getStockBadgeVariant(p.stockStatus)}>
                        {p.name} ({p.stockQuantity || 0})
                      </Badge>
                    ))}
                    {lowStockProducts.length > 10 && (
                      <Badge variant="outline">+{lowStockProducts.length - 10} more</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inventory Management Table */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>
                  Adjust stock levels and monitor inventory status
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
                  {Object.keys(editedStockQuantities).length > 0 && (
                    <Button onClick={handleSaveInventory} className="bg-green-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save Inventory ({Object.keys(editedStockQuantities).length})
                    </Button>
                  )}
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Pack Size</TableHead>
                        <TableHead>Stock Status</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Adjust Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.slice(0, 50).map((product) => {
                        const currentStock = editedStockQuantities[product.id] ?? product.stockQuantity ?? 0;
                        const currentStatus = editedStockStatuses[product.id] ?? product.stockStatus ?? 'in-stock';
                        const hasChanges = editedStockQuantities[product.id] !== undefined;

                        return (
                          <TableRow
                            key={product.id}
                            className={hasChanges ? 'bg-green-50 dark:bg-green-900/20' : ''}
                          >
                            <TableCell>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.subcategory}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{product.category}</Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {product.packSize}
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStockBadgeVariant(currentStatus)}>
                                {currentStatus?.replace('-', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={`font-semibold ${
                                currentStock === 0 ? 'text-red-600' :
                                currentStock < 20 ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {currentStock} units
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleStockQuantityChange(product.id, -10)}
                                  className="h-8 w-8"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleStockQuantityChange(product.id, -1)}
                                  className="h-8 w-8"
                                >
                                  -1
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleStockQuantityChange(product.id, 1)}
                                  className="h-8 w-8"
                                >
                                  +1
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleStockQuantityChange(product.id, 10)}
                                  className="h-8 w-8"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatPrice(product.price)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
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
