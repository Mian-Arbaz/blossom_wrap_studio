import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MessageCircle, Star } from 'lucide-react';
import { getProductById, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products from same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in ${product.name} from Blossom Wrap Studio. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
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
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!product) {
    return (
      <div className="lg:ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-gray mb-4">Product not found</h2>
          <Link to="/" className="text-light-pink hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const productImages = [product.image, product.image, product.image]; // Mock multiple images

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
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-light-pink' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
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
                  <span className="text-gray-600">In Stock</span>
                </div>
                <p className="text-3xl font-bold text-dark-gray mb-6">
                  PKR {product.price.toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="font-lora text-xl font-semibold text-dark-gray mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-lora text-xl font-semibold text-dark-gray">Features</h3>
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
                >
                  <MessageCircle size={20} />
                  <span>Contact on WhatsApp</span>
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isLiked
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-light-pink hover:text-light-pink'
                  }`}
                >
                  <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                  <span>{isLiked ? 'Liked' : 'Like'}</span>
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
    </div>
  );
};

export default ProductDetailPage;