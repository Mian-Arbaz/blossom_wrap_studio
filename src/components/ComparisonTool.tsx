import React, { useState } from 'react';
import { X, Plus, Check, Minus } from 'lucide-react';
import { Product } from '../data/products';
import { useNotification } from '../contexts/NotificationContext';

interface ComparisonToolProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveProduct: (productId: string) => void;
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveProduct
}) => {
  const { addNotification } = useNotification();

  const features = [
    'Price',
    'Category',
    'Stock Status',
    'Availability'
  ];

  const getFeatureValue = (product: Product, feature: string) => {
    switch (feature) {
      case 'Price':
        return `PKR ${product.price.toLocaleString()}`;
      case 'Category':
        return product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      case 'Stock Status':
        if (product.isUpcoming) return 'Coming Soon';
        if (!product.inventory) return 'Unknown';
        if (product.inventory.remaining === 0) return 'Out of Stock';
        if (product.inventory.remaining <= product.inventory.lowStockThreshold) return 'Low Stock';
        return 'In Stock';
      case 'Availability':
        return product.isUpcoming ? 'Pre-order' : 'Available';
      default:
        return '-';
    }
  };

  const getStatusColor = (product: Product, feature: string) => {
    if (feature === 'Stock Status') {
      if (product.isUpcoming) return 'text-yellow-600';
      if (!product.inventory || product.inventory.remaining === 0) return 'text-red-600';
      if (product.inventory.remaining <= product.inventory.lowStockThreshold) return 'text-yellow-600';
      return 'text-green-600';
    }
    return 'text-gray-700';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-dark-gray">Product Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-x-auto">
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-light-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={24} className="text-dark-gray" />
              </div>
              <h3 className="text-xl font-semibold text-dark-gray mb-2">
                No Products to Compare
              </h3>
              <p className="text-gray-600">
                Add products to your comparison list to see them here.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-dark-gray w-32">Feature</th>
                  {products.map((product) => (
                    <th key={product.id} className="text-center p-4 min-w-64">
                      <div className="space-y-3">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg mx-auto"
                          />
                          <button
                            onClick={() => onRemoveProduct(product.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-semibold text-dark-gray text-sm line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-dark-gray bg-gray-50">
                      {feature}
                    </td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <span className={getStatusColor(product, feature)}>
                          {getFeatureValue(product, feature)}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-dark-gray bg-gray-50">
                    Description
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {product.description}
                      </p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {products.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Comparing {products.length} products
              </p>
              <button
                onClick={onClose}
                className="bg-light-pink text-dark-gray px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300"
              >
                Close Comparison
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTool;