import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-dark-surface-secondary border-t border-gray-200 dark:border-dark-surface-tertiary mt-20 relative z-30 transition-colors duration-300">
      {/* Main Footer Container - Properly aligned with sidebar offset */}
      <div className="w-full">
        <div className="lg:ml-64 px-4 py-8 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            
            {/* Business Hours - Top Section */}
            <div className="bg-gradient-to-r from-light-pink to-light-blue dark:from-dark-accent-pink dark:to-dark-accent-blue rounded-lg p-6 mb-8 transition-colors duration-300">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Header */}
                <div className="flex items-center space-x-3 text-center lg:text-left">
                  <div className="w-12 h-12 bg-white dark:bg-dark-surface-primary bg-opacity-20 dark:bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-dark-gray dark:text-dark-text-primary" />
                  </div>
                  <div>
                    <h3 className="font-lora font-bold text-dark-gray dark:text-dark-text-primary text-lg">Business Hours</h3>
                    <p className="text-sm text-dark-gray dark:text-dark-text-secondary opacity-80">We're here to help you</p>
                  </div>
                </div>
                
                {/* Hours Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto lg:max-w-md">
                  <div className="bg-white dark:bg-dark-surface-primary bg-opacity-20 dark:bg-opacity-30 rounded-lg p-3 text-center">
                    <p className="text-xs text-dark-gray dark:text-dark-text-primary font-medium mb-1">Mon - Fri</p>
                    <p className="text-sm font-bold text-dark-gray dark:text-dark-text-primary">9AM - 8PM</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface-primary bg-opacity-20 dark:bg-opacity-30 rounded-lg p-3 text-center">
                    <p className="text-xs text-dark-gray dark:text-dark-text-primary font-medium mb-1">Saturday</p>
                    <p className="text-sm font-bold text-dark-gray dark:text-dark-text-primary">10AM - 6PM</p>
                  </div>
                  <div className="bg-white dark:bg-dark-surface-primary bg-opacity-20 dark:bg-opacity-30 rounded-lg p-3 text-center">
                    <p className="text-xs text-dark-gray dark:text-dark-text-primary font-medium mb-1">Sunday</p>
                    <p className="text-sm font-bold text-red-600">Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-light-pink to-light-blue dark:from-dark-accent-pink dark:to-dark-accent-blue rounded-full flex items-center justify-center">
                    <span className="text-lg">🌸</span>
                  </div>
                  <div>
                    <h3 className="font-lora font-bold text-dark-gray dark:text-dark-text-primary">Blossom Wrap Studio</h3>
                    <p className="text-xs text-gray-600 dark:text-dark-text-secondary">Makes You Smile</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-dark-text-secondary text-sm leading-relaxed">
                  Creating beautiful handmade gifts and decorations that bring joy to your special moments.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-dark-text-secondary text-sm">
                    <MapPin size={14} className="text-light-pink dark:text-dark-accent-pink flex-shrink-0" />
                    <span>Lahore, Pakistan</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-dark-text-secondary text-sm">
                    <Phone size={14} className="text-light-pink dark:text-dark-accent-pink flex-shrink-0" />
                    <span>+92 300 1234567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-dark-text-secondary text-sm">
                    <Mail size={14} className="text-light-pink dark:text-dark-accent-pink flex-shrink-0" />
                    <span>info@blossomwrap.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3 pt-2">
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-white dark:bg-dark-surface-tertiary rounded-full flex items-center justify-center text-gray-600 dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-dark-accent-pink hover:bg-light-pink dark:hover:bg-dark-accent-pink hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all duration-300 shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-light-pink hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 shadow-sm"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a 
                    href="#" 
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-light-pink hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 shadow-sm"
                    aria-label="Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-lora font-semibold text-dark-gray dark:text-dark-text-primary mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-gray-600 dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-dark-accent-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Contact Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/handmade-flowers" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Handmade Flowers</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/gift-packs" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Gift Packs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>My Wishlist</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>FAQ</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-lora font-semibold text-dark-gray dark:text-dark-text-primary mb-4">Categories</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/products/calligraphy" className="text-gray-600 dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-dark-accent-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Calligraphy</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/birthday-gifts" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Birthday Gifts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/couple-gifts" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Couple Gifts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/gift-packing" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                      <span>Gift Packing</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section - Copyright & Legal Links */}
            <div className="border-t border-gray-200 dark:border-dark-surface-tertiary py-8">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                {/* Copyright */}
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-600 dark:text-dark-text-secondary order-2 lg:order-1">
                  <span>Made with 🩷 by Blossom Wrap Studio Copyright 2025</span>
          {/* Customer Service */}
                </div>
            <h4 className="font-lora font-semibold text-dark-gray dark:text-dark-text-primary mb-4">Customer Service</h4>
                {/* Legal Links */}
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-sm text-gray-600 dark:text-dark-text-secondary order-1 lg:order-2">
                <Link to="/about" className="text-gray-600 dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-dark-accent-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                  <span>About Us</span>
            <h4 className="font-lora font-semibold text-dark-gray dark:text-dark-text-primary mb-4">Policies</h4>
                  >
                    Privacy Policy
                <Link to="/privacy" className="text-gray-600 dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-dark-accent-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                  <span>Privacy Policy</span>
                  <Link 
                    to="/terms" 
                    className="hover:text-light-pink dark:hover:text-dark-accent-pink transition-colors duration-300 hover:underline whitespace-nowrap"
                <Link to="/terms" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                  <span>Terms of Service</span>
                  </Link>
                  <span className="text-gray-300 hidden sm:inline text-xs">•</span>
                  <Link 
                <Link to="/refund-policy" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                  <span>Refund Policy</span>
                  >
                    Shipping Info
                  </Link>
                <Link to="/data-protection" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                  <span>Data Protection</span>
                </Link>
              </li>
              <li>
                <Link to="/consumer-rights" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm flex items-center space-x-2">
                  <span>Consumer Rights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

          {/* Policies */}

export default Footer;