import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { lazy, Suspense, useEffect } from "react";
import { initEmailJS } from "@/lib/emailService";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";

// Lazy load all page components for better performance
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const InventoryManagement = lazy(() => import("./pages/InventoryManagement"));
const BuyerDashboard = lazy(() => import("./pages/BuyerDashboard"));
const VendorDashboard = lazy(() => import("./pages/VendorDashboard"));
const VendorApplication = lazy(() => import("./pages/VendorApplication"));
const BuyerRegistration = lazy(() => import("./pages/BuyerRegistration"));
const RFPRequest = lazy(() => import("./pages/RFPRequest"));
const RFPManagement = lazy(() => import("./pages/RFPManagement"));
const RewardsProgram = lazy(() => import("./pages/RewardsProgram"));
const SeasonalCalendar = lazy(() => import("./pages/SeasonalCalendar"));
const RecipeBlog = lazy(() => import("./pages/RecipeBlog"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const NotificationPreferences = lazy(() => import("./pages/NotificationPreferences"));
const DocumentManagement = lazy(() => import("./pages/DocumentManagement"));
const StandingOrders = lazy(() => import("./pages/StandingOrders"));
const MultiLocationManagement = lazy(() => import("./pages/MultiLocationManagement"));
const AdvancedFeatures = lazy(() => import("./pages/AdvancedFeatures"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// GitHub Pages basename - matches vite.config.ts base path
const basename = import.meta.env.PROD ? '/super-empire-reimagined' : '';

const App = () => {
  useEffect(() => {
    // Initialize EmailJS on app startup
    initEmailJS();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter basename={basename}>
                  <ScrollToTop />
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Dashboards - DEMO MODE: No auth required */}
                    <Route path="/inventory" element={<InventoryManagement />} />
                    <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                    <Route path="/vendor-dashboard" element={<VendorDashboard />} />

                    {/* Registration & Applications */}
                    <Route path="/vendor-application" element={<VendorApplication />} />
                    <Route path="/buyer-registration" element={<BuyerRegistration />} />

                    {/* RFP System - DEMO MODE: No auth required */}
                    <Route path="/rfp-request" element={<RFPRequest />} />
                    <Route path="/rfp-list" element={<RFPManagement />} />

                    {/* Features - DEMO MODE: No auth required */}
                    <Route path="/rewards" element={<RewardsProgram />} />
                    <Route path="/seasonal-calendar" element={<SeasonalCalendar />} />
                    <Route path="/recipes" element={<RecipeBlog />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/notifications" element={<NotificationPreferences />} />
                    <Route path="/documents" element={<DocumentManagement />} />
                    <Route path="/standing-orders" element={<StandingOrders />} />
                    <Route path="/multi-location" element={<MultiLocationManagement />} />
                    <Route path="/advanced-features" element={<AdvancedFeatures />} />

                    {/* Auth & Admin - DEMO MODE: No auth required */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
