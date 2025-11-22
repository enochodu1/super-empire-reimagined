import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Building2, Store } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-brand-green-dark text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            Join hundreds of businesses across the Southern states that trust Super Empire Produce.
            Whether you need wholesale pallets or retail cases, we've got you covered.
          </p>

          <div className="flex flex-col items-center mb-8">
            <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform border-2 border-white/30 max-w-2xl w-full">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Building2 className="w-12 h-12 text-secondary" />
                <Store className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground text-center">Browse Our Full Catalog</h3>
              <p className="text-muted-foreground mb-6 text-center text-lg">
                200+ premium products • Wholesale & retail options • Flexible ordering • Reliable delivery
              </p>
              <Link to="/products" className="block">
                <Button className="w-full bg-brand-green hover:bg-brand-green-dark text-lg py-6">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline-light"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (555) 123-4567
            </Button>
          </div>

          <p className="mt-8 text-white/70 text-sm">
            Available Monday - Saturday, 6 AM - 6 PM CST
          </p>
        </div>
      </div>
    </section>
  );
};
