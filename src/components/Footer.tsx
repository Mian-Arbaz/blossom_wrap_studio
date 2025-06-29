import React from 'react';
import { Heart, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20 relative z-30">
      <div className="container mx-auto px-4 py-12 lg:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-light-pink to-light-blue rounded-full flex items-center justify-center">
                <span className="text-lg">🌸</span>
              </div>
              <div>
                <h3 className="font-lora font-bold text-dark-gray">Blossom Wrap Studio</h3>
                <p className="text-sm text-gray-600">Makes You Smile</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Creating beautiful handmade gifts and decorations that bring joy to your special moments.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/products/handmade-flowers" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Handmade Flowers
                </a>
              </li>
              <li>
                <a href="/products/gift-packs" className="text-gray-600 hover:text-light-pink transition-colors duration-300">
                  Gift Packs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-lora font-semibold text-dark-gray mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-600">
              <p>📍 Lahore, Pakistan</p>
              <p>📞 +92 300 1234567</p>
              <p>✉️ info@blossomwrap.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart size={16} className="text-light-pink fill-current" />
            <span>by Blossom Wrap Studio © 2024</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;