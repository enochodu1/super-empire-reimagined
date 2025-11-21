import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Apple, Sprout } from "lucide-react";
import vegetablesImage from "@/assets/vegetables.jpg";
import fruitsImage from "@/assets/fruits.jpg";

export const Products = () => {
  const categories = [
    {
      icon: Leaf,
      title: "Fresh Vegetables",
      description: "Farm-fresh vegetables including lettuce, tomatoes, peppers, onions, and seasonal specialties.",
      image: vegetablesImage,
      color: "brand-green",
    },
    {
      icon: Apple,
      title: "Premium Fruits",
      description: "Hand-selected fruits from trusted growers. Citrus, berries, melons, and tropical varieties.",
      image: fruitsImage,
      color: "accent-tomato",
    },
    {
      icon: Sprout,
      title: "Seasonal Specials",
      description: "Rotating seasonal produce at peak freshness. Ask about our current seasonal selections.",
      image: vegetablesImage,
      color: "brand-green-light",
    },
  ];

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Quality Produce Selection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From farm to your business, we deliver the freshest produce at wholesale prices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-up border-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute top-4 right-4 bg-${category.color} text-white p-3 rounded-full`}>
                  <category.icon className="w-6 h-6" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="hero" size="lg">
            View Full Product Catalog
          </Button>
        </div>
      </div>
    </section>
  );
};
