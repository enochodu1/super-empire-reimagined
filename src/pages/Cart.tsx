import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Plus, Minus, PackageCheck, Send } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Order } from '@/types/product';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'TX',
    zip: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.0825; // 8.25% Texas sales tax
  const total = subtotal + tax;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      setIsSubmitting(false);
      return;
    }

    if (!customerInfo.businessName || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create order object
      const order: Order = {
        id: `ORD-${Date.now()}`,
        orderNumber: `SEP-${Date.now().toString().slice(-8)}`,
        customerId: customerInfo.email, // Using email as temp ID
        customerName: customerInfo.contactName || customerInfo.businessName,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        deliveryAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`,
        items: cart,
        subtotal,
        tax,
        total,
        status: 'pending',
        notes: customerInfo.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('superEmpireOrders') || '[]');
      localStorage.setItem('superEmpireOrders', JSON.stringify([...existingOrders, order]));

      // Success!
      toast.success(`Order ${order.orderNumber} submitted successfully!`, {
        description: 'We will contact you shortly to confirm delivery details.',
        duration: 5000,
      });

      // Clear cart and form
      clearCart();
      setCustomerInfo({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: 'TX',
        zip: '',
        notes: '',
      });

      // Simulate email notification
      console.log('Order submitted:', order);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto p-12">
            <div className="text-center">
              <ShoppingCart className="h-24 w-24 mx-auto text-gray-400 mb-6" />
              <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Add products to your cart to place an order
              </p>
              <Button size="lg" onClick={() => (window.location.href = '/products')}>
                Browse Products
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <ShoppingCart className="inline h-10 w-10 mr-3" />
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Items ({getCartCount()} items)</CardTitle>
                <CardDescription>Review your order before checkout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.subcategory}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.packSize} • SKU: {item.product.id}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="text-lg font-bold text-green-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatPrice(item.product.price)} per {item.product.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={clearCart} className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-4">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8.25%):</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-green-600">{formatPrice(total)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information Form */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
                <CardDescription>Tell us where to deliver your order</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitOrder}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      required
                      value={customerInfo.businessName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, businessName: e.target.value })}
                      placeholder="Your Restaurant Inc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={customerInfo.contactName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, contactName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="john@restaurant.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="(469) 432-9313"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        placeholder="Dallas"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={customerInfo.state}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
                        placeholder="TX"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      value={customerInfo.zip}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, zip: e.target.value })}
                      placeholder="75215"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      placeholder="Delivery instructions, special requests, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <PackageCheck className="h-5 w-5 mr-2 animate-spin" />
                        Submitting Order...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This is a wholesale order request. Our team will contact you to confirm pricing, delivery schedule, and payment terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
