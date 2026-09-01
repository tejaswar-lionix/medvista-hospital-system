import { cn, formatDate, formatCurrency, getInitials, slugify } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn', () => {
    it('merges class names', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });

    it('handles conditional classes', () => {
      const result = cn('base', false && 'hidden', 'extra');
      expect(result).toContain('base');
      expect(result).toContain('extra');
      expect(result).not.toContain('hidden');
    });

    it('handles undefined and null', () => {
      const result = cn('base', undefined, null);
      expect(result).toBe('base');
    });
  });

  describe('formatDate', () => {
    it('formats a valid date string', () => {
      const result = formatDate('2024-03-15');
      expect(result).toBeTruthy();
    });

    it('handles Date objects', () => {
      const date = new Date('2024-03-15');
      const result = formatDate(date);
      expect(result).toBeTruthy();
    });
  });

  describe('formatCurrency', () => {
    it('formats currency with default locale', () => {
      const result = formatCurrency(1000);
      expect(result).toBeTruthy();
    });

    it('formats zero amount', () => {
      const result = formatCurrency(0);
      expect(result).toBeTruthy();
    });

    it('formats negative amounts', () => {
      const result = formatCurrency(-500);
      expect(result).toBeTruthy();
    });
  });

  describe('getInitials', () => {
    it('returns initials from full name', () => {
      const result = getInitials('John Doe');
      expect(result).toBe('JD');
    });

    it('returns single initial for single name', () => {
      const result = getInitials('John');
      expect(result).toBe('J');
    });

    it('handles three part names', () => {
      const result = getInitials('John Michael Doe');
      expect(result).toBe('JM');
    });

    it('handles empty string', () => {
      const result = getInitials('');
      expect(result).toBe('');
    });
  });

  describe('slugify', () => {
    it('converts string to slug', () => {
      const result = slugify('Hello World');
      expect(result).toBe('hello-world');
    });

    it('handles special characters', () => {
      const result = slugify('Hello! @World#');
      expect(result).toBe('hello-world');
    });

    it('handles multiple spaces', () => {
      const result = slugify('Hello   World');
      expect(result).toBe('hello-world');
    });

    it('removes leading/trailing spaces', () => {
      const result = slugify('  Hello World  ');
      expect(result).toBe('hello-world');
    });
  });
});
