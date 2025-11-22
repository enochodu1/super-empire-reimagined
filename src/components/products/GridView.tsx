import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, TrendingDown } from 'lucide-react';

interface GridViewProps {
  products: Product[];
  quantityInputs: Record<string, number>;
  onQuantityChange: (productId: string, value: string) => void;
  onAddToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const GridView = ({
  products,
  quantityInputs,
  onQuantityChange,
  onAddToCart,
  formatPrice,
}: GridViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
          {/* Product Image */}
          {product.image && (
            <div className="w-full h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg mb-1 truncate">{product.name}</CardTitle>
                <CardDescription className="text-sm truncate">
                  {product.subcategory}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {product.category}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pack:</span>
                <span className="font-medium">{product.packSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit:</span>
                <span className="font-medium">{product.unit}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-muted-foreground">Price:</span>
                <span className="text-xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Bulk Pricing Tiers */}
              {product.priceTiers && product.priceTiers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-dashed">
                  <div className="flex items-center gap-1 mb-1.5">
                    <TrendingDown className="h-3 w-3 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600">Volume Savings</span>
                  </div>
                  <div className="space-y-1">
                    {product.priceTiers.slice(0, 2).map((tier, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">{tier.minQuantity}+ cases:</span>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-blue-600">
                            {formatPrice(tier.price)}
                          </span>
                          {tier.discount && (
                            <Badge variant="secondary" className="text-[10px] px-1 py-0">
                              -{tier.discount}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    {product.priceTiers.length > 2 && (
                      <div className="text-[10px] text-muted-foreground text-center pt-0.5">
                        +{product.priceTiers.length - 2} more tier{product.priceTiers.length - 2 > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-3 border-t">
            <div className="flex gap-2 w-full">
              <Input
                type="number"
                min="0"
                placeholder="Qty"
                value={quantityInputs[product.id] || ''}
                onChange={(e) => onQuantityChange(product.id, e.target.value)}
                className="w-20"
              />
              <Button
                onClick={() => onAddToCart(product)}
                className="flex-1"
                disabled={!quantityInputs[product.id] || quantityInputs[product.id] === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
