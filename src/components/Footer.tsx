import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
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
              Premium wholesale produce for businesses across the Southern United States.
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
                <span className="text-primary-foreground/80">Serving OK, AR, LA, TX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">orders@superempire.com</span>
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
