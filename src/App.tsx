import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Index from "./routes/index";
import About from "./routes/about";
import Apply from "./routes/apply";
import Contact from "./routes/contact";
import Pricing from "./routes/pricing";
import Process from "./routes/process";
import Tracks from "./routes/tracks";
import Login from "./routes/login";
import Signup from "./routes/signup";
import Verify from "./routes/verify";
import ForgotPassword from "./routes/forgot-password";

import Checkout from "./routes/checkout";
import CheckoutSuccess from "./routes/checkout.success";
import CheckoutFailed from "./routes/checkout.failed";
import CheckoutPending from "./routes/checkout.pending";

import DashboardLayoutRoute from "./routes/dashboard";
import DashboardIndex from "./routes/dashboard.index";
import DashboardBilling from "./routes/dashboard.billing";
import DashboardCertificates from "./routes/dashboard.certificates";
import DashboardDsa from "./routes/dashboard.dsa";
import DashboardDsaSlug from "./routes/dashboard.dsa.$slug";
import DashboardInterviews from "./routes/dashboard.interviews";
import DashboardJobs from "./routes/dashboard.jobs";
import DashboardProfile from "./routes/dashboard.profile";
import DashboardResume from "./routes/dashboard.resume";
import DashboardSettings from "./routes/dashboard.settings";
import DashboardTraining from "./routes/dashboard.training";

import AdminLayoutRoute from "./routes/admin";
import AdminIndex from "./routes/admin.index";
import AdminCandidates from "./routes/admin.candidates";
import AdminCms from "./routes/admin.cms";
import AdminPayments from "./routes/admin.payments";
import AdminPipeline from "./routes/admin.pipeline";
import AdminRoles from "./routes/admin.roles";

function NotFound() {
  useEffect(() => {
    document.title = "Not Found — S.Nehra";
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // suppress unused-import warning for useNavigate which is used by child routes
  void useNavigate;
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/process" element={<Process />} />
      <Route path="/tracks" element={<Tracks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
      <Route path="/checkout/failed" element={<CheckoutFailed />} />
      <Route path="/checkout/pending" element={<CheckoutPending />} />

      <Route path="/dashboard" element={<DashboardLayoutRoute />}>
        <Route index element={<DashboardIndex />} />
        <Route path="billing" element={<DashboardBilling />} />
        <Route path="certificates" element={<DashboardCertificates />} />
        <Route path="dsa" element={<DashboardDsa />} />
        <Route path="dsa/:slug" element={<DashboardDsaSlug />} />
        <Route path="interviews" element={<DashboardInterviews />} />
        <Route path="jobs" element={<DashboardJobs />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="resume" element={<DashboardResume />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="training" element={<DashboardTraining />} />
      </Route>

      <Route path="/admin" element={<AdminLayoutRoute />}>
        <Route index element={<AdminIndex />} />
        <Route path="candidates" element={<AdminCandidates />} />
        <Route path="cms" element={<AdminCms />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="pipeline" element={<AdminPipeline />} />
        <Route path="roles" element={<AdminRoles />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
