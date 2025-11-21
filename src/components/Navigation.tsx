import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">SE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Super Empire</h1>
              <p className="text-xs text-muted-foreground">Produce</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              Browse Products
            </Link>
            <a href="/#coverage" className="text-foreground hover:text-primary transition-colors font-medium">
              Coverage
            </a>
            <a href="/#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <Button
              variant="outline"
              size="lg"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cartCount > 0 && (
                <Badge className="ml-2 bg-green-600 text-white px-2 py-0.5">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button variant="hero" size="lg" onClick={() => navigate('/products')}>
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link
              to="/"
              className="block text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Browse Products
            </Link>
            <a
              href="/#coverage"
              className="block text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Coverage
            </a>
            <a
              href="/#about"
              className="block text-foreground hover:text-primary transition-colors py-2 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <Button
              variant="outline"
              size="lg"
              className="w-full relative"
              onClick={() => {
                navigate('/cart');
                setIsOpen(false);
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {cartCount > 0 && (
                <Badge className="ml-2 bg-green-600 text-white px-2 py-0.5">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={() => {
                navigate('/products');
                setIsOpen(false);
              }}
            >
              Order Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
