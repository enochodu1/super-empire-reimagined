import { ArrowLeft, RotateCcw, ShoppingCart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

interface PastOrder {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  status: string;
}

const OrderHistory = () => {
  const pastOrders: PastOrder[] = [
    {
      id: 'ORD-12345',
      date: '2025-11-20',
      total: 342.50,
      status: 'delivered',
      items: [
        { id: '1', name: 'Roma Tomatoes', quantity: 100, unit: 'LBS', price: 125.00 },
        { id: '2', name: 'Iceberg Lettuce', quantity: 50, unit: 'Heads', price: 42.50 },
        { id: '3', name: 'Red Bell Peppers', quantity: 75, unit: 'LBS', price: 175.00 },
      ],
    },
    {
      id: 'ORD-12344',
      date: '2025-11-13',
      total: 289.00,
      status: 'delivered',
      items: [
        { id: '4', name: 'Organic Spinach', quantity: 40, unit: 'LBS', price: 120.00 },
        { id: '5', name: 'Carrots', quantity: 80, unit: 'LBS', price: 64.00 },
        { id: '6', name: 'Yellow Onions', quantity: 100, unit: 'LBS', price: 105.00 },
      ],
    },
    {
      id: 'ORD-12343',
      date: '2025-11-06',
      total: 425.75,
      status: 'delivered',
      items: [
        { id: '7', name: 'Roma Tomatoes', quantity: 100, unit: 'LBS', price: 125.00 },
        { id: '8', name: 'Cucumbers', quantity: 60, unit: 'LBS', price: 90.00 },
        { id: '9', name: 'Mixed Peppers', quantity: 100, unit: 'LBS', price: 210.75 },
      ],
    },
  ];

  const handleQuickReorder = (order: PastOrder) => {
    // Simulated quick reorder - would add all items to cart
    console.log('Reordering:', order);
    toast.success(`${order.items.length} items added to cart!`, {
      description: `Reordered from ${order.id}`,
    });
  };

  const handleReorderItem = (item: OrderItem, orderId: string) => {
    console.log('Reordering item:', item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-4">
            <Clock className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Order History & Quick Reorder</h1>
              <p className="text-indigo-100">Reorder your favorite items with one click</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Past Orders</h2>
          <p className="text-muted-foreground">
            Click "Quick Reorder" to add all items from a past order to your cart
          </p>
        </div>

        <div className="space-y-6">
          {pastOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {order.id}
                      <Badge className="bg-green-500">
                        {order.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Ordered on {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                    <Button
                      className="mt-2"
                      onClick={() => handleQuickReorder(order)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Quick Reorder All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.unit} @ ${(item.price / item.quantity).toFixed(2)}/{item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold">${item.price.toFixed(2)}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReorderItem(item, order.id)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Frequently Ordered Items */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Ordered Items</CardTitle>
            <CardDescription>Your most commonly purchased products for quick access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {['Roma Tomatoes', 'Iceberg Lettuce', 'Red Bell Peppers'].map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">{item}</h4>
                    <p className="text-sm text-muted-foreground mb-3">Ordered 3 times</p>
                    <Button className="w-full" size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Quick Add
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderHistory;
