import { describe, it, expect } from 'vitest';
import { toPaisa, fromPaisa, formatRs, formatPrice, addMoney, multiplyMoney } from '../utils/currency';

describe('Currency utilities', () => {
  describe('toPaisa', () => {
    it('should convert rupees to paisa correctly', () => {
      expect(toPaisa(1)).toBe(100);
      expect(toPaisa(10.5)).toBe(1050);
      expect(toPaisa(0)).toBe(0);
    });

    it('should handle rounding for fractional paisa', () => {
      expect(toPaisa(1.234)).toBe(123);
      expect(toPaisa(1.235)).toBe(124);
    });
  });

  describe('fromPaisa', () => {
    it('should convert paisa to rupees correctly', () => {
      expect(fromPaisa(100)).toBe(1);
      expect(fromPaisa(1050)).toBe(10.5);
      expect(fromPaisa(0)).toBe(0);
    });
  });

  describe('formatRs', () => {
    it('should format paisa as PKR currency', () => {
      expect(formatRs(100)).toBe('PKR 1');
      expect(formatRs(250000)).toBe('PKR 2,500');
    });
  });

  describe('formatPrice', () => {
    it('should format price as PKR currency', () => {
      expect(formatPrice(1500)).toBe('PKR 1,500');
      expect(formatPrice(25000)).toBe('PKR 25,000');
    });
  });

  describe('addMoney', () => {
    it('should add money amounts safely', () => {
      expect(addMoney(toPaisa(10), toPaisa(5))).toBe(toPaisa(15));
      expect(addMoney(toPaisa(10.5), toPaisa(5.25))).toBe(toPaisa(15.75));
    });
  });

  describe('multiplyMoney', () => {
    it('should multiply money amounts safely', () => {
      expect(multiplyMoney(toPaisa(10), 2)).toBe(toPaisa(20));
      expect(multiplyMoney(toPaisa(15.5), 3)).toBe(toPaisa(46.5));
    });
  });
});