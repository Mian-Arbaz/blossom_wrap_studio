// Currency utilities for safe money handling
export const toPaisa = (rs: number): number => Math.round(rs * 100);
export const fromPaisa = (paisa: number): number => paisa / 100;

export const formatRs = (paisa: number): string => {
  const rs = fromPaisa(paisa);
  return `PKR ${rs.toLocaleString('en-PK', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  })}`;
};

export const formatPrice = (price: number): string => {
  return `PKR ${price.toLocaleString('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};

// Safe arithmetic operations for money
export const addMoney = (a: number, b: number): number => toPaisa(fromPaisa(a) + fromPaisa(b));
export const multiplyMoney = (amount: number, multiplier: number): number => toPaisa(fromPaisa(amount) * multiplier);
export const subtractMoney = (a: number, b: number): number => Math.max(0, toPaisa(fromPaisa(a) - fromPaisa(b)));