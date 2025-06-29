import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import ProductCard from '../components/ProductCard';

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();
  const { addNotification } = useNotification();

  const handleAddAllToCart = () => {
    wishlistItems.forEach(product => {
      if (!product.isUpcoming && product.inventory?.remaining !== 0) {
        addToCart(product);
      }
    });
    
    addNotification({
      type: 'success',
      title: 'Added to Cart!',
      message: 'Available items from your wishlist have been added to cart.'
    });
  };

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
              <Heart size={24} className="text-dark-gray" />
            </div>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                My Wishlist
              </h1>
              <p className="text-dark-gray mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-light-pink rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-dark-gray" />
              </div>
              <h3 className="text-2xl font-semibold text-dark-gray mb-4">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start adding products you love to your wishlist. You can save items for later 
                and easily find them when you're ready to purchase.
              </p>
              <Link
                to="/"
                className="bg-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
                <h2 className="text-xl font-semibold text-dark-gray">
                  {wishlistItems.length} Saved {wishlistItems.length === 1 ? 'Item' : 'Items'}
                </h2>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleAddAllToCart}
                    className="bg-light-pink text-dark-gray px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2 font-medium"
                  >
                    <ShoppingBag size={16} />
                    <span>Add All to Cart</span>
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {wishlistItems.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="mt-16 pt-16 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-dark-gray mb-6 text-center">
                  You Might Also Like
                </h3>
                <div className="text-center">
                  <Link
                    to="/"
                    className="text-light-pink hover:underline font-medium"
                  >
                    Explore More Products →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;