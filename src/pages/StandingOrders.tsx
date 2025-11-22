import { ArrowLeft, Plus, Calendar, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const StandingOrders = () => {
  const standingOrders = [
    { id: '1', name: 'Weekly Tomato Order', frequency: 'Every Tuesday', items: 3, total: 342.50, active: true },
    { id: '2', name: 'Bi-Weekly Lettuce', frequency: 'Every other Friday', items: 2, total: 125.00, active: true },
    { id: '3', name: 'Monthly Bulk Order', frequency: '1st of each month', items: 15, total: 1250.00, active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="text-3xl font-bold">Standing Orders</h1>
          <p className="text-emerald-100">Set up recurring automatic orders</p>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Recurring Orders</h2>
            <p className="text-muted-foreground">Automate your regular purchases</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Standing Order
          </Button>
        </div>

        <div className="space-y-4">
          {standingOrders.map((order) => (
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <RotateCcw className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-lg font-semibold">{order.name}</h3>
                      {order.active ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline">Paused</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {order.frequency}
                      </span>
                      <span>{order.items} items</span>
                      <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                  <Switch checked={order.active} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Benefits of Standing Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Never run out of your essential items</li>
              <li>✓ Lock in current pricing for the duration</li>
              <li>✓ Save time - no need to reorder manually</li>
              <li>✓ Priority fulfillment for standing orders</li>
              <li>✓ Flexible - pause, modify, or cancel anytime</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StandingOrders;
