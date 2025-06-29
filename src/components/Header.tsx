import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Package, Search, ShoppingBag, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import SearchBar from './SearchBar';
import CartSidebar from './CartSidebar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getTotalItems, wishlistItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-light-pink to-light-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🌸</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-lora font-bold text-xl text-dark-gray">Blossom Wrap Studio</h1>
                <p className="text-sm text-gray-600 font-poppins">Makes You Smile</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium">
                Home
              </Link>
              <Link to="/products" className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium">
                All Products
              </Link>
              <Link to="/contact" className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium">
                Contact
              </Link>
              {isAuthenticated && (
                <Link to="/upcoming" className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium">
                  Upcoming Products
                </Link>
              )}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-dark-gray hover:text-light-pink transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                className="relative p-2 text-dark-gray hover:text-light-pink transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-dark-gray hover:text-light-pink transition-colors duration-300"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-light-pink text-dark-gray text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-dark-gray hover:text-light-pink transition-colors duration-300"
                  >
                    <User size={20} />
                    <span className="hidden sm:block font-medium max-w-[120px] truncate">{user?.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-medium text-dark-gray truncate">{user?.name}</p>
                        <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-dark-gray hover:bg-light-pink hover:bg-opacity-20 transition-colors duration-300"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings size={16} />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <Link
                        to="/upcoming"
                        className="flex items-center space-x-2 px-4 py-2 text-dark-gray hover:bg-light-pink hover:bg-opacity-20 transition-colors duration-300 lg:hidden"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package size={16} />
                        <span>Upcoming Products</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-dark-gray hover:bg-light-pink hover:bg-opacity-20 transition-colors duration-300"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-light-pink text-dark-gray px-4 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden text-dark-gray hover:text-light-pink transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  to="/"
                  className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  to="/contact"
                  className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-dark-gray hover:text-light-pink transition-colors duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;