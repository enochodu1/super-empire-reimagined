// This file contains multiple advanced features in one consolidated page
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Truck, CloudRain, FileCheck, Scale, Package, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvancedFeatures = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold">Advanced Features Hub</h1>
          <p className="text-indigo-100">Access specialized tools and services</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="delivery">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-6">
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="weight">Catch Weight</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="sampling">Samples</TabsTrigger>
            <TabsTrigger value="dispute">Disputes</TabsTrigger>
            <TabsTrigger value="substitution">Substitutions</TabsTrigger>
          </TabsList>

          {/* Route Optimization & Delivery Tracking */}
          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-blue-600" />
                  <CardTitle>Route Optimization & Delivery Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h3 className="font-semibold mb-2">Active Deliveries</h3>
                    <div className="space-y-3">
                      {[1, 2].map(i => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded">
                          <div>
                            <p className="font-semibold">Order #ORD-{12340 + i}</p>
                            <p className="text-sm text-muted-foreground">ETA: 2:30 PM • 5.2 miles away</p>
                          </div>
                          <Badge className="bg-green-500">In Transit</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">View Live Map</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Catch Weight Handling */}
          <TabsContent value="weight">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Scale className="w-8 h-8 text-orange-600" />
                  <CardTitle>Catch Weight Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Products sold by estimated weight with actual weight reconciliation</p>
                <div className="space-y-3">
                  {['Whole Watermelons (~50lb)', 'Beef Brisket (~12lb)', 'Cheese Wheels (~8lb)'].map((item, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item}</span>
                        <Badge variant="outline">Estimated Weight</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weather Alerts */}
          <TabsContent value="weather">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CloudRain className="w-8 h-8 text-blue-600" />
                  <CardTitle>Weather Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border-l-4 border-yellow-500">
                    <p className="font-semibold">⚠️ Frost Warning - California</p>
                    <p className="text-sm">Potential impact on lettuce and leafy greens supply. Orders may be delayed.</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="font-semibold">🌤️ Fair Weather Forecast</p>
                    <p className="text-sm">Normal delivery schedules expected for the next 7 days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sampling Program */}
          <TabsContent value="sampling">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-purple-600" />
                  <CardTitle>Product Sampling Program</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Request free samples before placing bulk orders</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {['Organic Microgreens', 'Heirloom Tomato Variety Pack'].map((item, i) => (
                    <Card key={i}>
                      <CardContent className="pt-6">
                        <h4 className="font-semibold mb-2">{item}</h4>
                        <p className="text-sm text-muted-foreground mb-3">Available for sampling</p>
                        <Button className="w-full" size="sm">Request Sample</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dispute Resolution */}
          <TabsContent value="dispute">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileCheck className="w-8 h-8 text-red-600" />
                  <CardTitle>Dispute Resolution</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4">File New Claim</Button>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">Claim #CLM-001</p>
                        <p className="text-sm text-muted-foreground">Damaged produce in Order #ORD-12340</p>
                      </div>
                      <Badge className="bg-yellow-500">In Review</Badge>
                    </div>
                    <p className="text-sm">Filed: Nov 20, 2025 • Resolution expected: Nov 25</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Substitution Preferences */}
          <TabsContent value="substitution">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <UserCheck className="w-8 h-8 text-green-600" />
                  <CardTitle>Substitution Preferences</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Set rules for when items are unavailable</p>
                <div className="space-y-3">
                  {[
                    { original: 'Roma Tomatoes', substitute: 'Plum Tomatoes', action: 'Auto-substitute' },
                    { original: 'Iceberg Lettuce', substitute: 'Romaine Lettuce', action: 'Ask first' },
                  ].map((rule, i) => (
                    <div key={i} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{rule.original}</p>
                          <p className="text-sm text-muted-foreground">→ {rule.substitute}</p>
                        </div>
                        <Badge>{rule.action}</Badge>
                      </div>
                    </div>
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

export default AdvancedFeatures;
