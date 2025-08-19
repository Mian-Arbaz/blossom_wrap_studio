import { describe, it, expect } from 'vitest';
import { buildWhatsAppOrderMessage, buildWhatsAppInquiryMessage, validateWhatsAppNumber } from '../utils/whatsapp';

describe('WhatsApp utilities', () => {
  describe('buildWhatsAppOrderMessage', () => {
    it('should build order message correctly', () => {
      const orderData = {
        items: [
          { name: 'Test Product', quantity: 2, price: 1500 }
        ],
        total: 3000,
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      };

      const message = buildWhatsAppOrderMessage(orderData);
      
      expect(message).toContain('New Order from Blossom Wrap Studio');
      expect(message).toContain('John Doe');
      expect(message).toContain('Test Product');
      expect(message).toContain('PKR 3,000');
    });
  });

  describe('buildWhatsAppInquiryMessage', () => {
    it('should build inquiry message with product', () => {
      const message = buildWhatsAppInquiryMessage('Test Product');
      expect(message).toContain('Test Product');
      expect(message).toContain('Blossom Wrap Studio');
    });

    it('should build general inquiry message without product', () => {
      const message = buildWhatsAppInquiryMessage();
      expect(message).toContain('Blossom Wrap Studio');
      expect(message).not.toContain('Specifically');
    });
  });

  describe('validateWhatsAppNumber', () => {
    it('should validate Pakistani phone numbers', () => {
      expect(validateWhatsAppNumber('+923001234567')).toBe(true);
      expect(validateWhatsAppNumber('03001234567')).toBe(true);
      expect(validateWhatsAppNumber('923001234567')).toBe(true);
      expect(validateWhatsAppNumber('123')).toBe(false);
      expect(validateWhatsAppNumber('')).toBe(false);
    });
  });
});