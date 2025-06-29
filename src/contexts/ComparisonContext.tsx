import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

interface ComparisonContextType {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('comparison');
    if (saved) {
      setComparisonProducts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(comparisonProducts));
  }, [comparisonProducts]);

  const addToComparison = (product: Product) => {
    setComparisonProducts(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev;
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setComparisonProducts([]);
  };

  const isInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  const value = {
    comparisonProducts,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};