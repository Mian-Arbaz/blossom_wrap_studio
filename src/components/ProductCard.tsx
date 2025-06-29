import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from './LoadingSpinner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <LoadingSpinner size="md" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'block' : 'hidden'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {product.isUpcoming && (
            <div className="bg-light-pink text-dark-gray px-2 py-1 rounded-full text-xs font-medium">
              Coming Soon
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
          
          <Link
            to={`/product/${product.id}`}
            className="block bg-white p-2 rounded-full shadow-md hover:bg-light-pink hover:bg-opacity-20 transition-all duration-300 text-gray-600"
            aria-label="View product details"
          >
            <Eye size={16} />
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-lora font-semibold text-dark-gray mb-2 group-hover:text-light-pink transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
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
          
          <div className="flex items-center space-x-2">
            <Link
              to={`/product/${product.id}`}
              className="bg-gray-100 text-dark-gray px-3 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 text-sm font-medium"
            >
              View
            </Link>
            
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
    </div>
  );
};

export default ProductCard;