import React, { useState, useEffect } from 'react';
import { Clock, Eye } from 'lucide-react';
import { Product, getProductById } from '../data/products';
import ProductCard from './ProductCard';

const RecentlyViewed: React.FC = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const products = recentlyViewed
      .map((id: string) => getProductById(id))
      .filter((product: Product | undefined): product is Product => product !== undefined)
      .slice(0, 4);
    setRecentProducts(products);
  }, []);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-light-pink rounded-full flex items-center justify-center">
            <Clock size={20} className="text-dark-gray" />
          </div>
          <div>
            <h2 className="font-lora text-2xl md:text-3xl font-bold text-dark-gray">
              Recently Viewed
            </h2>
            <p className="text-gray-600">Products you've looked at recently</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;