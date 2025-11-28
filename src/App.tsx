import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQPage from "./pages/FAQ";
import RequirementsPage from "./pages/Requirements";
import SafetyPage from "./pages/Safety";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminReviews from "./pages/AdminReviews";
import VehiclePhotos from "@/pages/VehiclePhotos";
import ResetPassword from "./pages/ResetPassword";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import SitemapRedirect from "./pages/SitemapRedirect";
import BookingConfirmation from "./pages/BookingConfirmation";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/requirements" element={<RequirementsPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/my-bookings" element={<CustomerDashboard />} />
              <Route path="/vehicle-photos" element={<VehiclePhotos />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/2fa" element={<TwoFactorAuth />} />
              <Route path="/booking/:id" element={<BookingConfirmation />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/sitemap.xml" element={<SitemapRedirect />} />
              {/* Redirect old dashboard route to home */}
              <Route path="/dashboard" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
