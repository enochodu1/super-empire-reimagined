import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, BookMarked, Plus, Trash2, Star, ShoppingCart } from 'lucide-react';
import { SuperEmpireDB } from '@/lib/database';
import { ShoppingList, Product } from '@/types/product';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface QuickActionsProps {
  onLoadList: (items: { productId: string; quantity: number }[]) => void;
  currentCart: Record<string, number>;
  products: Product[];
}

export const QuickActions = ({ onLoadList, currentCart, products }: QuickActionsProps) => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>(() =>
    SuperEmpireDB.getAllShoppingLists()
  );
  const [newListName, setNewListName] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Get last 3 orders for quick reorder
  const recentOrders = SuperEmpireDB.getAllOrders()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const handleQuickReorder = (orderNumber: string) => {
    const order = SuperEmpireDB.getAllOrders().find(o => o.orderNumber === orderNumber);
    if (!order) return;

    const items = order.items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    onLoadList(items);
    toast.success(`Loaded ${items.length} items from order #${orderNumber}`);
  };

  const handleLoadShoppingList = (listId: string) => {
    const list = SuperEmpireDB.getShoppingList(listId);
    if (!list) return;

    onLoadList(list.items);
    toast.success(`Loaded "${list.name}" (${list.items.length} items)`);
  };

  const handleSaveCurrentCart = () => {
    if (!newListName.trim()) {
      toast.error('Please enter a list name');
      return;
    }

    const items = Object.entries(currentCart)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const newList: ShoppingList = {
      id: `list-${Date.now()}`,
      name: newListName,
      items,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    SuperEmpireDB.addShoppingList(newList);
    setShoppingLists(SuperEmpireDB.getAllShoppingLists());
    setNewListName('');
    setIsCreateDialogOpen(false);
    toast.success(`Saved "${newListName}" with ${items.length} items`);
  };

  const handleDeleteList = (listId: string, listName: string) => {
    if (confirm(`Delete "${listName}"?`)) {
      SuperEmpireDB.deleteShoppingList(listId);
      setShoppingLists(SuperEmpireDB.getAllShoppingLists());
      toast.success(`Deleted "${listName}"`);
    }
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Quick Reorder Section */}
          {recentOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-green-600" />
                <h3 className="font-semibold text-sm">Quick Reorder</h3>
                <Badge variant="outline" className="text-xs">Recent Orders</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentOrders.map(order => (
                  <Button
                    key={order.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReorder(order.orderNumber)}
                    className="text-xs"
                  >
                    <ShoppingCart className="h-3 w-3 mr-2" />
                    {order.orderNumber} • {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Shopping Lists Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookMarked className="h-4 w-4 text-blue-600" />
                <h3 className="font-semibold text-sm">Saved Shopping Lists</h3>
                <Badge variant="outline" className="text-xs">{shoppingLists.length}</Badge>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-3 w-3 mr-1" />
                    Save Current Cart
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Shopping List</DialogTitle>
                    <DialogDescription>
                      Save your current cart as a reusable shopping list
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="list-name">List Name</Label>
                      <Input
                        id="list-name"
                        placeholder="e.g., Monday Order, Weekly Staples"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveCurrentCart()}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Object.values(currentCart).filter(q => q > 0).length} items will be saved
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSaveCurrentCart} disabled={!newListName.trim()}>
                      Save List
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {shoppingLists.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {shoppingLists.map(list => (
                  <div key={list.id} className="flex items-center gap-1 bg-white border rounded-lg px-3 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLoadShoppingList(list.id)}
                      className="text-xs h-auto py-1 px-2"
                    >
                      {list.isFavorite && <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />}
                      <span className="font-medium">{list.name}</span>
                      <span className="text-muted-foreground ml-2">({list.items.length} items)</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteList(list.id, list.name)}
                      className="h-auto p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No saved lists yet. Add items to your cart and click "Save Current Cart" to create your first list!
              </p>
            )}
          </div>

          {/* Bulk Pricing Hint */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <span className="font-semibold">💡 Bulk Savings:</span> Order 10+ cases of select items to unlock volume discounts up to 15%!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
