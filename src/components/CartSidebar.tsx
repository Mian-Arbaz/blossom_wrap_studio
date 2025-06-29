import React from 'react';
import { X, Plus, Minus, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { addNotification } = useNotification();

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const orderDetails = cartItems.map(item => 
      `${item.name} x${item.quantity} - PKR ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const total = getTotalPrice();
    const message = `Hi! I'd like to place an order:\n\n${orderDetails}\n\nTotal: PKR ${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/+923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    addNotification({
      type: 'success',
      title: 'Order Sent!',
      message: 'Your order has been sent via WhatsApp. We\'ll get back to you soon!'
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-dark-gray" />
              <h2 className="text-lg font-semibold text-dark-gray">Shopping Cart</h2>
              {cartItems.length > 0 && (
                <span className="bg-light-pink text-dark-gray px-2 py-1 rounded-full text-sm font-medium">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link
                  to="/"
                  onClick={onClose}
                  className="bg-light-pink text-dark-gray px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-dark-gray mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">PKR {item.price.toLocaleString()}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>PKR {getTotalPrice().toLocaleString()}</span>
              </div>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
              >
                <span>Order via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;