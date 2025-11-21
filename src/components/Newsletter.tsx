import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-brand-green to-accent" />
      
      {/* Glass Overlay */}
      <div className="absolute inset-0 glass-dark" />

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 glass rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-10 left-10 w-72 h-72 glass rounded-full blur-3xl opacity-15" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-6 animate-scale-in">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            Stay Fresh with Our Newsletter
          </h2>
          <p className="text-xl text-white/90 mb-8 animate-fade-up">
            Get weekly updates on seasonal produce, special offers, and industry insights delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-up">
            <Input
              type="email"
              placeholder="Enter your business email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-card border-white/20 text-foreground placeholder:text-muted-foreground flex-1 h-12"
              required
            />
            <Button
              type="submit"
              className="bg-accent-tomato hover:bg-accent-tomato/90 text-white border-0 h-12 px-8"
            >
              Subscribe
            </Button>
          </form>

          <p className="text-white/70 text-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};
