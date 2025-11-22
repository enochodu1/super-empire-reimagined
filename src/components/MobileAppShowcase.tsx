import { Smartphone, Apple, Download, Check, Zap, ShoppingBag, Bell, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const MobileAppShowcase = () => {
  const features = [
    { icon: ShoppingBag, text: 'Order on the go' },
    { icon: Bell, text: 'Real-time notifications' },
    { icon: Zap, text: 'Quick reorder' },
    { icon: BarChart3, text: 'Track deliveries' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-green/10 via-green-50 to-blue-50 dark:from-brand-green/5 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <Badge className="bg-brand-green text-white px-4 py-1.5 text-sm">
              Coming Soon
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Order Fresh Produce
              <br />
              <span className="text-brand-green">From Your Phone</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Our mobile app is coming soon! Get instant access to your wholesale marketplace,
              manage orders, and never miss a price drop - all from your smartphone.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <span className="font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white h-14 px-6"
                disabled
              >
                <Apple className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white h-14 px-6"
                disabled
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </Button>
            </div>

            {/* Email Notify */}
            <Card className="border-2 border-brand-green/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="w-5 h-5 text-brand-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Get Notified at Launch</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Be the first to know when our mobile app launches
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                      />
                      <Button className="bg-brand-green hover:bg-brand-green/90">
                        Notify Me
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden">
                  {/* Phone Notch */}
                  <div className="bg-gray-900 h-8 rounded-b-3xl mx-auto w-40 mb-2"></div>

                  {/* App Screenshot Mockup */}
                  <div className="aspect-[9/16] bg-gradient-to-b from-brand-green/5 to-white dark:to-gray-900 px-4 py-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">Grocery Empire</div>
                        <div className="text-sm text-muted-foreground">Wholesale Produce</div>
                      </div>
                      <div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                        <div className="text-xs text-muted-foreground">Orders</div>
                        <div className="text-lg font-bold">156</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                        <div className="text-xs text-muted-foreground">Saved</div>
                        <div className="text-lg font-bold text-green-600">$2.4K</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                        <div className="text-xs text-muted-foreground">Rating</div>
                        <div className="text-lg font-bold">4.9★</div>
                      </div>
                    </div>

                    {/* Featured Products */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold">Today's Specials</div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg"></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">Fresh Product {i}</div>
                            <div className="text-xs text-muted-foreground">In Stock</div>
                          </div>
                          <div className="text-sm font-bold text-brand-green">${(12.99 * i).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action */}
                    <div className="absolute bottom-8 left-4 right-4">
                      <div className="bg-brand-green text-white p-4 rounded-2xl text-center font-semibold shadow-lg">
                        Quick Reorder
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full"></div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl border-4 border-background">
                <Check className="w-6 h-6 text-brand-green" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-xl border-4 border-background">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
