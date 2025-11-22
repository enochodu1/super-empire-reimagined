import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Truck, Heart } from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We source only the highest quality produce from trusted growers and suppliers."
    },
    {
      icon: Users,
      title: "Customer Partnership",
      description: "Building long-term relationships with our customers through exceptional service."
    },
    {
      icon: Truck,
      title: "Reliable Delivery",
      description: "On-time delivery, every time. Your business depends on it, and so do we."
    },
    {
      icon: Heart,
      title: "Community Focus",
      description: "Supporting local farmers and giving back to the communities we serve."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl">
              Your trusted partner in wholesale produce for over 25 years
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              Founded in 1999, Grocery Empire has grown from a small family-owned distributor
              to one of the region's most trusted wholesale produce suppliers. Our journey began with
              a simple mission: to deliver the freshest, highest-quality produce to restaurants,
              grocery stores, and institutions throughout the area.
            </p>
            <p className="mb-4">
              Over the years, we've built strong relationships with local and international growers,
              ensuring that our customers receive the best produce at competitive prices. Our commitment
              to quality, reliability, and exceptional customer service has made us the preferred choice
              for businesses of all sizes.
            </p>
            <p className="mb-4">
              Today, we operate from a state-of-the-art facility with temperature-controlled storage,
              maintaining the perfect environment for our extensive inventory. Our fleet of refrigerated
              trucks ensures that your orders arrive fresh and on time, every time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-brand-green">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide our customers with the freshest, highest-quality produce while building
                  lasting partnerships through exceptional service, competitive pricing, and reliable delivery.
                  We strive to support local agriculture and promote sustainable farming practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-brand-green">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading wholesale produce distributor in the region, known for our unwavering
                  commitment to quality, innovation in supply chain management, and dedication to customer
                  success. We envision a future where fresh, sustainable produce is accessible to all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/10 mb-4">
                  <value.icon className="w-8 h-8 text-brand-green" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Grocery Empire?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold mb-2">Extensive Selection</h4>
                  <p className="text-muted-foreground">
                    Over 500 SKUs including fresh fruits, vegetables, herbs, and specialty items from around the world.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold mb-2">Competitive Pricing</h4>
                  <p className="text-muted-foreground">
                    Direct relationships with growers allow us to offer the best prices without compromising quality.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold mb-2">Flexible Ordering</h4>
                  <p className="text-muted-foreground">
                    24/7 online ordering, phone orders, and custom programs tailored to your business needs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold mb-2">Quality Assurance</h4>
                  <p className="text-muted-foreground">
                    Rigorous quality control processes ensure you receive only the freshest produce.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold mb-2">Expert Support</h4>
                  <p className="text-muted-foreground">
                    Our knowledgeable team is always available to help with product selection and ordering.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-brand-green rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold mb-2">Sustainable Practices</h4>
                  <p className="text-muted-foreground">
                    Committed to environmentally responsible sourcing and reducing food waste.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <Card className="bg-brand-green text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
            <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust Grocery Empire for their wholesale needs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-brand-green font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us Today
              </a>
              <a
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-transparent border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Create Account
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutUs;
