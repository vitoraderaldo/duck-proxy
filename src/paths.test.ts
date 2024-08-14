import { expect } from '@jest/globals';
import { Paths } from '@/paths';

describe('Paths', () => {
  describe('homePage', () => {
    it('should return the correct home page path', () => {
      const path = Paths.homePage();
      expect(path).toBe('/');
    });
  });

  describe('searchPage', () => {
    it('should return the correct search page path with all parameters provided', () => {
      const params = {
        query: 'test-query',
        page: 2,
        locale: 'fr-FR',
      };
      const path = Paths.searchPage(params);
      expect(path).toBe('/search?query=test-query&page=2&locale=fr-FR');
    });

    it('should default to page 1 if page is not provided', () => {
      const params = {
        query: 'test-query',
        page: undefined,
        locale: 'fr-FR',
      };
      const path = Paths.searchPage(params);
      expect(path).toBe('/search?query=test-query&page=1&locale=fr-FR');
    });

    it('should default to locale en-US if locale is not provided', () => {
      const params = {
        query: 'test-query',
        page: 2,
        locale: undefined,
      };
      const path = Paths.searchPage(params);
      expect(path).toBe('/search?query=test-query&page=2&locale=en-US');
    });

    it('should default to page 1 and locale en-US if both are not provided', () => {
      const params = {
        query: 'test-query',
        page: undefined,
        locale: undefined,
      };
      const path = Paths.searchPage(params);
      expect(path).toBe('/search?query=test-query&page=1&locale=en-US');
    });
  });
});
