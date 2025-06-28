export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  isUpcoming?: boolean;
}

export const categories = [
  { id: 'handmade-flowers', name: 'Handmade Flowers', icon: '🌸' },
  { id: 'gift-packs', name: 'Gift Packs', icon: '🎁' },
  { id: 'gift-packing', name: 'Gift Packing', icon: '📦' },
  { id: 'calligraphy', name: 'Calligraphy', icon: '✍️' },
  { id: 'birthday-gifts', name: 'Birthday Gifts', icon: '🎂' },
  { id: 'couple-gifts', name: 'Couple Gifts', icon: '💕' }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Rose Bouquet',
    category: 'handmade-flowers',
    description: 'Beautiful handcrafted rose bouquet perfect for any special occasion. Made with premium artificial roses that last forever.',
    price: 2500,
    image: 'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Premium Gift Box Set',
    category: 'gift-packs',
    description: 'Luxurious gift box containing handmade items, perfect for gifting to loved ones.',
    price: 3500,
    image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Custom Calligraphy Art',
    category: 'calligraphy',
    description: 'Personalized calligraphy artwork with your custom message. Perfect for home decoration.',
    price: 1500,
    image: 'https://images.pexels.com/photos/6290/light-typography-black-close-up.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'Birthday Surprise Package',
    category: 'birthday-gifts',
    description: 'Special birthday package with handmade decorations and personalized items.',
    price: 4000,
    image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'Couple Memory Book',
    category: 'couple-gifts',
    description: 'Beautifully crafted memory book for couples with personalized touches.',
    price: 2800,
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'Luxury Gift Wrapping',
    category: 'gift-packing',
    description: 'Professional gift wrapping service with premium materials and elegant presentation.',
    price: 500,
    image: 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    name: 'Sakura Blossom Collection',
    category: 'handmade-flowers',
    description: 'Delicate sakura blossoms handcrafted with love. Perfect for spring decorations.',
    price: 2200,
    image: 'https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=400',
    isUpcoming: true
  },
  {
    id: '8',
    name: 'Anniversary Special Box',
    category: 'couple-gifts',
    description: 'Special anniversary gift box with handmade items and personalized messages.',
    price: 3800,
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
    isUpcoming: true
  }
];

// Initialize products in localStorage if not exists
if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(mockProducts));
}

export const getProducts = (): Product[] => {
  return JSON.parse(localStorage.getItem('products') || '[]');
};

export const getProductsByCategory = (category: string): Product[] => {
  const products = getProducts();
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  const products = getProducts();
  return products.find(product => product.id === id);
};

export const addProduct = (product: Omit<Product, 'id'>): Product => {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
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