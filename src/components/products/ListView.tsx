import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Package2, TrendingDown } from 'lucide-react';

interface ListViewProps {
  products: Product[];
  quantityInputs: Record<string, number>;
  onQuantityChange: (productId: string, value: string) => void;
  onAddToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const ListView = ({
  products,
  quantityInputs,
  onQuantityChange,
  onAddToCart,
  formatPrice,
}: ListViewProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors"
        >
          {/* Product Image */}
          <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Package2 className="w-12 h-12 text-green-600" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start gap-2">
              <h3 className="text-lg font-semibold flex-1">{product.name}</h3>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{product.subcategory}</p>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Pack: </span>
                <span className="font-medium">{product.packSize}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Unit: </span>
                <span className="font-medium">{product.unit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">SKU: </span>
                <span className="font-mono text-xs">{product.id}</span>
              </div>
            </div>

            {/* Bulk Pricing Tiers */}
            {product.priceTiers && product.priceTiers.length > 0 && (
              <div className="mt-2 pt-2 border-t border-dashed">
                <div className="flex items-center gap-1 mb-1.5">
                  <TrendingDown className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-600">Volume Discounts Available</span>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {product.priceTiers.map((tier, idx) => (
                    <div key={idx} className="flex items-baseline gap-1.5 text-xs bg-blue-50 px-2 py-1 rounded">
                      <span className="text-muted-foreground font-medium">{tier.minQuantity}+:</span>
                      <span className="font-bold text-blue-700">
                        {formatPrice(tier.price)}
                      </span>
                      {tier.discount && (
                        <Badge variant="secondary" className="text-[10px] px-1 py-0 ml-0.5">
                          -{tier.discount}%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                placeholder="Qty"
                value={quantityInputs[product.id] || ''}
                onChange={(e) => onQuantityChange(product.id, e.target.value)}
                className="w-24"
              />
              <Button
                onClick={() => onAddToCart(product)}
                disabled={!quantityInputs[product.id] || quantityInputs[product.id] === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
