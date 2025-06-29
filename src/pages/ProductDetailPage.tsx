import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MessageCircle, Star, ShoppingBag, Plus, Minus, BarChart3 } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useComparison } from '../contexts/ComparisonContext';
import { useNotification } from '../contexts/NotificationContext';
import { analytics } from '../utils/analytics';
import { updateMetaTags, generateStructuredData } from '../utils/seo';
import ProductCard from '../components/ProductCard';
import ImageGallery from '../components/ImageGallery';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewSystem from '../components/ReviewSystem';
import RecentlyViewed from '../components/RecentlyViewed';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { addToComparison, isInComparison } = useComparison();
  const { addNotification } = useNotification();

  const isWishlisted = product ? isInWishlist(product.id) : false;
  const isInComparisonList = product ? isInComparison(product.id) : false;

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Add to recently viewed
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const updatedRecent = [id, ...recentlyViewed.filter((pid: string) => pid !== id)].slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
        
        // Get related products from same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);

        // Analytics
        analytics.trackProductView(foundProduct.id, foundProduct.name);

        // SEO
        updateMetaTags({
          title: foundProduct.name,
          description: foundProduct.description,
          keywords: `${foundProduct.name}, handmade, gifts, Pakistan, ${foundProduct.category}`,
          image: foundProduct.image,
          url: window.location.href
        });

        // Structured Data
        generateStructuredData('Product', {
          name: foundProduct.name,
          description: foundProduct.description,
          image: foundProduct.image,
          offers: {
            '@type': 'Offer',
            price: foundProduct.price,
            priceCurrency: 'PKR',
            availability: foundProduct.isUpcoming ? 'PreOrder' : 'InStock'
          },
          brand: {
            '@type': 'Brand',
            name: 'Blossom Wrap Studio'
          }
        });
      }
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (product.isUpcoming) {
      addNotification({
        type: 'warning',
        title: 'Product Coming Soon',
        message: 'This product is not available yet. We\'ll notify you when it\'s ready!'
      });
      return;
    }

    if (product.inventory?.remaining === 0) {
      addNotification({
        type: 'error',
        title: 'Out of Stock',
        message: 'This product is currently out of stock.'
      });
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate API call delay
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAddingToCart(false);
      analytics.trackAddToCart(product.id, product.name, quantity);
      addNotification({
        type: 'success',
        title: 'Added to Cart!',
        message: `${quantity} x ${product.name} added to your cart.`
      });
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

  const handleAddToComparison = () => {
    if (!product) return;
    
    addToComparison(product);
    addNotification({
      type: 'success',
      title: 'Added to Comparison!',
      message: `${product.name} has been added to comparison list.`
    });
  };

  const handleWhatsAppContact = () => {
    if (!product) return;
    
    const message = `Hi! I'm interested in ${product.name} from Blossom Wrap Studio. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (!product) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        addNotification({
          type: 'success',
          title: 'Link Copied!',
          message: 'Product link has been copied to clipboard.'
        });
      } catch (error) {
        addNotification({
          type: 'error',
          title: 'Share Failed',
          message: 'Unable to share this product.'
        });
      }
    }
  };

  const getStockStatus = () => {
    if (!product?.inventory) return null;
    
    const { remaining, lowStockThreshold } = product.inventory;
    
    if (remaining === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (remaining <= lowStockThreshold) return { text: 'Low Stock', color: 'text-yellow-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  if (!product) {
    return (
      <div className="lg:ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const productImages = [product.image, product.image, product.image]; // Mock multiple images
  const stockStatus = getStockStatus();
  const maxQuantity = product.inventory?.remaining || 1;

  return (
    <div className="lg:ml-64 min-h-screen">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto">
          <Link
            to={`/products/${product.category}`}
            className="inline-flex items-center space-x-2 text-dark-gray hover:text-light-pink transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={productImages} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.isUpcoming && (
                <div className="bg-light-pink text-dark-gray px-4 py-2 rounded-full text-sm font-medium inline-block">
                  Coming Soon
                </div>
              )}
              
              <div>
                <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-600 ml-2">(4.8)</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  {stockStatus && (
                    <span className={`font-medium ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-dark-gray mb-6">
                  PKR {product.price.toLocaleString()}
                </p>
              </div>

              {/* Stock Information */}
              {product.inventory && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Stock Level</span>
                    <span className="text-sm font-medium text-dark-gray">
                      {product.inventory.remaining} / {product.inventory.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        product.inventory.remaining > product.inventory.lowStockThreshold
                          ? 'bg-green-500'
                          : product.inventory.remaining > 0
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{
                        width: `${(product.inventory.remaining / product.inventory.total) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              {!product.isUpcoming && product.inventory?.remaining > 0 && (
                <div className="space-y-4">
                  <h3 className="font-lora text-lg font-semibold text-dark-gray">Quantity</h3>
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
                    <span className="text-sm text-gray-600">
                      {maxQuantity} available
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.isUpcoming || product.inventory?.remaining === 0}
                  className="flex-1 bg-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-light-pink hover:text-light-pink'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToComparison}
                  disabled={isInComparisonList}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <BarChart3 size={20} />
                  <span>{isInComparisonList ? 'In Comparison' : 'Compare'}</span>
                </button>
                
                <button
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <MessageCircle size={20} />
                  <span>Contact on WhatsApp</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 hover:border-light-pink hover:text-light-pink transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'shipping', label: 'Shipping & Returns' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id as any)}
                    className={`py-4 border-b-2 font-medium transition-colors duration-300 ${
                      activeTab === id
                        ? 'border-light-pink text-light-pink'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="font-lora text-xl font-semibold text-dark-gray mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  
                  <h4 className="font-lora text-lg font-semibold text-dark-gray mb-3">Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-light-pink rounded-full"></span>
                      <span>Handmade with premium materials</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-light-pink rounded-full"></span>
                      <span>Perfect for gifting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-light-pink rounded-full"></span>
                      <span>Long-lasting quality</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-light-pink rounded-full"></span>
                      <span>Made in Pakistan</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <ReviewSystem productId={product.id} />
              )}

              {activeTab === 'shipping' && (
                <div className="prose max-w-none">
                  <h3 className="font-lora text-xl font-semibold text-dark-gray mb-4">Shipping & Returns</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-dark-gray mb-3">Shipping Information</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Free shipping on orders over PKR 3,000</li>
                        <li>• Standard delivery: 3-5 business days</li>
                        <li>• Express delivery: 1-2 business days</li>
                        <li>• Cash on delivery available</li>
                        <li>• Nationwide delivery across Pakistan</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-dark-gray mb-3">Return Policy</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 7-day return policy</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free returns for defective items</li>
                        <li>• Return shipping costs apply for exchanges</li>
                        <li>• Refunds processed within 5-7 business days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="font-lora text-2xl md:text-3xl font-bold text-dark-gray mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed />
    </div>
  );
};

export default ProductDetailPage;