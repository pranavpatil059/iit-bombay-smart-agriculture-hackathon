import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { Toaster } from './components/ui/toaster';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/farmer/Dashboard';
import TransporterDashboard from './pages/transporter/Dashboard';
import BuyerDashboard from './pages/buyer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import LandingPage from './pages/LandingPage';

// Components
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to={`/${user.role}`} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={`/${user.role}`} /> : <Register />} />

          {/* Protected Routes */}
          <Route 
            path="/farmer/*" 
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transporter/*" 
            element={
              <ProtectedRoute allowedRoles={['transporter']}>
                <TransporterDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/buyer/*" 
            element={
              <ProtectedRoute allowedRoles={['buyer']}>
                <BuyerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback Routes */}
          <Route path="/unauthorized" element={<div className="text-center py-20">
            <h1 className="text-2xl font-bold text-red-600">Unauthorized Access</h1>
            <p className="text-gray-600 mt-2">You don't have permission to access this page.</p>
          </div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <AppRoutes />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;