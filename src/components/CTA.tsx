import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

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
            Join hundreds of businesses across the Southern states that trust Super Empire Produce
            for their wholesale needs. Let's discuss how we can serve your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline-light"
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call (555) 123-4567
            </Button>
            <Button
              className="text-lg px-8 py-6 h-auto bg-accent-tomato hover:bg-accent-tomato/90 text-white border-0"
              size="lg"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
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
