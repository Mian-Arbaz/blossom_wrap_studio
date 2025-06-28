import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft, Bell } from 'lucide-react';
import { getUpcomingProducts } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

const UpcomingProductsPage: React.FC = () => {
  const [upcomingProducts, setUpcomingProducts] = useState<any[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setUpcomingProducts(getUpcomingProducts());
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="lg:ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-light-pink rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell size={24} className="text-dark-gray" />
          </div>
          <h2 className="text-2xl font-bold text-dark-gray mb-4">Members Only</h2>
          <p className="text-gray-600 mb-6">
            Please log in to view upcoming products and get early access to our latest items.
          </p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="border-2 border-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-light-pink to-light-blue py-12 px-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-dark-gray hover:text-white transition-colors duration-300 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Clock size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                Upcoming Products
              </h1>
              <p className="text-dark-gray mt-2">
                Exclusive preview for our members - Get ready for something special!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          {upcomingProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-light-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-dark-gray" />
              </div>
              <h3 className="text-2xl font-semibold text-dark-gray mb-4">
                No Upcoming Products Yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We're working on some amazing new products! Check back soon for exciting updates 
                and be the first to know when they're available.
              </p>
              <Link
                to="/"
                className="bg-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
              >
                Browse Current Products
              </Link>
            </div>
          ) : (
            <>
              {/* Info Banner */}
              <div className="bg-light-pink bg-opacity-20 border border-light-pink rounded-lg p-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-light-pink rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell size={16} className="text-dark-gray" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-gray mb-2">Member Exclusive Preview</h3>
                    <p className="text-gray-700">
                      These products are coming soon! As a member, you get early access to see what's 
                      in development. We'll notify you when they become available for order.
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {upcomingProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16">
                <h3 className="font-lora text-2xl font-bold text-dark-gray mb-4">
                  Want to be notified?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Follow us on social media or contact us on WhatsApp to get updates 
                  when these products become available.
                </p>
                <button
                  onClick={() => {
                    const message = 'Hi! Please notify me when the upcoming products are available.';
                    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 font-medium"
                >
                  Get Notified on WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProductsPage;