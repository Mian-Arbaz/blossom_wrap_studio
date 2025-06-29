import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import { getProductsByCategory, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categoryInfo = categories.find(cat => cat.id === category);

  useEffect(() => {
    // Scroll to top when category changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (category) {
      let categoryProducts = getProductsByCategory(category);
      
      // Sort products
      categoryProducts = categoryProducts.sort((a, b) => {
        let aValue = sortBy === 'name' ? a.name : a.price;
        let bValue = sortBy === 'name' ? b.name : b.price;
        
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
      });
      
      setProducts(categoryProducts);
    }
  }, [category, sortBy, sortOrder]);

  if (!categoryInfo) {
    return (
      <div className="lg:ml-64 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-gray mb-4">Category not found</h2>
          <Link to="/" className="text-light-pink hover:underline">
            Return to Home
          </Link>
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
            <span className="text-4xl">{categoryInfo.icon}</span>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                {categoryInfo.name}
              </h1>
              <p className="text-dark-gray mt-2">
                {products.length} {products.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-light-pink hover:border-light-pink transition-colors duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-light-pink hover:border-light-pink transition-colors duration-300"
            >
              <option value="asc">{sortBy === 'name' ? 'A-Z' : 'Low to High'}</option>
              <option value="desc">{sortBy === 'name' ? 'Z-A' : 'High to Low'}</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-light-pink text-dark-gray' 
                  : 'text-gray-600 hover:text-dark-gray hover:bg-gray-100'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors duration-300 ${
                viewMode === 'list' 
                  ? 'bg-light-pink text-dark-gray' 
                  : 'text-gray-600 hover:text-dark-gray hover:bg-gray-100'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="py-8 px-4">
        <div className="container mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">{categoryInfo.icon}</div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                No products available yet
              </h3>
              <p className="text-gray-600 mb-6">
                We're working on adding products to this category. Please check back soon!
              </p>
              <Link
                to="/"
                className="bg-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
              >
                Browse Other Categories
              </Link>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <ProductCard product={product} priority={index < 4} />
                  ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex hover:shadow-lg transition-shadow duration-300">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading={index < 4 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-lora text-xl font-semibold text-dark-gray mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-dark-gray">
                            PKR {product.price.toLocaleString()}
                          </span>
                          <Link
                            to={`/product/${product.id}`}
                            className="bg-light-pink text-dark-gray px-4 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;