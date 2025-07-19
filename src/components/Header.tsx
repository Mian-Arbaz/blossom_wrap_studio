import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'Upcoming Products', href: '/upcoming-products' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-dark-surface-primary shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BW</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-dark-text-primary transition-colors duration-300">
              Blossom Wrap Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-pink-600 dark:text-dark-accent-pink bg-pink-50 dark:bg-dark-surface-secondary'
                    : 'text-gray-700 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink hover:bg-gray-50 dark:hover:bg-dark-surface-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-600 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink transition-colors duration-200"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <button className="relative p-2 text-gray-600 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink transition-colors duration-200">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink transition-colors duration-200">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block text-sm">{user.name}</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-dark-surface-tertiary">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-dark-surface-tertiary">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-dark-surface-primary">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-pink-600 dark:text-dark-accent-pink bg-pink-50 dark:bg-dark-surface-secondary'
                      : 'text-gray-700 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink hover:bg-gray-50 dark:hover:bg-dark-surface-secondary'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-surface-tertiary">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink hover:bg-gray-50 dark:hover:bg-dark-surface-secondary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-dark-text-secondary hover:text-pink-600 dark:hover:text-dark-accent-pink hover:bg-gray-50 dark:hover:bg-dark-surface-secondary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;