import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List, Search } from 'lucide-react';
import { getAllProducts, categories, searchProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

const AllProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 });

  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    
    // Set price range based on actual products
    if (allProducts.length > 0) {
      const prices = allProducts.map(p => p.price);
      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices)
      });
    }
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    filtered = filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        case 'price':
          aValue = a.price;
          bValue = b.price;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        case 'rating':
          aValue = a.rating?.average || 0;
          bValue = b.rating?.average || 0;
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    const prices = products.map(p => p.price);
    setPriceRange({
      min: Math.min(...prices),
      max: Math.max(...prices)
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
            <span className="text-4xl">🛍️</span>
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-bold text-dark-gray">
                All Products
              </h1>
              <p className="text-dark-gray mt-2">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b border-gray-200 py-6 px-4 sticky top-0 z-40">
        <div className="container mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-light-pink hover:border-light-pink transition-colors duration-300"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Controls */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-light-pink hover:border-light-pink transition-colors duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-light-pink hover:border-light-pink transition-colors duration-300"
              >
                <option value="asc">
                  {sortBy === 'name' ? 'A-Z' : sortBy === 'price' ? 'Low to High' : 'Low to High'}
                </option>
                <option value="desc">
                  {sortBy === 'name' ? 'Z-A' : sortBy === 'price' ? 'High to Low' : 'High to Low'}
                </option>
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="text-light-pink hover:text-dark-gray transition-colors duration-300 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
            
            {/* View Mode Toggle */}
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
      </div>

      {/* Products */}
      <div className="py-8 px-4">
        <div className="container mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearFilters}
                className="bg-light-pink text-dark-gray px-6 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {viewMode === 'grid' ? (
                    <ProductCard product={product} priority={index < 8} />
                  ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex hover:shadow-lg transition-shadow duration-300">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          loading={index < 8 ? 'eager' : 'lazy'}
                        />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-lora text-xl font-semibold text-dark-gray mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                          {product.rating && product.rating.count > 0 && (
                            <div className="flex items-center space-x-1 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-sm ${
                                      i < Math.floor(product.rating!.average)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                ({product.rating.count})
                              </span>
                            </div>
                          )}
                        </div>
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

export default AllProductsPage;