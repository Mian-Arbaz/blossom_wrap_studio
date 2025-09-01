import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, Users, MessageSquare, Plus, Edit, Trash2, 
  Save, X, BarChart3, ShoppingCart, Minus, PlusIcon, 
  Mail, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { 
  getProducts, addProduct, updateProduct, deleteProduct, 
  categories, Product, getInventoryStats, updateInventory
} from '../data/products';

const AdminPage: React.FC = () => {
  const { isAdmin, user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  
  // Simple state management
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    category: 'handmade-flowers',
    description: '',
    price: '',
    image: '',
    isUpcoming: false,
    isFeatured: false,
    tags: '',
    totalStock: '',
    currentStock: '',
    lowStockAlert: '5'
  });

  // Check admin access
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [isAdmin, navigate]);

  // Load all data
  const loadData = () => {
    try {
      const allProducts = getProducts();
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const allMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const allSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      const inventoryStats = getInventoryStats();

      setProducts(allProducts);
      setUsers(allUsers);
      setMessages(allMessages);
      setSubscribers(allSubscribers);
      setStats({
        totalProducts: allProducts.length,
        totalUsers: allUsers.length,
        totalMessages: allMessages.length,
        totalSubscribers: allSubscribers.length,
        ...inventoryStats
      });
    } catch (error) {
      console.error('Error loading data:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load admin data'
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: '',
      category: 'handmade-flowers',
      description: '',
      price: '',
      image: '',
      isUpcoming: false,
      isFeatured: false,
      tags: '',
      totalStock: '',
      currentStock: '',
      lowStockAlert: '5'
    });
  };

  // Open add product modal
  const openAddModal = () => {
    resetForm();
    setEditingProduct(null);
    setShowModal(true);
  };

  // Open edit product modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      isUpcoming: product.isUpcoming || false,
      isFeatured: product.isFeatured || false,
      tags: product.tags?.join(', ') || '',
      totalStock: product.inventory?.total.toString() || '0',
      currentStock: product.inventory?.remaining.toString() || '0',
      lowStockAlert: product.inventory?.lowStockThreshold.toString() || '5'
    });
    setShowModal(true);
  };

  // Save product
  const saveProduct = () => {
    // Validation
    if (!form.name.trim()) {
      addNotification({ type: 'error', title: 'Error', message: 'Product name is required' });
      return;
    }
    if (!form.description.trim()) {
      addNotification({ type: 'error', title: 'Error', message: 'Description is required' });
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      addNotification({ type: 'error', title: 'Error', message: 'Valid price is required' });
      return;
    }

    try {
      const productData = {
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        price: Number(form.price),
        image: form.image || 'https://images.pexels.com/photos/264985/pexels-photo-264985.jpeg?auto=compress&cs=tinysrgb&w=400',
        isUpcoming: form.isUpcoming,
        isFeatured: form.isFeatured,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        inventory: {
          total: Number(form.totalStock) || 0,
          remaining: Number(form.currentStock) || 0,
          lowStockThreshold: Number(form.lowStockAlert) || 5
        }
      };

      if (editingProduct) {
        updateProduct(editingProduct.id, productData);
        addNotification({ type: 'success', title: 'Success', message: 'Product updated successfully' });
      } else {
        addProduct(productData);
        addNotification({ type: 'success', title: 'Success', message: 'Product added successfully' });
      }

      setShowModal(false);
      loadData();
    } catch (error) {
      addNotification({ type: 'error', title: 'Error', message: 'Failed to save product' });
    }
  };

  // Delete product
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      try {
        deleteProduct(id);
        loadData();
        addNotification({ type: 'success', title: 'Success', message: 'Product deleted successfully' });
      } catch (error) {
        addNotification({ type: 'error', title: 'Error', message: 'Failed to delete product' });
      }
    }
  };

  // Update inventory
  const updateStock = (productId: string, change: number) => {
    const product = products.find(p => p.id === productId);
    if (!product?.inventory) return;

    const newStock = Math.max(0, Math.min(product.inventory.total, product.inventory.remaining + change));
    
    try {
      updateInventory(productId, newStock);
      loadData();
      addNotification({ type: 'success', title: 'Success', message: 'Stock updated' });
    } catch (error) {
      addNotification({ type: 'error', title: 'Error', message: 'Failed to update stock' });
    }
  };

  // Get category name
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  // Get stock status
  const getStockStatus = (product: Product) => {
    if (!product.inventory) return { text: 'No Data', color: 'gray-500' };
    
    const { remaining, lowStockThreshold } = product.inventory;
    if (remaining === 0) return { text: 'Out of Stock', color: 'red-600' };
    if (remaining <= lowStockThreshold) return { text: 'Low Stock', color: 'yellow-600' };
    return { text: 'In Stock', color: 'green-600' };
  };

  if (!isAdmin) return null;

  return (
    <div className="lg:ml-64 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-2xl font-bold">{stats.totalProducts || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold">{stats.totalInventory || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold">{stats.lowStockCount || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
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
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Products</h2>
                  <button
                    onClick={openAddModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Add Product</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left">Product</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Category</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Price</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Stock</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Status</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const stockStatus = getStockStatus(product);
                        return (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              {getCategoryName(product.category)}
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              PKR {product.price.toLocaleString()}
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              {product.inventory?.remaining || 0} / {product.inventory?.total || 0}
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium text-${stockStatus.color} bg-${stockStatus.color} bg-opacity-10`}>
                                {stockStatus.text}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => openEditModal(product)}
                                  className="text-blue-600 hover:text-blue-800 p-1"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id, product.name)}
                                  className="text-red-600 hover:text-red-800 p-1"
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

                {products.length === 0 && (
                  <div className="text-center py-8">
                    <Package size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No products found</p>
                  </div>
                )}
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Inventory Management</h2>

                {/* Inventory Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm text-blue-600">Total Stock</p>
                        <p className="text-2xl font-bold text-blue-800">{stats.totalRemaining || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <ShoppingCart className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm text-green-600">Items Sold</p>
                        <p className="text-2xl font-bold text-green-800">{stats.totalSold || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-6">
                    <div className="flex items-center">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                      <div className="ml-4">
                        <p className="text-sm text-red-600">Low Stock Items</p>
                        <p className="text-2xl font-bold text-red-800">{stats.lowStockCount || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Low Stock Alerts */}
                {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                    <h3 className="font-semibold text-yellow-800 mb-4 flex items-center">
                      <AlertTriangle size={20} className="mr-2" />
                      Low Stock Alert
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stats.lowStockProducts.map((product: Product) => (
                        <div key={product.id} className="bg-white rounded p-4 border border-yellow-200">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
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
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left">Product</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Total</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Remaining</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Sold</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Status</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const inventory = product.inventory || { total: 0, remaining: 0, lowStockThreshold: 5 };
                        const sold = inventory.total - inventory.remaining;
                        const percentage = inventory.total > 0 ? (inventory.remaining / inventory.total) * 100 : 0;
                        const stockStatus = getStockStatus(product);
                        
                        return (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-10 h-10 rounded object-cover"
                                />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500">{getCategoryName(product.category)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-3 font-medium">
                              {inventory.total}
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{inventory.remaining}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      percentage > 50 ? 'bg-green-500' :
                                      percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-3">{sold}</td>
                            <td className="border border-gray-200 px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium text-${stockStatus.color}`}>
                                {stockStatus.text}
                              </span>
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => updateStock(product.id, -1)}
                                  disabled={inventory.remaining <= 0}
                                  className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50"
                                >
                                  <Minus size={14} />
                                </button>
                                <button
                                  onClick={() => updateStock(product.id, 1)}
                                  disabled={inventory.remaining >= inventory.total}
                                  className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50"
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
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Registered Users</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left">Name</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Email</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Role</th>
                        <th className="border border-gray-200 px-4 py-3 text-left">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="border border-gray-200 px-4 py-3 font-medium">{user.name}</td>
                          <td className="border border-gray-200 px-4 py-3">{user.email}</td>
                          <td className="border border-gray-200 px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-3">
                            {new Date().toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {users.length === 0 && (
                  <div className="text-center py-8">
                    <Users size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No users found</p>
                  </div>
                )}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact Messages</h2>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare size={48} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No messages yet</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">{message.name}</h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                            {message.subject && (
                              <p className="text-sm text-gray-500">Subject: {message.subject}</p>
                            )}
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

            {/* Newsletter Tab */}
            {activeTab === 'newsletter' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Newsletter Subscribers</h2>
                  <div className="text-sm text-gray-600">
                    Total: {subscribers.length} subscribers
                  </div>
                </div>

                {subscribers.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No subscribers yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left">Email</th>
                          <th className="border border-gray-200 px-4 py-3 text-left">Subscribed Date</th>
                          <th className="border border-gray-200 px-4 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="hover:bg-gray-50">
                            <td className="border border-gray-200 px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Mail size={16} className="text-gray-400" />
                                <span className="font-medium">{subscriber.email}</span>
                              </div>
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-200 px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
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
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (PKR) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Stock</label>
                  <input
                    type="number"
                    value={form.totalStock}
                    onChange={(e) => {
                      const total = Number(e.target.value);
                      setForm({ 
                        ...form, 
                        totalStock: e.target.value,
                        currentStock: Math.min(Number(form.currentStock), total).toString()
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Current Stock</label>
                  <input
                    type="number"
                    value={form.currentStock}
                    onChange={(e) => setForm({ ...form, currentStock: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="0"
                    max={form.totalStock}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Low Stock Alert</label>
                  <input
                    type="number"
                    value={form.lowStockAlert}
                    onChange={(e) => setForm({ ...form, lowStockAlert: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="5"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="handmade, flowers, gift"
                />
              </div>

              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.isUpcoming}
                    onChange={(e) => setForm({ ...form, isUpcoming: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Upcoming Product</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Featured Product</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveProduct}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{editingProduct ? 'Update' : 'Add'} Product</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;