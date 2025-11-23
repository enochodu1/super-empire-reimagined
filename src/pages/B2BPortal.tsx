import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Truck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

const B2BPortal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set wholesale customer type in localStorage
    localStorage.setItem('superempire_customer_type', 'wholesale');
  }, []);

  const handleBrowseProducts = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Wholesale B2B Portal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Welcome to Grocery Empire's wholesale ordering portal. Enjoy exclusive pricing, flexible payment terms, and priority delivery.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Net 30 Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Flexible payment terms with Net 30 billing for qualified wholesale buyers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Free Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complimentary delivery on all bulk pallet orders within our service area.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                15% Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save 15% on all products with our wholesale pricing tier.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What's Included */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Wholesale Membership Includes:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Bulk Pallet Orders</p>
                  <p className="text-sm text-muted-foreground">Order by the pallet for maximum savings</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Dedicated Account Manager</p>
                  <p className="text-sm text-muted-foreground">Personal support for your business needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Priority Delivery Scheduling</p>
                  <p className="text-sm text-muted-foreground">Choose delivery windows that work for you</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Weekly Price Updates</p>
                  <p className="text-sm text-muted-foreground">Stay informed with current market pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Custom Order Lists</p>
                  <p className="text-sm text-muted-foreground">Save and reorder your favorites quickly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Standing Orders</p>
                  <p className="text-sm text-muted-foreground">Set up recurring deliveries</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleBrowseProducts}
            className="text-lg px-8 py-6 h-auto"
          >
            Browse Wholesale Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already seeing wholesale prices in your product catalog
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default B2BPortal;
