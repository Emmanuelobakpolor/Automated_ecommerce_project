import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ email: 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            ChatBot
          </h1>
          <p className="text-slate-600">Sales Platform Login</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome Back</h2>
          <p className="text-slate-500 text-sm mb-6">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                    errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'
                  )}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                    errors.password ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2',
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:scale-105'
              )}
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="text-sm text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-xs text-slate-600 mb-2">Demo Credentials:</p>
            <p className="text-xs font-mono text-slate-700">Email: demo@example.com</p>
            <p className="text-xs font-mono text-slate-700">Password: demo123</p>
          </div>

          {/* Signup Link */}
          <p className="text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
