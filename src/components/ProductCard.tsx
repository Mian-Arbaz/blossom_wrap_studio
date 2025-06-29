import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from './LoadingSpinner';
import OptimizedImage from './OptimizedImage';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { addNotification } = useNotification();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.isUpcoming) {
      addNotification({
        type: 'warning',
        title: 'Product Coming Soon',
        message: 'This product is not available yet. We\'ll notify you when it\'s ready!'
      });
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
      addNotification({
        type: 'success',
        title: 'Added to Cart!',
        message: `${product.name} has been added to your cart.`
      });
    }, 500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const getStockStatus = () => {
    if (!product.inventory) return null;
    
    const { remaining, lowStockThreshold } = product.inventory;
    
    if (remaining === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (remaining <= lowStockThreshold) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return null;
  };

  const stockStatus = getStockStatus();

  // Generate placeholder for better loading experience
  const placeholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="16">
        Loading...
      </text>
    </svg>
  `)}`;

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in transform hover:scale-105">
        <div className="relative overflow-hidden h-48">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            className="w-full h-full"
            width={400}
            height={300}
            priority={priority}
            placeholder={placeholder}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.isUpcoming && (
              <div className="bg-light-pink text-dark-gray px-2 py-1 rounded-full text-xs font-medium">
                Coming Soon
              </div>
            )}
            {product.isFeatured && (
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
            {stockStatus && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
            <button
              onClick={handleWishlistToggle}
              className={`block bg-white p-2 rounded-full shadow-md transition-all duration-300 ${
                isWishlisted 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-600 hover:bg-light-pink hover:bg-opacity-20'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
            </button>
            
            <div className="block bg-white p-2 rounded-full shadow-md hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 text-gray-600">
              <Eye size={16} />
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        
        <div className="p-4">
          <h3 className="font-lora font-semibold text-dark-gray mb-2 group-hover:text-light-pink transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating */}
          {product.rating && product.rating.count > 0 && (
            <div className="flex items-center space-x-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(product.rating!.average)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.rating.count})
              </span>
            </div>
          )}
          
          {/* Stock Info */}
          {product.inventory && (
            <div className="text-xs text-gray-500 mb-2">
              {product.inventory.remaining} in stock
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-dark-gray">
              PKR {product.price.toLocaleString()}
            </span>
            
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart || product.isUpcoming || (product.inventory?.remaining === 0)}
              className="bg-light-pink text-dark-gray px-3 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-1 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAddingToCart ? (
                <LoadingSpinner size="sm" color="border-dark-gray" />
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;