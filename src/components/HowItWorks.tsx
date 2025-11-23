import { Phone, ShoppingCart, Truck, ThumbsUp } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Phone,
      number: "01",
      title: "Contact Us",
      description: "Reach out via phone, email, or our contact form. Tell us about your business needs.",
    },
    {
      icon: ShoppingCart,
      number: "02",
      title: "Place Your Order",
      description: "Work with your dedicated account manager to select products and schedule delivery.",
    },
    {
      icon: Truck,
      number: "03",
      title: "We Deliver",
      description: "Receive fresh produce delivered directly to your business in temperature-controlled trucks.",
    },
    {
      icon: ThumbsUp,
      number: "04",
      title: "Enjoy Quality",
      description: "Serve premium produce to your customers and reorder whenever you need a restock.",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started with Grocery Empire is simple. Follow these four easy steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Step Number */}
                <div className="glass-card rounded-2xl p-8 text-center relative z-10 border-0 glass-hover">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 glass-dark rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-sm backdrop-blur-xl">
                    {step.number}
                  </div>
                  
                  <div className="inline-flex items-center justify-center w-20 h-20 glass rounded-2xl mb-6 mt-4">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
