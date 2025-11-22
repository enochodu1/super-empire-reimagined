import { useState } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Package, Download, Calendar, History, Bell, RotateCcw, FileText, MapPin, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PurchaseOrder {
  id: string;
  date: string;
  items: number;
  total: number;
  status: 'delivered' | 'pending' | 'processing';
  invoiceUrl?: string;
}

interface PriceTrend {
  product: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
}

const BuyerDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const navigate = useNavigate();

  const purchases: PurchaseOrder[] = [
    { id: 'PO-2025-001', date: '2025-11-20', items: 15, total: 342.50, status: 'delivered' },
    { id: 'PO-2025-002', date: '2025-11-18', items: 8, total: 189.75, status: 'delivered' },
    { id: 'PO-2025-003', date: '2025-11-15', items: 22, total: 567.80, status: 'processing' },
    { id: 'PO-2025-004', date: '2025-11-12', items: 12, total: 298.40, status: 'delivered' },
    { id: 'PO-2025-005', date: '2025-11-10', items: 18, total: 425.90, status: 'delivered' },
  ];

  const pricingTrends: PriceTrend[] = [
    { product: 'Roma Tomatoes', currentPrice: 1.25, previousPrice: 1.35, change: -7.4 },
    { product: 'Iceberg Lettuce', currentPrice: 0.85, previousPrice: 0.80, change: 6.3 },
    { product: 'Red Bell Peppers', currentPrice: 2.10, previousPrice: 2.25, change: -6.7 },
    { product: 'Yellow Onions', currentPrice: 0.65, previousPrice: 0.65, change: 0 },
  ];

  const totalSpent = purchases.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = totalSpent / purchases.length;
  const totalOrders = purchases.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-red-500';
    if (change < 0) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Main Site</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-xl">
              BD
            </div>
            <div>
              <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
              <p className="text-blue-100">Track your orders, spending, and pricing analytics</p>
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

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                +5.2% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Explore new features to streamline your ordering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/order-history')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <History className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold">Quick Reorder</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reorder from your purchase history with one click
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    View History
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/notifications')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Bell className="w-8 h-8 text-orange-600" />
                    <h3 className="font-semibold">Price Alerts</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get notified when prices drop on your favorite items
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Manage Alerts
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/standing-orders')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <RotateCcw className="w-8 h-8 text-green-600" />
                    <h3 className="font-semibold">Standing Orders</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set up automatic recurring orders for essentials
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Setup Orders
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/documents')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-8 h-8 text-teal-600" />
                    <h3 className="font-semibold">Documents</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Access spec sheets and certification documents
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    View Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/multi-location')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-8 h-8 text-purple-600" />
                    <h3 className="font-semibold">Multi-Location</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manage orders across all your locations
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Manage Locations
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/advanced-features')}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-8 h-8 text-yellow-600" />
                    <h3 className="font-semibold">Advanced Tools</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Delivery tracking, catch weight, weather alerts & more
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Explore Tools
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="orders">Purchase History</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Analytics</TabsTrigger>
            <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
          </TabsList>

          {/* Purchase History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>View your past orders and download invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {purchases.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items} items</TableCell>
                          <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Invoice
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Spending Insights
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Your spending has increased by 12.5% compared to the previous period</li>
                    <li>• Average order value is ${avgOrderValue.toFixed(2)}</li>
                    <li>• Most frequently ordered: Fresh Vegetables (45%)</li>
                    <li>• Recommended: Consider bulk orders for better pricing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Analytics Tab */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Analytics</CardTitle>
                <CardDescription>Track price changes on your frequently ordered products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingTrends.map((trend, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{trend.product}</h3>
                            <p className="text-sm text-muted-foreground">
                              Previous: ${trend.previousPrice.toFixed(2)}/LB
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              ${trend.currentPrice.toFixed(2)}
                              <span className="text-sm text-muted-foreground">/LB</span>
                            </div>
                            <div className={`text-sm font-semibold ${getPriceChangeColor(trend.change)}`}>
                              {trend.change > 0 ? '+' : ''}
                              {trend.change.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-semibold mb-2">Price Alerts</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Roma Tomatoes decreased by 7.4% - Great time to stock up!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order Tracking Tab */}
          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle>Active Order Tracking</CardTitle>
                <CardDescription>Track the status of your current orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchases.filter(p => p.status === 'processing' || p.status === 'pending').map((order) => (
                    <Card key={order.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {order.date}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                              ✓
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Order Placed</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">Processing</p>
                              <p className="text-sm text-muted-foreground">Estimated completion: Today</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <Package className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-muted-foreground">Ready for Pickup</p>
                              <p className="text-sm text-muted-foreground">Pending</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {purchases.filter(p => p.status === 'processing' || p.status === 'pending').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No active orders to track</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;
