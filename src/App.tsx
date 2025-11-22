import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useEffect } from "react";
import { initEmailJS } from "@/lib/emailService";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import B2BPortal from "./pages/B2BPortal";
import InventoryManagement from "./pages/InventoryManagement";
import BuyerDashboard from "./pages/BuyerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import VendorApplication from "./pages/VendorApplication";
import BuyerRegistration from "./pages/BuyerRegistration";
import RFPRequest from "./pages/RFPRequest";
import RFPManagement from "./pages/RFPManagement";
import RewardsProgram from "./pages/RewardsProgram";
import SeasonalCalendar from "./pages/SeasonalCalendar";
import RecipeBlog from "./pages/RecipeBlog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// GitHub Pages basename - matches vite.config.ts base path
const basename = import.meta.env.PROD ? '/super-empire-reimagined' : '';

const App = () => {
  useEffect(() => {
    // Initialize EmailJS on app startup
    initEmailJS();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename={basename}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/b2b" element={<B2BPortal />} />

                  {/* Dashboards */}
                  <Route path="/inventory" element={<ProtectedRoute><InventoryManagement /></ProtectedRoute>} />
                  <Route path="/buyer-dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
                  <Route path="/vendor-dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />

                  {/* Registration & Applications */}
                  <Route path="/vendor-application" element={<VendorApplication />} />
                  <Route path="/buyer-registration" element={<BuyerRegistration />} />

                  {/* RFP System */}
                  <Route path="/rfp-request" element={<ProtectedRoute><RFPRequest /></ProtectedRoute>} />
                  <Route path="/rfp-list" element={<ProtectedRoute><RFPManagement /></ProtectedRoute>} />

                  {/* Features */}
                  <Route path="/rewards" element={<ProtectedRoute><RewardsProgram /></ProtectedRoute>} />
                  <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
                  <Route path="/recipes" element={<RecipeBlog />} />

                  {/* Auth & Admin */}
                  <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
