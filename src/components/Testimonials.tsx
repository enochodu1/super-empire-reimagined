import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      business: "Casa Grande Restaurant",
      location: "Oklahoma City, OK",
      rating: 5,
      text: "Super Empire has transformed our kitchen operations. Fresh produce delivered on time, every time. Their quality is unmatched and prices are incredibly competitive.",
      image: "🍴",
    },
    {
      name: "James Wilson",
      business: "Fresh Market Grocers",
      location: "Little Rock, AR",
      rating: 5,
      text: "We've been partnering with Super Empire for 5 years. Their consistency and dedication to quality keeps our customers coming back. Highly recommend!",
      image: "🏪",
    },
    {
      name: "Sarah Chen",
      business: "Green Leaf Cafe",
      location: "Dallas, TX",
      rating: 5,
      text: "The variety of seasonal produce is amazing. Our chef loves the quality, and our account manager always goes above and beyond to meet our needs.",
      image: "☕",
    },
  ];

  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 glass rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 glass rounded-full blur-3xl opacity-15" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Leading Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our partners have to say about their experience with Super Empire Produce
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-card border-0 animate-fade-up hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-tomato text-accent-tomato" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
