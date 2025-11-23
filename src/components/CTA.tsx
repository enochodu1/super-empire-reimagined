import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Building2, Store } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-brand-green to-brand-green-dark text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent-tomato rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
            Join hundreds of businesses across the Southern states that trust Grocery Empire.
            Choose the ordering option that fits your needs.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link to="/b2b" className="block">
              <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform cursor-pointer border-2 border-white/30">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-accent-tomato" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Wholesale Portal</h3>
                <p className="text-gray-700 mb-4">Bulk pallet orders • Net 30 terms • Delivery scheduling</p>
                <Button className="w-full bg-accent-tomato hover:bg-accent-tomato/90">
                  Access Wholesale Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>

            <Link to="/products" className="block">
              <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform cursor-pointer border-2 border-white/30">
                <Store className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Retail & Restaurant</h3>
                <p className="text-gray-700 mb-4">Case orders • Walk-in pickup • Small quantities</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
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
