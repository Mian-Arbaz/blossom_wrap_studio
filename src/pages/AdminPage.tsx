import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Users, MessageSquare, Plus, Edit, Trash2, 
  Eye, EyeOff, Save, X, Upload, Clock, Star, 
  TrendingDown, AlertTriangle, BarChart3, ShoppingCart,
  Minus, PlusIcon, Mail
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getProducts, addProduct, updateProduct, deleteProduct, 
  categories, Product, getInventoryStats, updateInventory
} from '../data/products';

const AdminPage: React.FC = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'users' | 'messages' | 'inventory' | 'newsletter'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [inventoryStats, setInventoryStats] = useState<any>({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [productForm, setProductForm] = useState({
    name: '',
    category: 'handmade-flowers',
    description: '',
    price: 0,
    image: '',
    isUpcoming: false,
    isFeatured: false,
    tags: '',
    inventory: {
      total: 0,
      remaining: 0,
      lowStockThreshold: 5
    }
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Load data
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
    setMessages(JSON.parse(localStorage.getItem('contactMessages') || '[]'));
    setSubscribers(JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]'));
    setInventoryStats(getInventoryStats());
  }, [isAdmin, navigate]);

  const handleAddProduct = () => {
    setIsAddingProduct(true);
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'handmade-flowers',
      description: '',
      price: 0,
      image: '',
      isUpcoming: false,
      isFeatured: false,
      tags: '',
      inventory: {
        total: 0,
        remaining: 0,
        lowStockThreshold: 5
      }
    });
    setIsEditModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsAddingProduct(false);
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      image: product.image,
      isUpcoming: product.isUpcoming || false,
      isFeatured: product.isFeatured || false,
      tags: product.tags?.join(', ') || '',
      inventory: product.inventory || {
        total: 0,
        remaining: 0,
        lowStockThreshold: 5
      }
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.description || productForm.price <= 0) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      ...productForm,
      tags: productForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (isAddingProduct) {
      addProduct(productData);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    }

    const updatedProducts = getProducts();
    setProducts(updatedProducts);
    setInventoryStats(getInventoryStats());
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      const updatedProducts = getProducts();
      setProducts(updatedProducts);
      setInventoryStats(getInventoryStats());
    }
  };

  const handleInventoryUpdate = (productId: string, change: number) => {
    const product = products.find(p => p.id === productId);
    if (product && product.inventory) {
      const newRemaining = Math.max(0, Math.min(product.inventory.total, product.inventory.remaining + change));
      updateInventory(productId, newRemaining);
      const updatedProducts = getProducts();
      setProducts(updatedProducts);
      setInventoryStats(getInventoryStats());
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Cloudinary or similar service
      // For demo purposes, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductForm({
          ...productForm,
          image: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getStockStatus = (product: Product) => {
    if (!product.inventory) return { status: 'unknown', color: 'gray' };
    
    const { remaining, lowStockThreshold } = product.inventory;
    
    if (remaining === 0) return { status: 'Out of Stock', color: 'red' };
    if (remaining <= lowStockThreshold) return { status: 'Low Stock', color: 'yellow' };
    return { status: 'In Stock', color: 'green' };
  };

  const stats = {
    totalProducts: products.length,
    upcomingProducts: products.filter(p => p.isUpcoming).length,
    totalUsers: users.length,
    totalMessages: messages.length,
    totalSubscribers: subscribers.length,
    ...inventoryStats
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-lora text-2xl font-bold text-dark-gray">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <div className="text-sm text-gray-500">
            Last login: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-dark-gray">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-light-pink rounded-lg flex items-center justify-center">
                <Package size={24} className="text-dark-gray" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inventory</p>
                <p className="text-2xl font-bold text-dark-gray">{stats.totalInventory || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Items Sold</p>
                <p className="text-2xl font-bold text-dark-gray">{stats.totalSold || 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{stats.lowStockCount || 0}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Newsletter Subscribers</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalSubscribers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'products', label: 'Products', icon: Package },
                { id: 'inventory', label: 'Inventory', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'newsletter', label: 'Newsletter', icon: Mail }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors duration-300 ${
                    activeTab === id
                      ? 'border-light-pink text-light-pink'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-dark-gray">Manage Products</h2>
                  <button
                    onClick={handleAddProduct}
                    className="bg-light-pink text-dark-gray px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Stock</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => {
                        const stockStatus = getStockStatus(product);
                        return (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div>
                                  <p className="font-medium text-dark-gray">{product.name}</p>
                                  <p className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm text-gray-600">
                                {categories.find(c => c.id === product.category)?.name}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-medium text-dark-gray">
                                PKR {product.price.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm">
                                <div className="font-medium text-dark-gray">
                                  {product.inventory?.remaining || 0} / {product.inventory?.total || 0}
                                </div>
                                <div className="text-gray-500">
                                  {product.inventory ? 
                                    `${Math.round((product.inventory.remaining / product.inventory.total) * 100)}% remaining` 
                                    : 'No inventory data'
                                  }
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="space-y-1">
                                {product.isUpcoming ? (
                                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Upcoming
                                  </span>
                                ) : (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    stockStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                                    stockStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                    stockStatus.color === 'red' ? 'bg-red-100 text-red-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {stockStatus.status}
                                  </span>
                                )}
                                {product.isFeatured && (
                                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium block">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="text-red-600 hover:text-red-800 transition-colors duration-300"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-dark-gray">Newsletter Subscribers</h2>
                  <div className="text-sm text-gray-600">
                    Total: {subscribers.length} subscribers
                  </div>
                </div>

                {subscribers.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No newsletter subscribers yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Subscribed Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Mail size={16} className="text-gray-400" />
                                <span className="font-medium text-dark-gray">{subscriber.email}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                subscriber.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {subscriber.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-dark-gray">Inventory Management</h2>
                </div>

                {/* Inventory Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Total Items in Stock</p>
                        <p className="text-3xl font-bold text-blue-800">{stats.totalRemaining || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                        <Package size={24} className="text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Items Sold</p>
                        <p className="text-3xl font-bold text-green-800">{stats.totalSold || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                        <TrendingDown size={24} className="text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-red-600 font-medium">Out of Stock</p>
                        <p className="text-3xl font-bold text-red-800">{stats.outOfStockCount || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                        <AlertTriangle size={24} className="text-red-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Low Stock Alerts */}
                {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle size={20} className="text-yellow-600" />
                      <h3 className="font-semibold text-yellow-800">Low Stock Alert</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stats.lowStockProducts.map((product: Product) => (
                        <div key={product.id} className="bg-white rounded-lg p-4 border border-yellow-200">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-dark-gray text-sm">{product.name}</p>
                              <p className="text-xs text-red-600">
                                Only {product.inventory?.remaining} left!
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inventory Table */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-dark-gray">Product Inventory</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Product</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total Stock</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Remaining</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sold</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map((product) => {
                          const stockStatus = getStockStatus(product);
                          const inventory = product.inventory || { total: 0, remaining: 0, lowStockThreshold: 5 };
                          const sold = inventory.total - inventory.remaining;
                          const percentage = inventory.total > 0 ? (inventory.remaining / inventory.total) * 100 : 0;
                          
                          return (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                  <div>
                                    <p className="font-medium text-dark-gray">{product.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {categories.find(c => c.id === product.category)?.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-dark-gray">
                                  {inventory.total}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium text-dark-gray">
                                    {inventory.remaining}
                                  </span>
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        percentage > 50 ? 'bg-green-500' :
                                        percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-600">{sold}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  stockStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                                  stockStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                  stockStatus.color === 'red' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {stockStatus.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleInventoryUpdate(product.id, -1)}
                                    disabled={inventory.remaining <= 0}
                                    className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleInventoryUpdate(product.id, 1)}
                                    disabled={inventory.remaining >= inventory.total}
                                    className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                  >
                                    <PlusIcon size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">Registered Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-dark-gray">{user.name}</td>
                          <td className="px-4 py-3 text-gray-600">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.isAdmin 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {new Date().toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">Contact Messages</h2>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare size={48} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No messages yet</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-dark-gray">{message.name}</h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{message.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-dark-gray">
                  {isAddingProduct ? 'Add New Product' : 'Edit Product'}
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Category *
                </label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Description *
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Price (PKR) *
                </label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                  placeholder="Enter price"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.tags}
                  onChange={(e) => setProductForm({ ...productForm, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                  placeholder="e.g. handmade, flowers, gift"
                />
              </div>

              {/* Inventory Section */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-dark-gray mb-4">Inventory Management</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Total Stock *
                    </label>
                    <input
                      type="number"
                      value={productForm.inventory.total}
                      onChange={(e) => {
                        const total = Number(e.target.value);
                        setProductForm({ 
                          ...productForm, 
                          inventory: { 
                            ...productForm.inventory, 
                            total,
                            remaining: Math.min(productForm.inventory.remaining, total)
                          } 
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                      placeholder="Total stock"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Current Stock *
                    </label>
                    <input
                      type="number"
                      value={productForm.inventory.remaining}
                      onChange={(e) => setProductForm({ 
                        ...productForm, 
                        inventory: { 
                          ...productForm.inventory, 
                          remaining: Math.min(Number(e.target.value), productForm.inventory.total)
                        } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                      placeholder="Current stock"
                      min="0"
                      max={productForm.inventory.total}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Low Stock Alert
                    </label>
                    <input
                      type="number"
                      value={productForm.inventory.lowStockThreshold}
                      onChange={(e) => setProductForm({ 
                        ...productForm, 
                        inventory: { 
                          ...productForm.inventory, 
                          lowStockThreshold: Number(e.target.value)
                        } 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                      placeholder="Low stock threshold"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Product Image
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                  />
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-pink focus:border-transparent"
                    placeholder="Or enter image URL"
                  />
                  {productForm.image && (
                    <img
                      src={productForm.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isUpcoming"
                    checked={productForm.isUpcoming}
                    onChange={(e) => setProductForm({ ...productForm, isUpcoming: e.target.checked })}
                    className="w-4 h-4 text-light-pink bg-gray-100 border-gray-300 rounded focus:ring-light-pink focus:ring-2"
                  />
                  <label htmlFor="isUpcoming" className="text-sm font-medium text-dark-gray">
                    Mark as upcoming product
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-light-pink bg-gray-100 border-gray-300 rounded focus:ring-light-pink focus:ring-2"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-dark-gray">
                    Mark as featured product
                  </label>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="bg-light-pink text-dark-gray px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{isAddingProduct ? 'Add Product' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;