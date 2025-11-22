import { ArrowLeft, MapPin, Plus, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MultiLocationManagement = () => {
  const locations = [
    { id: '1', name: 'Downtown Restaurant', address: '123 Main St, Richmond, VA', type: 'restaurant', orders: 42, spend: 12500 },
    { id: '2', name: 'Westend Location', address: '456 West Ave, Richmond, VA', type: 'restaurant', orders: 38, spend: 10200 },
    { id: '3', name: 'Catering Kitchen', address: '789 Commerce Rd, Richmond, VA', type: 'catering', orders: 25, spend: 8500 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-purple-700 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold">Multi-Location Management</h1>
          <p className="text-purple-100">Manage orders across all your locations</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Locations</h2>
            <p className="text-muted-foreground">3 active locations</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Building className="w-8 h-8 text-purple-600" />
                  <Badge>{location.type}</Badge>
                </div>
                <CardTitle className="mt-3">{location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{location.address}</span>
                  </div>
                  <div className="pt-3 border-t space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Orders</span>
                      <span className="font-semibold">{location.orders}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Spend</span>
                      <span className="font-semibold">${location.spend.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    Manage Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">All Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Consolidated Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Locations</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Combined Orders</p>
                    <p className="text-2xl font-bold">105</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spend</p>
                    <p className="text-2xl font-bold">$31,200</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Order Value</p>
                    <p className="text-2xl font-bold">$297</p>
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

export default MultiLocationManagement;
