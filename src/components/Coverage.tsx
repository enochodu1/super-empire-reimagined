import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Truck, Clock } from "lucide-react";

export const Coverage = () => {
  const states = [
    {
      name: "Oklahoma",
      cities: ["Oklahoma City", "Tulsa", "Norman"],
    },
    {
      name: "Arkansas",
      cities: ["Little Rock", "Fort Smith", "Fayetteville"],
    },
    {
      name: "Louisiana",
      cities: ["Shreveport", "Bossier City", "Monroe"],
    },
    {
      name: "Texas",
      cities: ["Dallas", "Houston", "Austin"],
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Wide Coverage",
      description: "Serving businesses across 4 states with reliable distribution",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Temperature-controlled trucks for guaranteed freshness",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Daily deliveries available to meet your business needs",
    },
  ];

  return (
    <section id="coverage" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Regional Distribution Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reliable wholesale produce delivery across the Southern United States
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card text-center animate-scale-in border-0" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* States Coverage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {states.map((state, index) => (
            <Card key={index} className="glass-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-up border-0" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-accent-tomato mt-1 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-foreground">{state.name}</h3>
                </div>
                <ul className="space-y-2">
                  {state.cities.map((city, cityIndex) => (
                    <li key={cityIndex} className="text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                      {city}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
