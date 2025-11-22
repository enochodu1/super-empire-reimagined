import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ShoppingCart, label: "Products", path: "/products" },
    { icon: Search, label: "B2B Portal", path: "/b2b" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary/20 dark:text-primary/10 select-none">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. The page might have been moved or deleted.
            </p>
            <code className="text-sm text-muted-foreground mt-4 block bg-muted px-4 py-2 rounded-lg inline-block">
              {location.pathname}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Button onClick={() => navigate("/")} variant="default" className="gap-2">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t pt-8 mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Or try one of these popular pages:
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {quickLinks.map(({ icon: Icon, label, path }) => (
                <Button
                  key={path}
                  onClick={() => navigate(path)}
                  variant="ghost"
                  className="flex-col h-auto py-4 px-2"
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
