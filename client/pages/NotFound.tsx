import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout/Layout';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto text-slate-400 mb-6" size={64} />
          <h1 className="text-4xl font-bold text-slate-900 mb-3">404</h1>
          <p className="text-slate-600 mb-2">Page Not Found</p>
          <p className="text-slate-500 text-sm mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <Home size={20} />
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto text-slate-400 mb-6" size={64} />
          <h1 className="text-4xl font-bold text-slate-900 mb-3">404</h1>
          <p className="text-slate-600 mb-2">Page Not Found</p>
          <p className="text-slate-500 text-sm mb-8">
            The page "{location.pathname}" doesn't exist. Would you like to go back to your dashboard?
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <Home size={20} />
            Go to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
