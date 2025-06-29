import React from 'react';
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 relative z-30">
      <div className="container mx-auto px-4 py-12 lg:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-light-pink to-light-blue rounded-full flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <div>
                <h3 className="font-lora font-bold text-dark-gray text-lg">Blossom Wrap Studio</h3>
                <p className="text-sm text-gray-600">Makes You Smile</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Creating beautiful handmade gifts and decorations that bring joy to your special moments. 
              We specialize in custom flowers, gift packaging, and personalized items that make every occasion memorable.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin size={16} className="text-light-pink" />
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={16} className="text-light-pink" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={16} className="text-light-pink" />
                <span>info@blossomwrap.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-light-pink hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 shadow-sm"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-light-pink hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-light-pink hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-light-pink transition-colors duration-300 flex items-center space-x-2">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-light-pink transition-colors duration-300 flex items-center space-x-2">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products/handmade-flowers" className="text-gray-600 hover:text-light-pink transition-colors duration-300 flex items-center space-x-2">
                  <span>Handmade Flowers</span>
                </Link>
              </li>
              <li>
                <Link to="/products/gift-packs" className="text-gray-600 hover:text-light-pink transition-colors duration-300 flex items-center space-x-2">
                  <span>Gift Packs</span>
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-light-pink transition-colors duration-300 flex items-center space-x-2">
                  <span>My Wishlist</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products/calligraphy" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Calligraphy
                </Link>
              </li>
              <li>
                <Link to="/products/birthday-gifts" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Birthday Gifts
                </Link>
              </li>
              <li>
                <Link to="/products/couple-gifts" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Couple Gifts
                </Link>
              </li>
              <li>
                <Link to="/products/gift-packing" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Gift Packing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-600 flex items-center space-x-2 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-light-pink fill-current" />
              <span>by Blossom Wrap Studio © 2024</span>
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <Link to="/privacy" className="hover:text-light-pink transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-light-pink transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/shipping" className="hover:text-light-pink transition-colors duration-300">
                Shipping Info
              </Link>
            </div>
          </div>
          
          {/* Business Hours */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <h5 className="font-semibold text-dark-gray mb-3 text-sm">Business Hours</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="text-dark-gray font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="text-dark-gray font-medium">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="text-red-500 font-medium">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;