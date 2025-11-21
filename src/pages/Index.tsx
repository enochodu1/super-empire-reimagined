import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Coverage } from "@/components/Coverage";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Products />
      <Coverage />
      <About />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
