import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Dashboard from './pages/dashboard';
import MusicUpload from './pages/music-upload';
import RevenueManagement from './pages/revenue-management';
import ReleaseManagement from './pages/release-management';
import ProfileManagement from './pages/profile-management';
import PlatformSettings from './pages/platform-settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/music-upload" element={<MusicUpload />} />
        <Route path="/revenue-management" element={<RevenueManagement />} />
        <Route path="/release-management" element={<ReleaseManagement />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/platform-settings" element={<PlatformSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;