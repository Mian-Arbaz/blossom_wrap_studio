import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isUpcoming && (
          <div className="absolute top-2 left-2 bg-light-pink text-dark-gray px-2 py-1 rounded-full text-xs font-medium">
            Coming Soon
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-light-pink hover:bg-opacity-20 transition-colors duration-300">
            <Heart size={16} className="text-dark-gray" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-lora font-semibold text-dark-gray mb-2 group-hover:text-light-pink transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-dark-gray">
            PKR {product.price.toLocaleString()}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="bg-light-pink text-dark-gray px-4 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2 font-medium"
          >
            <ShoppingBag size={16} />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;