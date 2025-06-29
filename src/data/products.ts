export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Multiple images support
  isUpcoming?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  inventory?: {
    total: number;
    remaining: number;
    lowStockThreshold: number;
  };
  rating?: {
    average: number;
    count: number;
  };
  specifications?: {
    material?: string;
    dimensions?: string;
    weight?: string;
    color?: string;
  };
}

export const categories = [
  { id: 'handmade-flowers', name: 'Handmade Flowers', icon: '🌸', description: 'Beautiful artificial flowers that last forever' },
  { id: 'gift-packs', name: 'Gift Packs', icon: '🎁', description: 'Curated gift sets for special occasions' },
  { id: 'gift-packing', name: 'Gift Packing', icon: '📦', description: 'Professional gift wrapping services' },
  { id: 'calligraphy', name: 'Calligraphy', icon: '✍️', description: 'Custom calligraphy and artwork' },
  { id: 'birthday-gifts', name: 'Birthday Gifts', icon: '🎂', description: 'Special birthday celebration items' },
  { id: 'couple-gifts', name: 'Couple Gifts', icon: '💕', description: 'Romantic gifts for couples' }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Rose Bouquet',
    category: 'handmade-flowers',
    description: 'Beautiful handcrafted rose bouquet perfect for any special occasion. Made with premium artificial roses that last forever.',
    price: 2500,
    image: 'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isFeatured: true,
    tags: ['roses', 'bouquet', 'romantic', 'wedding'],
    inventory: {
      total: 50,
      remaining: 35,
      lowStockThreshold: 10
    },
    rating: {
      average: 4.8,
      count: 24
    },
    specifications: {
      material: 'Premium Silk',
      dimensions: '30cm x 25cm',
      color: 'Red & Pink'
    }
  },
  {
    id: '2',
    name: 'Premium Gift Box Set',
    category: 'gift-packs',
    description: 'Luxurious gift box containing handmade items, perfect for gifting to loved ones.',
    price: 3500,
    image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isFeatured: true,
    tags: ['gift', 'luxury', 'premium', 'box'],
    inventory: {
      total: 30,
      remaining: 8,
      lowStockThreshold: 5
    },
    rating: {
      average: 4.9,
      count: 18
    },
    specifications: {
      material: 'Cardboard & Silk',
      dimensions: '25cm x 20cm x 10cm',
      color: 'Gold & White'
    }
  },
  {
    id: '3',
    name: 'Custom Calligraphy Art',
    category: 'calligraphy',
    description: 'Personalized calligraphy artwork with your custom message. Perfect for home decoration.',
    price: 1500,
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['calligraphy', 'custom', 'art', 'personalized'],
    inventory: {
      total: 25,
      remaining: 20,
      lowStockThreshold: 5
    },
    rating: {
      average: 4.7,
      count: 12
    },
    specifications: {
      material: 'Premium Paper',
      dimensions: 'A4 (21cm x 29.7cm)',
      color: 'Black Ink'
    }
  },
  {
    id: '4',
    name: 'Birthday Surprise Package',
    category: 'birthday-gifts',
    description: 'Special birthday package with handmade decorations and personalized items.',
    price: 4000,
    image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isFeatured: true,
    tags: ['birthday', 'celebration', 'party', 'decorations'],
    inventory: {
      total: 40,
      remaining: 25,
      lowStockThreshold: 8
    },
    rating: {
      average: 4.6,
      count: 31
    },
    specifications: {
      material: 'Mixed Materials',
      dimensions: 'Package Set',
      color: 'Multicolor'
    }
  },
  {
    id: '5',
    name: 'Couple Memory Book',
    category: 'couple-gifts',
    description: 'Beautifully crafted memory book for couples with personalized touches.',
    price: 2800,
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['couple', 'memory', 'book', 'romantic'],
    inventory: {
      total: 20,
      remaining: 15,
      lowStockThreshold: 5
    },
    rating: {
      average: 4.9,
      count: 15
    },
    specifications: {
      material: 'Leather & Paper',
      dimensions: '20cm x 25cm',
      color: 'Brown Leather'
    }
  },
  {
    id: '6',
    name: 'Luxury Gift Wrapping',
    category: 'gift-packing',
    description: 'Professional gift wrapping service with premium materials and elegant presentation.',
    price: 500,
    image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['wrapping', 'service', 'luxury', 'presentation'],
    inventory: {
      total: 100,
      remaining: 85,
      lowStockThreshold: 20
    },
    rating: {
      average: 4.5,
      count: 42
    },
    specifications: {
      material: 'Premium Wrapping Paper',
      dimensions: 'Custom Size',
      color: 'Various Options'
    }
  },
  {
    id: '7',
    name: 'Sakura Blossom Collection',
    category: 'handmade-flowers',
    description: 'Delicate sakura blossoms handcrafted with love. Perfect for spring decorations.',
    price: 2200,
    image: 'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isUpcoming: true,
    tags: ['sakura', 'spring', 'japanese', 'delicate'],
    inventory: {
      total: 15,
      remaining: 15,
      lowStockThreshold: 3
    },
    rating: {
      average: 0,
      count: 0
    },
    specifications: {
      material: 'Silk & Wire',
      dimensions: '35cm x 30cm',
      color: 'Pink & White'
    }
  },
  {
    id: '8',
    name: 'Anniversary Special Box',
    category: 'couple-gifts',
    description: 'Special anniversary gift box with handmade items and personalized messages.',
    price: 3800,
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    isUpcoming: true,
    tags: ['anniversary', 'special', 'romantic', 'personalized'],
    inventory: {
      total: 12,
      remaining: 12,
      lowStockThreshold: 3
    },
    rating: {
      average: 0,
      count: 0
    },
    specifications: {
      material: 'Wood & Fabric',
      dimensions: '30cm x 25cm x 15cm',
      color: 'Natural Wood'
    }
  },
  // Additional products for "View All Products" section
  {
    id: '9',
    name: 'Sunflower Arrangement',
    category: 'handmade-flowers',
    description: 'Bright and cheerful sunflower arrangement that brings sunshine to any room.',
    price: 2000,
    image: 'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['sunflower', 'bright', 'cheerful', 'arrangement'],
    inventory: {
      total: 30,
      remaining: 22,
      lowStockThreshold: 8
    },
    rating: {
      average: 4.5,
      count: 16
    }
  },
  {
    id: '10',
    name: 'Wedding Gift Collection',
    category: 'gift-packs',
    description: 'Elegant wedding gift collection with handmade items for the special couple.',
    price: 5000,
    image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['wedding', 'elegant', 'couple', 'collection'],
    inventory: {
      total: 15,
      remaining: 10,
      lowStockThreshold: 3
    },
    rating: {
      average: 4.8,
      count: 8
    }
  },
  {
    id: '11',
    name: 'Personalized Name Art',
    category: 'calligraphy',
    description: 'Beautiful personalized name art in elegant calligraphy style.',
    price: 1200,
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['personalized', 'name', 'art', 'elegant'],
    inventory: {
      total: 40,
      remaining: 35,
      lowStockThreshold: 10
    },
    rating: {
      average: 4.6,
      count: 20
    }
  },
  {
    id: '12',
    name: 'Kids Birthday Set',
    category: 'birthday-gifts',
    description: 'Fun and colorful birthday set designed especially for children.',
    price: 3200,
    image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['kids', 'colorful', 'fun', 'children'],
    inventory: {
      total: 25,
      remaining: 18,
      lowStockThreshold: 5
    },
    rating: {
      average: 4.7,
      count: 14
    }
  },
  // Additional calligraphy products to populate the category
  {
    id: '13',
    name: 'Wedding Invitation Calligraphy',
    category: 'calligraphy',
    description: 'Elegant wedding invitation calligraphy with beautiful flourishes and custom designs.',
    price: 2500,
    image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['wedding', 'invitation', 'elegant', 'custom'],
    inventory: {
      total: 20,
      remaining: 15,
      lowStockThreshold: 5
    },
    rating: {
      average: 4.9,
      count: 8
    },
    specifications: {
      material: 'Premium Cardstock',
      dimensions: '15cm x 21cm',
      color: 'Gold Ink'
    }
  },
  {
    id: '14',
    name: 'Inspirational Quote Art',
    category: 'calligraphy',
    description: 'Beautiful inspirational quotes written in modern calligraphy style.',
    price: 1800,
    image: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['inspirational', 'quote', 'modern', 'motivational'],
    inventory: {
      total: 30,
      remaining: 25,
      lowStockThreshold: 8
    },
    rating: {
      average: 4.5,
      count: 15
    },
    specifications: {
      material: 'Canvas Paper',
      dimensions: 'A3 (29.7cm x 42cm)',
      color: 'Black & Gold'
    }
  },
  {
    id: '15',
    name: 'Arabic Calligraphy Art',
    category: 'calligraphy',
    description: 'Traditional Arabic calligraphy with beautiful Islamic verses and designs.',
    price: 2200,
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    tags: ['arabic', 'islamic', 'traditional', 'religious'],
    inventory: {
      total: 15,
      remaining: 12,
      lowStockThreshold: 3
    },
    rating: {
      average: 4.8,
      count: 10
    },
    specifications: {
      material: 'Handmade Paper',
      dimensions: 'A2 (42cm x 59.4cm)',
      color: 'Traditional Black'
    }
  }
];

