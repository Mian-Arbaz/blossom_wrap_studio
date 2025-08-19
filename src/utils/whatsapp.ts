// WhatsApp integration utilities
export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface WhatsAppOrderData {
  items: WhatsAppOrderItem[];
  total: number;
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export const WHATSAPP_NUMBER = '+923001234567';

export const buildWhatsAppOrderMessage = (orderData: WhatsAppOrderData): string => {
  const { items, total, customerInfo } = orderData;
  
  let message = '🛍️ *New Order from Blossom Wrap Studio*\n\n';
  
  // Customer info
  if (customerInfo) {
    if (customerInfo.name) message += `👤 *Customer:* ${customerInfo.name}\n`;
    if (customerInfo.email) message += `📧 *Email:* ${customerInfo.email}\n`;
    if (customerInfo.phone) message += `📱 *Phone:* ${customerInfo.phone}\n`;
    message += '\n';
  }
  
  // Order items
  message += '📦 *Order Details:*\n';
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: PKR ${item.price.toLocaleString()}\n`;
    message += `   Subtotal: PKR ${(item.price * item.quantity).toLocaleString()}\n\n`;
  });
  
  // Total
  message += `💰 *Total Amount: PKR ${total.toLocaleString()}*\n\n`;
  
  // Footer
  message += '✅ Please confirm availability and delivery details.\n';
  message += '🚚 Delivery address will be provided after confirmation.\n\n';
  message += 'Thank you for choosing Blossom Wrap Studio! 🌸';
  
  return message;
};

export const buildWhatsAppInquiryMessage = (productName?: string): string => {
  let message = '👋 Hi! I\'m interested in your products from Blossom Wrap Studio.\n\n';
  
  if (productName) {
    message += `🌸 Specifically, I'd like to know more about: *${productName}*\n\n`;
  }
  
  message += 'Could you please provide more details about:\n';
  message += '• Availability and pricing\n';
  message += '• Customization options\n';
  message += '• Delivery timeline\n\n';
  message += 'Thank you! 😊';
  
  return message;
};

export const openWhatsAppChat = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Open in new tab/window
  const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  
  // Fallback for popup blockers
  if (!newWindow) {
    window.location.href = whatsappUrl;
  }
};

export const validateWhatsAppNumber = (number: string): boolean => {
  // Basic validation for Pakistani phone numbers
  const cleanNumber = number.replace(/\D/g, '');
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
};