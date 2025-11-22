import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, ShoppingCart } from 'lucide-react';

interface TableViewProps {
  products: Product[];
  quantityInputs: Record<string, number>;
  onQuantityChange: (productId: string, value: string) => void;
  onAddToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const TableView = ({
  products,
  quantityInputs,
  onQuantityChange,
  onAddToCart,
  formatPrice,
}: TableViewProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Virtual scrolling for performance with large lists
  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 53, // Approximate row height in pixels
    overscan: 10, // Render 10 extra items above/below viewport
  });

  // Count products with quantities
  const productsWithQty = Object.entries(quantityInputs).filter(
    ([_, qty]) => qty > 0
  ).length;

  // Add all products with quantities to cart
  const handleAddAllToCart = () => {
    products.forEach((product) => {
      if (quantityInputs[product.id] && quantityInputs[product.id] > 0) {
        onAddToCart(product);
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions Toolbar */}
      {productsWithQty > 0 && (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            <span className="font-semibold">
              {productsWithQty} product{productsWithQty !== 1 ? 's' : ''} ready to add
            </span>
          </div>
          <Button onClick={handleAddAllToCart} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add All {productsWithQty} to Cart
          </Button>
        </div>
      )}

      {/* Table with Virtual Scrolling */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[70px] font-semibold">Image</TableHead>
              <TableHead className="w-[200px] font-semibold">Product Name</TableHead>
              <TableHead className="w-[130px] font-semibold">Category</TableHead>
              <TableHead className="w-[150px] font-semibold">Subcategory</TableHead>
              <TableHead className="w-[120px] font-semibold">Pack Size</TableHead>
              <TableHead className="w-[80px] font-semibold">Unit</TableHead>
              <TableHead className="w-[100px] text-right font-semibold">Price</TableHead>
              <TableHead className="w-[130px] font-semibold">Quantity</TableHead>
              <TableHead className="w-[110px] font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div
          ref={parentRef}
          className="overflow-auto"
          style={{ maxHeight: '600px' }}
        >
          <Table>
            <TableBody
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const product = products[virtualRow.index];
                return (
                  <TableRow
                    key={product.id}
                    className="hover:bg-muted/30 transition-colors absolute w-full"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <TableCell className="w-[70px]">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded" />
                      )}
                    </TableCell>
                    <TableCell className="w-[200px] font-medium">{product.name}</TableCell>
                    <TableCell className="w-[130px]">
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-[150px] text-sm text-muted-foreground">
                      {product.subcategory}
                    </TableCell>
                    <TableCell className="w-[120px] text-sm">{product.packSize}</TableCell>
                    <TableCell className="w-[80px] text-sm font-mono">{product.unit}</TableCell>
                    <TableCell className="w-[100px] text-right font-semibold text-green-600">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell className="w-[130px]">
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={quantityInputs[product.id] || ''}
                        onChange={(e) => onQuantityChange(product.id, e.target.value)}
                        className="w-full"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && quantityInputs[product.id] > 0) {
                            onAddToCart(product);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="w-[110px]">
                      <Button
                        size="sm"
                        onClick={() => onAddToCart(product)}
                        disabled={!quantityInputs[product.id] || quantityInputs[product.id] === 0}
                        className="w-full"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Helper Text */}
      <p className="text-sm text-muted-foreground text-center">
        💡 Tip: Enter quantities and press <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
        or use "Add All" to bulk add items to cart
      </p>
    </div>
  );
};
