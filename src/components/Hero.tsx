import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-produce.jpg";
import { COMPANY_INFO, getServiceAreaText } from "@/lib/companyInfo";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh produce at market"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark/95 via-brand-green/85 to-brand-green/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center space-x-2 glass rounded-full px-6 py-3 mb-6 glass-hover">
            <MapPin className="w-4 h-4 text-accent-tomato" />
            <span className="text-white font-medium">{getServiceAreaText()}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Premium Produce
            <br />
            <span className="text-accent-tomato">Delivered Fresh</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Your trusted wholesale partner for restaurants, grocery stores, and businesses across the
            Southern states. Quality produce, reliable delivery, competitive pricing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button variant="hero" size="lg" className="text-lg">
                Start Your Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline-light" size="lg" className="text-lg">
                View Products
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="glass rounded-2xl p-6 glass-hover text-center">
              <div className="text-4xl font-bold text-white mb-2">{COMPANY_INFO.serviceArea.states.length}</div>
              <div className="text-white/80">States Served</div>
            </div>
            <div className="glass rounded-2xl p-6 glass-hover text-center">
              <div className="text-4xl font-bold text-white mb-2">{COMPANY_INFO.operations.fleetSize}</div>
              <div className="text-white/80">Delivery Trucks</div>
            </div>
            <div className="glass rounded-2xl p-6 glass-hover text-center">
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-white/80">Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
