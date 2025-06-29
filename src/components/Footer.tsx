import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 relative z-30">
      <div className="container mx-auto px-4 py-8 lg:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <MapPin size={14} className="text-light-pink" />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Phone size={14} className="text-light-pink" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Mail size={14} className="text-light-pink" />
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

          {/* Categories & Business Hours */}
          <div>
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Categories</h4>
            <ul className="space-y-2 mb-6">
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

            {/* Business Hours - Compact */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <h5 className="font-semibold text-dark-gray mb-2 text-sm">Business Hours</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mon - Fri</span>
                  <span className="text-dark-gray font-medium">9AM - 8PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-dark-gray font-medium">10AM - 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Compact */}
        <div className="border-t border-gray-200 mt-6 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-gray-600 flex items-center space-x-1 text-sm">
              <span>Made with</span>
              <Heart size={14} className="text-light-pink fill-current" />
              <span>by Blossom Wrap Studio © 2024</span>
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <Link to="/privacy" className="hover:text-light-pink transition-colors duration-300">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-light-pink transition-colors duration-300">
                Terms
              </Link>
              <Link to="/shipping" className="hover:text-light-pink transition-colors duration-300">
                Shipping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;