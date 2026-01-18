import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User, Building, Eye, EyeOff, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.businessName) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.businessName
      );
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: 'Signup failed. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            ChatBot
          </h1>
          <p className="text-slate-600">Sales Platform</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Create Account</h2>
          <p className="text-slate-500 text-sm mb-6">Join us and start selling today</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={cn(
                    'w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                    errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'
                  )}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-2">
                Business Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Store"
                  className={cn(
                    'w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                    errors.businessName ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'
                  )}
                />
              </div>
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={cn(
                    'w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                    errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'
                  )}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={cn(
                    'w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors',
                    errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 mt-6',
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:scale-105'
              )}
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
