import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  availability: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: Array<{ id: string; name: string }>;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  categories
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    availability: true,
    sort: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value;
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleAvailabilityToggle = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 10000],
      categories: [],
      availability: [],
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white h-full w-80 shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-dark-gray" />
              <h2 className="text-lg font-semibold text-dark-gray">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-dark-gray">Price Range</h3>
              {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.price && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Min</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Max</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink"
                      placeholder="10000"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  PKR {filters.priceRange[0].toLocaleString()} - PKR {filters.priceRange[1].toLocaleString()}
                </div>
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-dark-gray">Categories</h3>
              {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.category && (
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 text-light-pink bg-gray-100 border-gray-300 rounded focus:ring-light-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-dark-gray">Availability</h3>
              {expandedSections.availability ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.availability && (
              <div className="mt-4 space-y-2">
                {['In Stock', 'Low Stock', 'Coming Soon'].map((availability) => (
                  <label key={availability} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.availability.includes(availability)}
                      onChange={() => handleAvailabilityToggle(availability)}
                      className="w-4 h-4 text-light-pink bg-gray-100 border-gray-300 rounded focus:ring-light-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{availability}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div>
            <button
              onClick={() => toggleSection('sort')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-medium text-dark-gray">Sort By</h3>
              {expandedSections.sort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {expandedSections.sort && (
              <div className="mt-4 space-y-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="newest">Newest</option>
                  <option value="popularity">Popularity</option>
                </select>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sortOrder"
                      checked={filters.sortOrder === 'asc'}
                      onChange={() => onFiltersChange({ ...filters, sortOrder: 'asc' })}
                      className="w-4 h-4 text-light-pink bg-gray-100 border-gray-300 focus:ring-light-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">Ascending</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sortOrder"
                      checked={filters.sortOrder === 'desc'}
                      onChange={() => onFiltersChange({ ...filters, sortOrder: 'desc' })}
                      className="w-4 h-4 text-light-pink bg-gray-100 border-gray-300 focus:ring-light-pink focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">Descending</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={clearAllFilters}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-light-pink text-dark-gray px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;