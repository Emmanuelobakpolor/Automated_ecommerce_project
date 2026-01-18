import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Auth Pages
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

// Protected Pages
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import AddProduct from "@/pages/AddProduct";
import EditProduct from "@/pages/EditProduct";
import Orders from "@/pages/Orders";
import OrderDetails from "@/pages/OrderDetails";
import BotSettings from "@/pages/BotSettings";
import NotificationsPage from "@/pages/Notifications";
import PaymentSettings from "@/pages/PaymentSettings";
import GeneralSettings from "@/pages/GeneralSettings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/new"
                  element={
                    <ProtectedRoute>
                      <AddProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products/:productId/edit"
                  element={
                    <ProtectedRoute>
                      <EditProduct />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:orderId"
                  element={
                    <ProtectedRoute>
                      <OrderDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bot-settings"
                  element={
                    <ProtectedRoute>
                      <BotSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment-settings"
                  element={
                    <ProtectedRoute>
                      <PaymentSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <GeneralSettings />
                    </ProtectedRoute>
                  }
                />

                {/* Root redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Catch-all 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
