// utils.test.ts

import { createResponse, getFormattedDate } from '@/lib/utils';

describe('utils', () => {
  describe('createResponse', () => {
    it('should wrap the data in a response object', () => {
      const mockNumberData = 123;
      const mockStringData = 'test';
      const mockObjectData = { key: 'value' };

      expect(createResponse(mockNumberData)).toEqual({ response: mockNumberData });
      expect(createResponse(mockStringData)).toEqual({ response: mockStringData });
      expect(createResponse(mockObjectData)).toEqual({ response: mockObjectData });
    });
  });

  describe('getFormattedDate', () => {
    it('should format a Date object correctly', () => {
      expect(getFormattedDate(new Date('2024-08-24T00:00:00Z'))).toBe('August 24, 2024');
    });

    it('should safety check and return an empty string for invalid dates', () => {
      expect(getFormattedDate(null)).toBe('');
      expect(getFormattedDate('invalid-date')).toBe('');
      expect(getFormattedDate(new Date('invalid-date'))).toBe('');
    });
  });
});
