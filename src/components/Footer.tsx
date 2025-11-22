import { MapPin, Phone, Mail } from "lucide-react";
import { COMPANY_INFO, getFormattedPhone, getCallUrl, getEmailUrl } from "@/lib/companyInfo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You've been subscribed to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/10 rounded-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Subscribe to Our Monthly Newsletter
            </h3>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Get updates on seasonal produce, special deals, and promotions
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
              <Button type="submit" className="bg-accent-tomato hover:bg-accent-tomato/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent-tomato rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SE</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Super Empire</h3>
                <p className="text-sm text-primary-foreground/80">Produce</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              {COMPANY_INFO.description.short}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-accent-tomato transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-primary-foreground/80 hover:text-accent-tomato transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#coverage" className="text-primary-foreground/80 hover:text-accent-tomato transition-colors">
                  Coverage Area
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent-tomato transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Fresh Vegetables</li>
              <li>Premium Fruits</li>
              <li>Seasonal Specials</li>
              <li>Bulk Orders</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">{COMPANY_INFO.address.formatted}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href={getCallUrl()} className="text-primary-foreground/80 hover:text-accent-tomato transition-colors">
                  {getFormattedPhone()}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href={getEmailUrl()} className="text-primary-foreground/80 hover:text-accent-tomato transition-colors">
                  {COMPANY_INFO.contacts.sales.name}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Super Empire Produce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
