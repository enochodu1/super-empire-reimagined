import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface CompactViewProps {
  products: Product[];
  quantityInputs: Record<string, number>;
  onQuantityChange: (productId: string, value: string) => void;
  onAddToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const CompactView = ({
  products,
  quantityInputs,
  onQuantityChange,
  onAddToCart,
  formatPrice,
}: CompactViewProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Virtual scrolling for ultra-dense lists
  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // Compact row height
    overscan: 15, // Render more items for smooth scrolling
  });

  return (
    <div
      ref={parentRef}
      className="overflow-auto border rounded-lg"
      style={{ maxHeight: '700px' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const product = products[virtualRow.index];
          return (
            <div
              key={product.id}
              className="flex items-center justify-between py-2 px-3 border-b hover:bg-muted/20 transition-colors absolute w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {/* Thumbnail */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-8 h-8 object-cover rounded mr-3 shrink-0"
                  loading="lazy"
                />
              )}

              {/* Left: Product Info */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium truncate">{product.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {product.packSize}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {product.subcategory} • {product.unit}
                </div>
              </div>

              {/* Right: Price & Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-semibold text-green-600 w-20 text-right">
                  {formatPrice(product.price)}
                </span>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={quantityInputs[product.id] || ''}
                  onChange={(e) => onQuantityChange(product.id, e.target.value)}
                  className="w-16 h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && quantityInputs[product.id] > 0) {
                      onAddToCart(product);
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => onAddToCart(product)}
                  disabled={!quantityInputs[product.id] || quantityInputs[product.id] === 0}
                  className="h-8 px-2"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
