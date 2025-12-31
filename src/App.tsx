import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { TrackingHandler } from "./components/TrackingHandler";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const UserDashboard = lazy(() => import("./pages/dashboard/UserDashboard"));
const CoachDashboard = lazy(() => import("./pages/dashboard/CoachDashboard"));
const CoachRegistrationForm = lazy(() => import("./components/cricket/CoachRegistrationForm"));
const CoachLogin = lazy(() => import("./components/cricket/CoachLogin"));
const InfluencerDashboard = lazy(() => import("./pages/dashboard/InfluencerDashboard"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

const queryClient = new QueryClient();

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-transparent">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TrackingHandler />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={< RegistrationForm />} /> */}
            <Route path="/dashboard" element={<UserDashboard />} />

            {/* Coach & Influencer Routes */}
            <Route path="/coach/register" element={<CoachRegistrationForm />} />
            <Route path="/coach-register" element={<CoachRegistrationForm />} /> {/* Alias */}
            <Route path="/coach-login" element={<CoachLogin />} />
            <Route path="/coach/dashboard" element={<CoachDashboard />} />
            <Route path="/influencer/dashboard" element={<InfluencerDashboard />} />

            {/* Admin Routes */}
            <Route path="/admin/landing/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
