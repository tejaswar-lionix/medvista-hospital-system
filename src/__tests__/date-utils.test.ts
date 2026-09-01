import { isToday, isTomorrow, isYesterday, getDaysBetween, isWeekend, formatRelativeTime } from '@/lib/date-utils';

describe('Date Utilities', () => {
  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true);
    });

    it('returns false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it('returns false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('isTomorrow', () => {
    it('returns true for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isTomorrow(tomorrow)).toBe(true);
    });

    it('returns false for today', () => {
      expect(isTomorrow(new Date())).toBe(false);
    });
  });

  describe('isYesterday', () => {
    it('returns true for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isYesterday(yesterday)).toBe(true);
    });

    it('returns false for today', () => {
      expect(isYesterday(new Date())).toBe(false);
    });
  });

  describe('getDaysBetween', () => {
    it('calculates days between two dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-10');
      expect(getDaysBetween(date1, date2)).toBe(9);
    });

    it('returns 0 for same date', () => {
      const date = new Date('2024-01-01');
      expect(getDaysBetween(date, date)).toBe(0);
    });

    it('handles reversed dates', () => {
      const date1 = new Date('2024-01-10');
      const date2 = new Date('2024-01-01');
      expect(getDaysBetween(date1, date2)).toBe(9);
    });
  });

  describe('isWeekend', () => {
    it('returns true for Saturday', () => {
      const saturday = new Date('2024-01-06'); // Saturday
      expect(isWeekend(saturday)).toBe(true);
    });

    it('returns true for Sunday', () => {
      const sunday = new Date('2024-01-07'); // Sunday
      expect(isWeekend(sunday)).toBe(true);
    });

    it('returns false for weekday', () => {
      const monday = new Date('2024-01-08'); // Monday
      expect(isWeekend(monday)).toBe(false);
    });
  });

  describe('formatRelativeTime', () => {
    it('returns "just now" for recent time', () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe('just now');
    });

    it('returns minutes ago', () => {
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      const result = formatRelativeTime(fiveMinutesAgo);
      expect(result).toContain('minutes ago');
    });

    it('returns hours ago', () => {
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
      const result = formatRelativeTime(twoHoursAgo);
      expect(result).toContain('hours ago');
    });
  });
});
