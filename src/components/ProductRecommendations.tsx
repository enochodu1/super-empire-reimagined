import { ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  reason: string;
  image: string;
}

export const ProductRecommendations = ({ context = 'general' }: { context?: string }) => {
  const recommendations: RecommendedProduct[] = [
    { id: '1', name: 'Organic Basil', price: 2.99, reason: 'Often bought with tomatoes', image: '🌿' },
    { id: '2', name: 'Fresh Mozzarella', price: 5.99, reason: 'Customers also bought', image: '🧀' },
    { id: '3', name: 'Balsamic Vinegar', price: 8.99, reason: 'Perfect pairing', image: '🍶' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {recommendations.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-3">
                  <div className="text-5xl mb-2">{product.image}</div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <Badge variant="outline" className="mt-1 text-xs">{product.reason}</Badge>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600 mb-2">${product.price}</div>
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