// Initialize products in localStorage if not exists
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(mockProducts));
}

export const getProducts = (): Product[] => {
  return JSON.parse(localStorage.getItem('products') || '[]');
};

export const getAllProducts = (): Product[] => {
  return getProducts().filter(product => !product.isUpcoming);
};

export const getFeaturedProducts = (): Product[] => {
  const products = getProducts();
  return products.filter(product => product.isFeatured && !product.isUpcoming);
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getProducts();
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const products = getProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    categories.find(cat => cat.id === product.category)?.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct = { 
    ...product, 
    id: Date.now().toString(),
    inventory: product.inventory || {
      total: 0,
      remaining: 0,
      lowStockThreshold: 5
    },
    rating: product.rating || {
      average: 0,
      count: 0
    }
  };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id: string, updatedProduct: Partial<Product>): boolean => {
  const products = getProducts();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  return false;
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filteredProducts = products.filter(product => product.id !== id);
  if (filteredProducts.length !== products.length) {
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    return true;
  }
  return false;
};

export const getUpcomingProducts = (): Product[] => {
  const products = getProducts();
  return products.filter(product => product.isUpcoming);
};

export const getInventoryStats = () => {
  const products = getProducts();
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, product) => sum + (product.inventory?.total || 0), 0);
  const totalRemaining = products.reduce((sum, product) => sum + (product.inventory?.remaining || 0), 0);
  const lowStockProducts = products.filter(product => 
    product.inventory && product.inventory.remaining <= product.inventory.lowStockThreshold
  );
  const outOfStockProducts = products.filter(product => 
    product.inventory && product.inventory.remaining === 0
  );

  return {
    totalProducts,
    totalInventory,
    totalRemaining,
    totalSold: totalInventory - totalRemaining,
    lowStockCount: lowStockProducts.length,
    outOfStockCount: outOfStockProducts.length,
    lowStockProducts,
    outOfStockProducts
  };
};

export const updateInventory = (id: string, remaining: number): boolean => {
  const products = getProducts();
  const index = products.findIndex(product => product.id === id);
  if (index !== -1 && products[index].inventory) {
    products[index].inventory!.remaining = Math.max(0, remaining);
    localStorage.setItem('products', JSON.stringify(products));
    return true;
  }
  return false;
};

export const getProductsByTag = (tag: string): Product[] => {
  const products = getProducts();
  return products.filter(product => 
    product.tags?.some(productTag => 
      productTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export const getTopRatedProducts = (limit: number = 4): Product[] => {
  const products = getProducts();
  return products
    .filter(product => product.rating && product.rating.count > 0)
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, limit);
};