import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import TemplateMarketplace from './pages/template-marketplace';
import Dashboard from './pages/dashboard';
import PublishWebsite from './pages/publish-website';
import Register from './pages/register';
import WebsiteBuilder from './pages/website-builder';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<TemplateMarketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/template-marketplace" element={<TemplateMarketplace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/publish-website" element={<PublishWebsite />} />
        <Route path="/register" element={<Register />} />
        <Route path="/website-builder" element={<WebsiteBuilder />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
