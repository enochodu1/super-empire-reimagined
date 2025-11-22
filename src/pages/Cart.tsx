import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Trash2, Plus, Minus, PackageCheck, Send, FileDown, Mail, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Order } from '@/types/product';
import { sendOrderConfirmation } from '@/lib/emailService';
import { downloadInvoice } from '@/lib/pdfService';
import { createCheckoutSession, isStripeConfigured } from '@/lib/stripe';
import { format } from 'date-fns';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const { user, profile } = useAuth();
  const [customerInfo, setCustomerInfo] = useState({
    businessName: profile?.business_name || '',
    contactName: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state: profile?.state || 'TX',
    zip: profile?.zip || '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInvoiceButton, setShowInvoiceButton] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'quote' | 'stripe'>('quote');
  const stripeEnabled = isStripeConfigured();

  // Check for payment status in URL (return from Stripe Checkout)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success') {
      toast.success('Payment successful!', {
        description: 'Your order has been confirmed and will be processed shortly.',
        duration: 6000,
      });
      // Clear URL parameters
      window.history.replaceState({}, '', window.location.pathname);
    } else if (paymentStatus === 'cancelled') {
      toast.info('Payment cancelled', {
        description: 'You can continue shopping or try again when ready.',
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

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

    // If Stripe payment selected, redirect to Stripe Checkout
    if (paymentMethod === 'stripe') {
      try {
        const orderId = `ORD-${Date.now()}`;
        const orderNumber = `SEP-${Date.now().toString().slice(-8)}`;

        const result = await createCheckoutSession({
          orderId: orderNumber,
          customerEmail: customerInfo.email,
          customerName: customerInfo.contactName || customerInfo.businessName,
          items: cart,
          subtotal,
          tax,
          total,
          metadata: {
            businessName: customerInfo.businessName,
            phone: customerInfo.phone,
            deliveryAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`,
            notes: customerInfo.notes,
          },
        });

        if (!result.success) {
          toast.error(result.error || 'Failed to create checkout session');
          setIsSubmitting(false);
          return;
        }

        // If in demo mode (no backend), show info message
        if (result.error?.includes('Demo mode')) {
          toast.info('Stripe Demo Mode', {
            description: result.error,
            duration: 8000,
          });
          setIsSubmitting(false);
          return;
        }

        // Redirect happens in createCheckoutSession, loading will stay true
        return;
      } catch (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Failed to initiate payment');
        setIsSubmitting(false);
        return;
      }
    }

    // Traditional quote request flow
    try {
      // Create order object
      const order: Order = {
        id: `ORD-${Date.now()}`,
        orderNumber: `SEP-${Date.now().toString().slice(-8)}`,
        customerId: user?.id || customerInfo.email,
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

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('superEmpireOrders') || '[]');
      localStorage.setItem('superEmpireOrders', JSON.stringify([...existingOrders, order]));

      // Send email confirmation
      const itemsSummary = cart
        .map(item => `${item.quantity}x ${item.name} @ ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`)
        .join('\n');

      const emailSent = await sendOrderConfirmation({
        to_email: customerInfo.email,
        to_name: customerInfo.contactName || customerInfo.businessName,
        order_id: order.orderNumber,
        order_total: formatPrice(total),
        order_date: format(new Date(), 'MMM dd, yyyy'),
        business_name: customerInfo.businessName,
        delivery_address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`,
        items_summary: itemsSummary,
      });

      // Store last order for PDF generation
      setLastOrder(order);
      setShowInvoiceButton(true);

      // Success message
      if (emailSent) {
        toast.success(`Order ${order.orderNumber} submitted successfully!`, {
          description: 'A confirmation email has been sent to ' + customerInfo.email,
          duration: 6000,
        });
      } else {
        toast.success(`Order ${order.orderNumber} submitted successfully!`, {
          description: 'We will contact you shortly to confirm delivery details.',
          duration: 5000,
        });
      }

      // Clear cart
      clearCart();

      // Keep customer info if user is logged in, otherwise clear
      if (!user) {
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
      } else {
        // Just clear notes for logged-in users
        setCustomerInfo(prev => ({ ...prev, notes: '' }));
      }

      // Log order details
      console.log('Order submitted:', order);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!lastOrder) return;

    downloadInvoice({
      orderId: lastOrder.orderNumber,
      orderDate: lastOrder.createdAt,
      customerName: lastOrder.customerName,
      businessName: customerInfo.businessName,
      email: lastOrder.customerEmail,
      phone: lastOrder.customerPhone,
      deliveryAddress: customerInfo.address,
      deliveryCity: customerInfo.city,
      deliveryState: customerInfo.state,
      deliveryZip: customerInfo.zip,
      items: lastOrder.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      subtotal: lastOrder.subtotal,
      tax: lastOrder.tax,
      total: lastOrder.total,
      specialInstructions: lastOrder.notes,
    });

    toast.success('Invoice downloaded successfully!');
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

                  <Separator className="my-2" />

                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as 'quote' | 'stripe')}
                      className="space-y-3"
                    >
                      {/* Request Quote Option */}
                      <div className="flex items-start space-x-3 space-y-0">
                        <RadioGroupItem value="quote" id="quote" />
                        <div className="flex-1">
                          <Label htmlFor="quote" className="font-medium cursor-pointer">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Request Quote (Traditional)
                            </div>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Submit order request. We'll contact you to confirm pricing and payment terms.
                          </p>
                        </div>
                      </div>

                      {/* Stripe Payment Option */}
                      <div className="flex items-start space-x-3 space-y-0">
                        <RadioGroupItem value="stripe" id="stripe" disabled={!stripeEnabled} />
                        <div className="flex-1">
                          <Label
                            htmlFor="stripe"
                            className={`font-medium ${stripeEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                          >
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Pay Now with Credit Card
                              {!stripeEnabled && (
                                <Badge variant="secondary" className="text-xs">
                                  Setup Required
                                </Badge>
                              )}
                            </div>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {stripeEnabled
                              ? 'Secure checkout powered by Stripe. Pay with credit card or digital wallet.'
                              : 'Stripe payment is not configured. Contact admin to enable online payments.'}
                          </p>
                        </div>
                      </div>
                    </RadioGroup>

                    {/* Stripe Demo Mode Alert */}
                    {paymentMethod === 'stripe' && stripeEnabled && !import.meta.env.VITE_API_URL && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Demo Mode:</strong> Backend API not configured. See .env.example for setup instructions.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting || (paymentMethod === 'stripe' && !stripeEnabled)}
                  >
                    {isSubmitting ? (
                      <>
                        <PackageCheck className="h-5 w-5 mr-2 animate-spin" />
                        {paymentMethod === 'stripe' ? 'Redirecting to Payment...' : 'Submitting Order...'}
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'stripe' ? (
                          <>
                            <CreditCard className="h-5 w-5 mr-2" />
                            Proceed to Payment
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Request Quote
                          </>
                        )}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            {/* Download Invoice Button */}
            {showInvoiceButton && lastOrder && (
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <PackageCheck className="h-5 w-5" />
                    Order Confirmed!
                  </CardTitle>
                  <CardDescription>
                    Order #{lastOrder.orderNumber} has been submitted successfully
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleDownloadInvoice}
                    variant="outline"
                    className="w-full"
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download Invoice (PDF)
                  </Button>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Confirmation email sent to {customerInfo.email || lastOrder.customerEmail}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
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
