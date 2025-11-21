import { Shield, Truck, Award, Clock } from "lucide-react";

export const GlassFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every product meets strict quality standards",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Temperature-controlled transportation",
    },
    {
      icon: Award,
      title: "Premium Selection",
      description: "Hand-picked from trusted growers",
    },
    {
      icon: Clock,
      title: "Always Fresh",
      description: "Daily restocking from local farms",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />
      
      {/* Decorative Glass Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 glass rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 glass rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center glass-hover animate-fade-up border-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
