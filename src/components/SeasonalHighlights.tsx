import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export const SeasonalHighlights = () => {
  const highlights = [
    {
      name: "Summer Tomatoes",
      season: "In Season Now",
      description: "Vine-ripened heirloom tomatoes at peak freshness",
      color: "bg-red-500",
    },
    {
      name: "Sweet Corn",
      season: "Limited Time",
      description: "Farm-fresh sweet corn, picked daily",
      color: "bg-yellow-500",
    },
    {
      name: "Bell Peppers",
      season: "Available",
      description: "Crisp, colorful peppers in red, yellow, and green",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-4 animate-fade-up">
          <Sparkles className="w-6 h-6 text-accent-tomato" />
          <Badge className="bg-accent-tomato text-white border-0 px-4 py-1">
            Seasonal Specials
          </Badge>
          <Sparkles className="w-6 h-6 text-accent-tomato" />
        </div>

        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What's Fresh This Season
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our current seasonal offerings picked at peak ripeness
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl overflow-hidden border-0 glass-hover animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-2 ${item.color}`} />
              <div className="p-6">
                <Badge className="mb-4 bg-primary/10 text-primary border-0">
                  {item.season}
                </Badge>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {item.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Seasonal availability changes throughout the year
          </p>
          <Button variant="hero" size="lg">
            View Full Seasonal Calendar
          </Button>
        </div>
      </div>
    </section>
  );
};
