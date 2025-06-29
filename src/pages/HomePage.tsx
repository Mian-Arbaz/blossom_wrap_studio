import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, HeartHandshake, Award } from 'lucide-react';
import { categories, getFeaturedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import NewsletterSection from '../components/NewsletterSection';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="lg:ml-64">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-light-pink to-light-blue py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="font-lora text-4xl md:text-6xl font-bold text-dark-gray mb-4 animate-fade-in">
            Welcome to Blossom Wrap Studio
          </h1>
          <p className="text-xl text-dark-gray mb-8 max-w-2xl mx-auto animate-slide-up">
            Creating beautiful handmade gifts and decorations that make you smile. 
            Discover our unique collection of flowers, gift packs, and personalized items.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/products/handmade-flowers"
              className="bg-white text-dark-gray px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2 font-medium transform hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-dark-gray px-8 py-3 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">🌸</div>
        <div className="absolute top-20 right-20 text-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🎁</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>💕</div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HeartHandshake size={32} className="text-light-pink" />,
                title: 'Handmade with Love',
                description: 'Every item is carefully crafted by hand with attention to detail'
              },
              {
                icon: <Truck size={32} className="text-light-blue" />,
                title: 'Fast Delivery',
                description: 'Quick and reliable delivery across Pakistan'
              },
              {
                icon: <Shield size={32} className="text-green-500" />,
                title: 'Quality Guaranteed',
                description: 'Premium materials and lasting quality in every product'
              },
              {
                icon: <Award size={32} className="text-yellow-500" />,
                title: 'Customer Favorite',
                description: 'Loved by thousands of satisfied customers'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-lora text-lg font-semibold text-dark-gray mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Our Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our beautiful collection of handmade items, carefully crafted with love and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-light-pink to-light-blue flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-6xl">{category.icon}</span>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-lora text-xl font-semibold text-dark-gray mb-2 group-hover:text-light-pink transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center text-gray-600 group-hover:text-dark-gray transition-colors duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular handmade items, loved by customers across Pakistan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products/handmade-flowers"
              className="bg-light-pink text-dark-gray px-8 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 inline-flex items-center space-x-2 font-medium transform hover:scale-105"
            >
              <span>View All Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Real reviews from our happy customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Ayesha Khan',
                location: 'Lahore',
                comment: 'Beautiful handmade flowers that lasted forever! Perfect for my wedding decoration. The quality exceeded my expectations.',
                rating: 5,
                product: 'Elegant Rose Bouquet'
              },
              {
                name: 'Muhammad Ali',
                location: 'Karachi',
                comment: 'Amazing gift packaging service. My wife loved the surprise! The attention to detail was incredible.',
                rating: 5,
                product: 'Premium Gift Box Set'
              },
              {
                name: 'Fatima Sheikh',
                location: 'Islamabad',
                comment: 'The calligraphy work is absolutely stunning. Highly recommended for anyone looking for personalized art!',
                rating: 5,
                product: 'Custom Calligraphy Art'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div className="border-t pt-4">
                  <p className="font-medium text-dark-gray">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-light-pink mt-1">Purchased: {testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;