import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import farmImage from "@/assets/farm-field.jpg";

export const About = () => {
  const values = [
    "Farm-direct sourcing for maximum freshness",
    "Strict quality control at every step",
    "Competitive wholesale pricing",
    "Reliable delivery schedules",
    "Dedicated account management",
    "Flexible order quantities",
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-fade-up">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={farmImage}
                alt="Farm field"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold mb-1">25+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-up lg:pl-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Trusted Wholesale Partner
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Super Empire Produce has been serving businesses across Oklahoma, Arkansas, Louisiana,
              and Texas for over two decades. We're committed to delivering the highest quality
              produce at competitive wholesale prices.
            </p>

            <div className="space-y-4 mb-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                Contact Our Team
              </Button>
              <Button variant="outline" size="lg">
                Learn Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
