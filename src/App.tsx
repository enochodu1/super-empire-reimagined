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
const B2BPortal = lazy(() => import("./pages/B2BPortal"));
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
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Services = lazy(() => import("./pages/Services"));
const FAQ = lazy(() => import("./pages/FAQ"));
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
                    <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                    <Route path="/notifications" element={<ProtectedRoute><NotificationPreferences /></ProtectedRoute>} />
                    <Route path="/documents" element={<ProtectedRoute><DocumentManagement /></ProtectedRoute>} />
                    <Route path="/standing-orders" element={<ProtectedRoute><StandingOrders /></ProtectedRoute>} />
                    <Route path="/multi-location" element={<ProtectedRoute><MultiLocationManagement /></ProtectedRoute>} />
                    <Route path="/advanced-features" element={<ProtectedRoute><AdvancedFeatures /></ProtectedRoute>} />

                    {/* Public Pages */}
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/faq" element={<FAQ />} />

                    {/* Auth & Admin */}
                    <Route path="/admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

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
