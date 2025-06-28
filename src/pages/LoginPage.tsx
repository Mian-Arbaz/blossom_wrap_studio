import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (type: 'admin' | 'user') => {
    if (type === 'admin') {
      setEmail('admin@blossomwrap.com');
      setPassword('admin123');
    } else {
      setEmail('user@example.com');
      setPassword('user123');
    }
  };

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-light-pink to-light-blue flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-light-pink to-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌸</span>
            </div>
            <h2 className="font-lora text-2xl font-bold text-dark-gray">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {/* Demo Login Buttons */}
          <div className="mb-6 space-y-2">
            <p className="text-sm text-gray-600 text-center mb-3">Quick Demo Login:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="flex-1 bg-gray-100 text-dark-gray px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors duration-300"
              >
                Admin Demo
              </button>
              <button
                onClick={() => handleDemoLogin('user')}
                className="flex-1 bg-gray-100 text-dark-gray px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors duration-300"
              >
                User Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-gray mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark-gray mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-light-pink text-dark-gray py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-dark-gray border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-light-pink hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-6 bg-white bg-opacity-80 rounded-lg p-4 text-sm text-gray-600">
          <p className="font-medium mb-2">Demo Credentials:</p>
          <p><strong>Admin:</strong> admin@blossomwrap.com / admin123</p>
          <p><strong>User:</strong> Create new account or use demo button</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;