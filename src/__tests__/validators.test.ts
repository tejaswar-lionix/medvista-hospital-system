import { isValidIndianPhone, isValidBloodGroup, isValidEmail, isValidPassword } from '@/lib/validators-extra';

describe('Validator Functions', () => {
  describe('isValidIndianPhone', () => {
    it('validates correct Indian phone numbers', () => {
      expect(isValidIndianPhone('9876543210')).toBe(true);
      expect(isValidIndianPhone('8765432109')).toBe(true);
      expect(isValidIndianPhone('7654321098')).toBe(true);
    });

    it('validates phone with country code', () => {
      expect(isValidIndianPhone('+919876543210')).toBe(true);
      expect(isValidIndianPhone('919876543210')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(isValidIndianPhone('1234567890')).toBe(false);
      expect(isValidIndianPhone('987654321')).toBe(false);
      expect(isValidIndianPhone('98765432101')).toBe(false);
    });

    it('rejects non-numeric input', () => {
      expect(isValidIndianPhone('abcdefghij')).toBe(false);
      expect(isValidIndianPhone('98765abcde')).toBe(false);
    });
  });

  describe('isValidBloodGroup', () => {
    it('validates all blood groups', () => {
      expect(isValidBloodGroup('A+')).toBe(true);
      expect(isValidBloodGroup('A-')).toBe(true);
      expect(isValidBloodGroup('B+')).toBe(true);
      expect(isValidBloodGroup('B-')).toBe(true);
      expect(isValidBloodGroup('AB+')).toBe(true);
      expect(isValidBloodGroup('AB-')).toBe(true);
      expect(isValidBloodGroup('O+')).toBe(true);
      expect(isValidBloodGroup('O-')).toBe(true);
    });

    it('rejects invalid blood groups', () => {
      expect(isValidBloodGroup('C+')).toBe(false);
      expect(isValidBloodGroup('AB')).toBe(false);
      expect(isValidBloodGroup('')).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.in')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@invalid.com')).toBe(false);
      expect(isValidEmail('invalid@.com')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('validates strong passwords', () => {
      expect(isValidPassword('Password123!')).toBe(true);
      expect(isValidPassword('Str0ng@Pass')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(isValidPassword('')).toBe(false);
      expect(isValidPassword('weak')).toBe(false);
      expect(isValidPassword('12345678')).toBe(false);
    });
  });
});
