import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 relative z-30">
      <div className="container mx-auto px-4 py-8 lg:ml-64">
        {/* Business Hours - Top Section */}
        <div className="bg-gradient-to-r from-light-pink to-light-blue rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Clock size={20} className="text-dark-gray" />
              </div>
              <div>
                <h3 className="font-lora font-bold text-dark-gray">Business Hours</h3>
                <p className="text-sm text-dark-gray opacity-80">We're here to help you</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-xs text-dark-gray font-medium">Monday - Friday</p>
                <p className="text-sm font-bold text-dark-gray">9:00 AM - 8:00 PM</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-xs text-dark-gray font-medium">Saturday</p>
                <p className="text-sm font-bold text-dark-gray">10:00 AM - 6:00 PM</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <p className="text-xs text-dark-gray font-medium">Sunday</p>
                <p className="text-sm font-bold text-red-600">Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-light-pink to-light-blue rounded-full flex items-center justify-center">
                <span className="text-lg">🌸</span>
              </div>
              <div>
                <h3 className="font-lora font-bold text-dark-gray">Blossom Wrap Studio</h3>
                <p className="text-xs text-gray-600">Makes You Smile</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Creating beautiful handmade gifts and decorations that bring joy to your special moments.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <MapPin size={14} className="text-light-pink flex-shrink-0" />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Phone size={14} className="text-light-pink flex-shrink-0" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Mail size={14} className="text-light-pink flex-shrink-0" />
                <span>info@blossomwrap.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-light-pink hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 shadow-sm"
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
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products/handmade-flowers" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Handmade Flowers
                </Link>
              </li>
              <li>
                <Link to="/products/gift-packs" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Gift Packs
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products/calligraphy" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Calligraphy
                </Link>
              </li>
              <li>
                <Link to="/products/birthday-gifts" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Birthday Gifts
                </Link>
              </li>
              <li>
                <Link to="/products/couple-gifts" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Couple Gifts
                </Link>
              </li>
              <li>
                <Link to="/products/gift-packing" className="text-gray-600 hover:text-light-pink transition-colors duration-300 text-sm">
                  Gift Packing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal Links */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex items-center justify-center lg:justify-start space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart size={14} className="text-light-pink fill-current" />
              <span>by Blossom Wrap Studio © 2024</span>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-600">
              <Link 
                to="/privacy" 
                className="hover:text-light-pink transition-colors duration-300 hover:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-light-pink transition-colors duration-300 hover:underline"
              >
                Terms of Service
              </Link>
              <Link 
                to="/shipping" 
                className="hover:text-light-pink transition-colors duration-300 hover:underline"
              >
                Shipping Info
              </Link>
              <Link 
                to="/returns" 
                className="hover:text-light-pink transition-colors duration-300 hover:underline"
              >
                Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;