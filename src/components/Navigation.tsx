import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, User, LogOut, Package, Building2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
            <Link to="/b2b" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
              <Building2 className="h-4 w-4" />
              B2B Portal
              <Badge className="bg-accent-orange text-white text-xs">Wholesale</Badge>
            </Link>
            <a href="/#coverage" className="text-foreground hover:text-primary transition-colors font-medium">
              Coverage
            </a>
            <a href="/#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <ThemeToggle />
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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg">
                    <User className="h-5 w-5 mr-2" />
                    {profile?.full_name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile?tab=orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="hero" size="lg" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
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
            <Link
              to="/b2b"
              className="block text-foreground hover:text-primary transition-colors py-2 font-medium flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Building2 className="h-4 w-4" />
              B2B Portal (Wholesale)
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
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground font-medium">Theme</span>
              <ThemeToggle />
            </div>
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
            {user ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    navigate('/profile');
                    setIsOpen(false);
                  }}
                >
                  <User className="h-5 w-5 mr-2" />
                  My Account
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
