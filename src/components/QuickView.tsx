import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, Plus, Minus } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from './LoadingSpinner';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { addNotification } = useNotification();

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (product.isUpcoming) {
      addNotification({
        type: 'warning',
        title: 'Product Coming Soon',
        message: 'This product is not available yet.'
      });
      return;
    }

    setIsAddingToCart(true);
    
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAddingToCart(false);
      addNotification({
        type: 'success',
        title: 'Added to Cart!',
        message: `${quantity} x ${product.name} added to your cart.`
      });
      onClose();
    }, 500);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      addNotification({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${product.name} has been removed from your wishlist.`
      });
    } else {
      addToWishlist(product);
      addNotification({
        type: 'success',
        title: 'Added to Wishlist!',
        message: `${product.name} has been added to your wishlist.`
      });
    }
  };

  if (!isOpen || !product) return null;

  const maxQuantity = product.inventory?.remaining || 1;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-dark-gray">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.isUpcoming && (
                <div className="bg-light-pink text-dark-gray px-4 py-2 rounded-full text-sm font-medium inline-block">
                  Coming Soon
                </div>
              )}
              
              <div>
                <h1 className="font-lora text-2xl font-bold text-dark-gray mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-600 ml-2">(4.8)</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-dark-gray">
                  PKR {product.price.toLocaleString()}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Information */}
              {product.inventory && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Stock Level</span>
                    <span className="text-sm font-medium text-dark-gray">
                      {product.inventory.remaining} available
                    </span>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              {!product.isUpcoming && product.inventory?.remaining > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-dark-gray">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100 transition-colors duration-200"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                        className="p-2 hover:bg-gray-100 transition-colors duration-200"
                        disabled={quantity >= maxQuantity}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.isUpcoming || product.inventory?.remaining === 0}
                  className="w-full bg-light-pink text-dark-gray px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? (
                    <LoadingSpinner size="sm" color="border-dark-gray" />
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      <span>
                        {product.isUpcoming 
                          ? 'Coming Soon' 
                          : product.inventory?.remaining === 0 
                          ? 'Out of Stock' 
                          : 'Add to Cart'
                        }
                      </span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className={`w-full px-6 py-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-light-pink hover:text-light-pink'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;