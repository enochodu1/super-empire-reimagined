import { useState } from 'react';
import { ArrowLeft, Package, Plus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unit: string;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

const InventoryManagement = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Roma Tomatoes',
      category: 'Vegetables',
      sku: 'VEG-001',
      quantity: 500,
      unit: 'LBS',
      price: 1.25,
      status: 'in-stock',
      lastUpdated: '2025-11-20',
    },
    {
      id: '2',
      name: 'Iceberg Lettuce',
      category: 'Vegetables',
      sku: 'VEG-002',
      quantity: 50,
      unit: 'Heads',
      price: 0.85,
      status: 'low-stock',
      lastUpdated: '2025-11-21',
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    sku: '',
    quantity: '',
    unit: '',
    price: '',
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.category || !newProduct.sku || !newProduct.quantity || !newProduct.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const quantity = parseInt(newProduct.quantity);
    const status = quantity === 0 ? 'out-of-stock' : quantity < 100 ? 'low-stock' : 'in-stock';

    const product: InventoryItem = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      sku: newProduct.sku,
      quantity: quantity,
      unit: newProduct.unit || 'LBS',
      price: parseFloat(newProduct.price),
      status,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setInventory([...inventory, product]);
    setNewProduct({ name: '', category: '', sku: '', quantity: '', unit: '', price: '' });
    toast.success('Product added successfully!');
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const status = newQuantity === 0 ? 'out-of-stock' : newQuantity < 100 ? 'low-stock' : 'in-stock';
        return {
          ...item,
          quantity: newQuantity,
          status,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    }));
    toast.success('Quantity updated successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast.success('Product deleted successfully!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Badge className="bg-green-500">In Stock</Badge>;
      case 'low-stock':
        return <Badge className="bg-yellow-500">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge className="bg-red-500">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </Link>
          <div className="flex items-center gap-4">
            <Package className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Inventory Management</h1>
              <p className="text-green-100">Manage your products and stock levels</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="view">View Stock</TabsTrigger>
            <TabsTrigger value="add">Add Product</TabsTrigger>
            <TabsTrigger value="update">Update Stock</TabsTrigger>
          </TabsList>

          {/* View Current Stock */}
          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Current Inventory</CardTitle>
                <CardDescription>View all products and their stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProduct(item.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Summary Stats */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Products
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{inventory.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Low Stock Items
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">
                        {inventory.filter(i => i.status === 'low-stock').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Out of Stock
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        {inventory.filter(i => i.status === 'out-of-stock').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add New Product */}
          <TabsContent value="add">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Add a new product to your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="e.g., Roma Tomatoes"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Vegetables">Vegetables</SelectItem>
                          <SelectItem value="Fruits">Fruits</SelectItem>
                          <SelectItem value="Herbs">Herbs</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU *</Label>
                      <Input
                        id="sku"
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                        placeholder="e.g., VEG-001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        value={newProduct.unit}
                        onValueChange={(value) => setNewProduct({ ...newProduct, unit: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LBS">LBS</SelectItem>
                          <SelectItem value="CT">Count</SelectItem>
                          <SelectItem value="Heads">Heads</SelectItem>
                          <SelectItem value="Bunches">Bunches</SelectItem>
                          <SelectItem value="Cases">Cases</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Initial Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                        placeholder="e.g., 500"
                        min="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Unit *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="e.g., 1.25"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Update Inventory */}
          <TabsContent value="update">
            <Card>
              <CardHeader>
                <CardTitle>Update Stock Levels</CardTitle>
                <CardDescription>Adjust quantities for existing products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{item.name}</h3>
                              {getStatusBadge(item.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              SKU: {item.sku} • Current: {item.quantity} {item.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              className="w-32"
                              defaultValue={item.quantity}
                              min="0"
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 0;
                                handleUpdateQuantity(item.id, newQuantity);
                              }}
                            />
                            <span className="text-sm text-muted-foreground">{item.unit}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InventoryManagement;
