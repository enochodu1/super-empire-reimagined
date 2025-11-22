import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck, Clock, Package, Leaf, ShoppingCart, FileText,
  BarChart3, Users, Award, Target, Shield, Sparkles
} from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: Truck,
      title: "Daily Delivery Service",
      description: "Reliable next-day delivery with our fleet of refrigerated trucks. Multiple delivery windows available to fit your schedule.",
      features: [
        "Temperature-controlled vehicles",
        "GPS tracking for all deliveries",
        "Flexible delivery windows",
        "Emergency same-day delivery available"
      ]
    },
    {
      icon: ShoppingCart,
      title: "24/7 Online Ordering",
      description: "Place orders anytime through our easy-to-use platform. Real-time inventory and pricing at your fingertips.",
      features: [
        "Real-time product availability",
        "Order history and reordering",
        "Mobile-friendly interface",
        "Save favorite items"
      ]
    },
    {
      icon: Package,
      title: "Custom Orders",
      description: "Can't find what you need? We'll source specialty items and custom orders to meet your exact requirements.",
      features: [
        "Specialty product sourcing",
        "Custom packaging options",
        "Bulk order discounts",
        "Seasonal specialty items"
      ]
    },
    {
      icon: FileText,
      title: "Standing Orders",
      description: "Automate your recurring orders. Set it once and we'll deliver consistently on your schedule.",
      features: [
        "Automated weekly/monthly orders",
        "Easy modifications",
        "Consistent pricing",
        "Priority scheduling"
      ]
    },
    {
      icon: BarChart3,
      title: "Inventory Management",
      description: "Tools to help you track usage, manage costs, and optimize your produce inventory.",
      features: [
        "Usage analytics and reporting",
        "Cost tracking",
        "Waste reduction insights",
        "Seasonal planning tools"
      ]
    },
    {
      icon: Users,
      title: "Dedicated Account Management",
      description: "Each customer gets a dedicated account manager who understands your business needs.",
      features: [
        "Personal account representative",
        "Menu planning assistance",
        "Product recommendations",
        "Priority support"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Award,
      title: "Quality Assurance Program",
      description: "Rigorous quality checks at every step ensure you receive only the best produce."
    },
    {
      icon: Leaf,
      title: "Organic & Sustainable Options",
      description: "Extensive selection of certified organic and sustainably-sourced produce."
    },
    {
      icon: Target,
      title: "Menu Development Support",
      description: "Work with our team to create seasonal menus featuring the freshest ingredients."
    },
    {
      icon: Shield,
      title: "Food Safety Compliance",
      description: "Full traceability and compliance support for all food safety requirements."
    },
    {
      icon: Sparkles,
      title: "Specialty Items Sourcing",
      description: "Access to rare and specialty produce items from around the world."
    },
    {
      icon: Clock,
      title: "Rush Order Service",
      description: "Emergency ordering available for last-minute needs and unexpected events."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
            <p className="text-xl">
              Comprehensive solutions designed to support your business success
            </p>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Than Just Fresh Produce</h2>
          <p className="text-lg text-muted-foreground">
            At Grocery Empire, we're committed to being your complete wholesale produce partner.
            Our comprehensive suite of services is designed to make ordering easier, improve your
            operations, and help your business thrive.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mainServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-green/10 mb-4">
                    <service.icon className="w-7 h-7 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Additional Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {additionalServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-green/10">
                      <service.icon className="w-6 h-6 text-brand-green" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Industry-Specific Solutions */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Industry-Specific Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-brand-green">Restaurants</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Daily delivery schedules</li>
                  <li>• Menu planning support</li>
                  <li>• Seasonal specials</li>
                  <li>• Emergency orders</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-brand-green">Grocery Stores</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Bulk ordering</li>
                  <li>• Display-ready packaging</li>
                  <li>• Flexible delivery windows</li>
                  <li>• Volume discounts</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-brand-green">Institutions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Large volume capabilities</li>
                  <li>• Budget-friendly options</li>
                  <li>• Nutrition support</li>
                  <li>• Contract pricing</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-brand-green">Caterers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Event-based ordering</li>
                  <li>• Flexible quantities</li>
                  <li>• Premium selections</li>
                  <li>• Rush service available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <Card className="bg-brand-green text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Let us show you how our services can benefit your business. Contact us today for a consultation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Our Team
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = '/register'}
              >
                Create an Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Services;
