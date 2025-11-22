import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { GlassFeatures } from "@/components/GlassFeatures";
import { Products } from "@/components/Products";
import { SeasonalHighlights } from "@/components/SeasonalHighlights";
import { HowItWorks } from "@/components/HowItWorks";
import { Coverage } from "@/components/Coverage";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Newsletter } from "@/components/Newsletter";
import { CTA } from "@/components/CTA";
import { SocialMediaFeed } from "@/components/SocialMediaFeed";
import { MobileAppLinks } from "@/components/MobileAppLinks";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <GlassFeatures />
      <Products />
      <SeasonalHighlights />
      <HowItWorks />
      <Coverage />
      <Testimonials />
      <About />
      <Contact />
      <FAQ />
      <Newsletter />
      <div className="container mx-auto px-4 py-12 space-y-8">
        <SocialMediaFeed />
        <MobileAppLinks />
      </div>
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
