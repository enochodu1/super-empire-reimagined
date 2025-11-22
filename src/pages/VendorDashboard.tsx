import { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Package, ShoppingCart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface SalesData {
  product: string;
  sku: string;
  unitsSold: number;
  revenue: number;
  trend: number;
}

interface InventoryAlert {
  product: string;
  sku: string;
  currentStock: number;
  threshold: number;
  status: 'critical' | 'warning' | 'ok';
}

const VendorDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');

  const salesData: SalesData[] = [
    { product: 'Roma Tomatoes', sku: 'VEG-001', unitsSold: 1250, revenue: 1562.50, trend: 15.2 },
    { product: 'Iceberg Lettuce', sku: 'VEG-002', unitsSold: 850, revenue: 722.50, trend: -5.3 },
    { product: 'Red Bell Peppers', sku: 'VEG-003', unitsSold: 620, revenue: 1302.00, trend: 8.7 },
    { product: 'Yellow Onions', sku: 'VEG-004', unitsSold: 2100, revenue: 1365.00, trend: 22.1 },
  ];

  const inventoryAlerts: InventoryAlert[] = [
    { product: 'Iceberg Lettuce', sku: 'VEG-002', currentStock: 50, threshold: 100, status: 'warning' },
    { product: 'Red Bell Peppers', sku: 'VEG-003', currentStock: 15, threshold: 100, status: 'critical' },
  ];

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnitsSold = salesData.reduce((sum, item) => sum + item.unitsSold, 0);
  const avgRevenuePerProduct = totalRevenue / salesData.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Warning</Badge>;
      case 'ok':
        return <Badge className="bg-green-500">OK</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-500';
    if (trend < 0) return 'text-red-500';
    return 'text-gray-500';
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
            <div className="w-12 h-12 bg-white text-green-700 rounded-full flex items-center justify-center font-bold text-xl">
              VD
            </div>
            <div>
              <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
              <p className="text-green-100">Monitor your sales, inventory, and performance</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Inventory Alerts Banner */}
        {inventoryAlerts.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-semibold text-yellow-800">
                  {inventoryAlerts.length} Low Stock Alert{inventoryAlerts.length > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-yellow-700">
                  Some products need restocking. Check the Inventory tab for details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +18.2% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnitsSold.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Revenue/Product</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgRevenuePerProduct.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +5.7% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesData.length}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Charts</TabsTrigger>
          </TabsList>

          {/* Sales Analytics Tab */}
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Track sales and trends for your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Units Sold</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salesData.map((item) => (
                        <TableRow key={item.sku}>
                          <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                          <TableCell className="font-medium">{item.product}</TableCell>
                          <TableCell>{item.unitsSold.toLocaleString()}</TableCell>
                          <TableCell className="font-semibold">${item.revenue.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`font-semibold ${getTrendColor(item.trend)}`}>
                              {item.trend > 0 ? '+' : ''}
                              {item.trend.toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Sales Insights
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Yellow Onions showing strongest growth at +22.1%</li>
                    <li>• Roma Tomatoes are your top revenue generator</li>
                    <li>• Iceberg Lettuce sales declining by 5.3% - consider promotion</li>
                    <li>• Overall sales up 12.5% compared to previous period</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Overview Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Monitor stock levels and receive alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryAlerts.map((alert, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{alert.product}</h3>
                            <p className="text-sm text-muted-foreground">SKU: {alert.sku}</p>
                          </div>
                          {getStatusBadge(alert.status)}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Stock</span>
                            <span className="font-semibold">{alert.currentStock} units</span>
                          </div>
                          <Progress
                            value={(alert.currentStock / alert.threshold) * 100}
                            className="h-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Threshold: {alert.threshold} units</span>
                            <span>{((alert.currentStock / alert.threshold) * 100).toFixed(0)}% of threshold</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {inventoryAlerts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>All products are well-stocked</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Products
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{salesData.length}</div>
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
                        {inventoryAlerts.filter(a => a.status === 'warning').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Critical Stock
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        {inventoryAlerts.filter(a => a.status === 'critical').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Charts Tab */}
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Analyze your revenue by product and category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {salesData.map((item) => {
                    const revenuePercentage = (item.revenue / totalRevenue) * 100;
                    return (
                      <div key={item.sku}>
                        <div className="flex justify-between mb-2">
                          <div>
                            <span className="font-medium">{item.product}</span>
                            <span className="text-sm text-muted-foreground ml-2">({item.sku})</span>
                          </div>
                          <span className="font-semibold">${item.revenue.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={revenuePercentage} className="flex-1 h-3" />
                          <span className="text-sm text-muted-foreground w-12">
                            {revenuePercentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-4 text-lg">Revenue Summary</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Top Product</p>
                      <p className="text-2xl font-bold">
                        {salesData.reduce((max, item) => item.revenue > max.revenue ? item : max).product}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Order Value</p>
                      <p className="text-2xl font-bold">${avgRevenuePerProduct.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="text-2xl font-bold text-green-600">+18.2%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
