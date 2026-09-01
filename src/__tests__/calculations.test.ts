import { calculateAge, calculateBMI, calculateBillTotal, calculateTax, calculateDiscount } from '@/lib/calculations';

describe('Calculation Functions', () => {
  describe('calculateAge', () => {
    it('calculates age from birth date', () => {
      const birthDate = new Date('1990-01-01');
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThan(0);
      expect(age).toBeLessThan(100);
    });

    it('handles recent birth date', () => {
      const birthDate = new Date();
      birthDate.setFullYear(birthDate.getFullYear() - 5);
      const age = calculateAge(birthDate);
      expect(age).toBe(5);
    });

    it('handles leap year birthday', () => {
      const birthDate = new Date('2000-02-29');
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateBMI', () => {
    it('calculates BMI correctly', () => {
      const bmi = calculateBMI(70, 1.75);
      expect(bmi).toBeCloseTo(22.86, 1);
    });

    it('handles zero weight', () => {
      const bmi = calculateBMI(0, 1.75);
      expect(bmi).toBe(0);
    });

    it('handles zero height', () => {
      const bmi = calculateBMI(70, 0);
      expect(bmi).toBe(0);
    });

    it('returns correct BMI category', () => {
      const bmi = calculateBMI(50, 1.60);
      expect(bmi).toBeGreaterThan(0);
    });
  });

  describe('calculateBillTotal', () => {
    it('calculates total from items', () => {
      const items = [
        { quantity: 2, unitPrice: 100 },
        { quantity: 1, unitPrice: 200 },
      ];
      const total = calculateBillTotal(items);
      expect(total).toBe(400);
    });

    it('handles empty items', () => {
      const total = calculateBillTotal([]);
      expect(total).toBe(0);
    });

    it('handles single item', () => {
      const items = [{ quantity: 3, unitPrice: 50 }];
      const total = calculateBillTotal(items);
      expect(total).toBe(150);
    });
  });

  describe('calculateTax', () => {
    it('calculates tax correctly', () => {
      const tax = calculateTax(1000, 18);
      expect(tax).toBe(180);
    });

    it('handles zero tax rate', () => {
      const tax = calculateTax(1000, 0);
      expect(tax).toBe(0);
    });

    it('handles zero amount', () => {
      const tax = calculateTax(0, 18);
      expect(tax).toBe(0);
    });
  });

  describe('calculateDiscount', () => {
    it('calculates percentage discount', () => {
      const discounted = calculateDiscount(1000, 10, 'percentage');
      expect(discounted).toBe(900);
    });

    it('calculates fixed discount', () => {
      const discounted = calculateDiscount(1000, 100, 'fixed');
      expect(discounted).toBe(900);
    });

    it('handles discount larger than amount', () => {
      const discounted = calculateDiscount(100, 200, 'fixed');
      expect(discounted).toBe(0);
    });

    it('handles zero discount', () => {
      const discounted = calculateDiscount(1000, 0, 'percentage');
      expect(discounted).toBe(1000);
    });
  });
});
