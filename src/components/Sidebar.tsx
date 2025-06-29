import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, X } from 'lucide-react';
import { categories } from '../data/products';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-20 bottom-0 w-64 bg-white shadow-lg z-40 transition-all duration-300 hover:bg-opacity-95 overflow-y-auto">
        <div className="p-6 pb-32"> {/* Added extra bottom padding */}
          <Link
            to="/"
            className="flex items-center space-x-3 text-dark-gray hover:text-light-pink transition-colors duration-300 mb-6 p-3 rounded-lg hover:bg-light-pink hover:bg-opacity-20"
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>
          
          <div>
            <h3 className="font-lora font-semibold text-dark-gray mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products/${category.id}`}
                    className="flex items-center justify-between text-dark-gray hover:text-light-pink transition-colors duration-300 p-3 rounded-lg hover:bg-light-pink hover:bg-opacity-20 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 bg-light-pink text-dark-gray p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Toggle navigation menu"
      >
        <Home size={20} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
            onClick={() => setIsOpen(false)} 
          />
          <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-out overflow-y-auto">
            <div className="p-6 pb-32"> {/* Added extra bottom padding */}
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-light-pink to-light-blue rounded-full flex items-center justify-center">
                    <span className="text-lg">🌸</span>
                  </div>
                  <div>
                    <h2 className="font-lora font-bold text-dark-gray">Blossom Wrap</h2>
                    <p className="text-xs text-gray-600">Makes You Smile</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Home Link */}
              <Link
                to="/"
                className="flex items-center space-x-3 text-dark-gray hover:text-light-pink transition-colors duration-300 mb-6 p-3 rounded-lg hover:bg-light-pink hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
              
              {/* Categories */}
              <div>
                <h3 className="font-lora font-semibold text-dark-gray mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/products/${category.id}`}
                        className="flex items-center justify-between text-dark-gray hover:text-light-pink transition-colors duration-300 p-3 rounded-lg hover:bg-light-pink hover:bg-opacity-20 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Content Spacer for Desktop */}
      <div className="hidden lg:block w-64"></div>
    </>
  );
};

export default Sidebar;