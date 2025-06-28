import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { categories, getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const featuredProducts = getProducts().slice(0, 4);

  return (
    <div className="lg:ml-64">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-light-pink to-light-blue py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-lora text-4xl md:text-6xl font-bold text-dark-gray mb-4 animate-fade-in">
            Welcome to Blossom Wrap Studio
          </h1>
          <p className="text-xl text-dark-gray mb-8 max-w-2xl mx-auto animate-slide-up">
            Creating beautiful handmade gifts and decorations that make you smile. 
            Discover our unique collection of flowers, gift packs, and personalized items.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products/handmade-flowers"
              className="bg-white text-dark-gray px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-2 font-medium"
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
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
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
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
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
      <section className="py-16 px-4 bg-gray-50">
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
              className="bg-light-pink text-dark-gray px-8 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 inline-flex items-center space-x-2 font-medium"
            >
              <span>View All Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Ayesha Khan',
                comment: 'Beautiful handmade flowers that lasted forever! Perfect for my wedding decoration.',
                rating: 5
              },
              {
                name: 'Muhammad Ali',
                comment: 'Amazing gift packaging service. My wife loved the surprise!',
                rating: 5
              },
              {
                name: 'Fatima Sheikh',
                comment: 'The calligraphy work is absolutely stunning. Highly recommended!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <p className="font-medium text-dark-gray">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;