import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { categories } from '../data/products';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-20 h-full w-64 bg-white shadow-lg z-40 transition-all duration-300 hover:bg-opacity-95">
        <div className="p-6">
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

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-light-pink text-dark-gray p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300"
      >
        <Home size={20} />
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-6">
              <Link
                to="/"
                className="flex items-center space-x-3 text-dark-gray hover:text-light-pink transition-colors duration-300 mb-6 p-3 rounded-lg hover:bg-light-pink hover:bg-opacity-20"
                onClick={() => setIsOpen(false)}
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