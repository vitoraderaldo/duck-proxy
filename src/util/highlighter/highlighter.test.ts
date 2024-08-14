
import { expect } from '@jest/globals';
import { HighLighter } from './highlighters';

describe('HighLighter', () => {

  describe('highlight', () => {

    it('should return an empty result when no search terms are provided', () => {
      const result = HighLighter.highlight('', 'This is a test');
      expect(result).toEqual({
        totalHighLighted: 0,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: false },
          { word: 'a', shouldHighlight: false },
          { word: 'test', shouldHighlight: false },
        ],
      });
    });

    it('should correctly highlight the matching words', () => {
      const result = HighLighter.highlight('test', 'This is a test');
      expect(result).toEqual({
        totalHighLighted: 1,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: false },
          { word: 'a', shouldHighlight: false },
          { word: 'test', shouldHighlight: true },
        ],
      });
    });

    it('should correctly highlight multiple matching words', () => {
      const result = HighLighter.highlight('test is', 'This is a test');
      expect(result).toEqual({
        totalHighLighted: 2,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: true },
          { word: 'a', shouldHighlight: false },
          { word: 'test', shouldHighlight: true },
        ],
      });
    });

    it('should be case insensitive when highlighting words', () => {
      const result = HighLighter.highlight('Test', 'This is a test');
      expect(result).toEqual({
        totalHighLighted: 1,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: false },
          { word: 'a', shouldHighlight: false },
          { word: 'test', shouldHighlight: true },
        ],
      });
    });

    it('should ignore punctuation in both search and text tokens', () => {
      const result = HighLighter.highlight('test', 'This is a test.');
      expect(result).toEqual({
        totalHighLighted: 1,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: false },
          { word: 'a', shouldHighlight: false },
          { word: 'test.', shouldHighlight: true },
        ],
      });
    });

    it('should not highlight words that do not match the search terms', () => {
      const result = HighLighter.highlight('apple', 'This is a test');
      expect(result).toEqual({
        totalHighLighted: 0,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: false },
          { word: 'a', shouldHighlight: false },
          { word: 'test', shouldHighlight: false },
        ],
      });
    });

    it('should correctly handle multiple spaces and punctuation', () => {
      const result = HighLighter.highlight('test', 'This  is a  test!!');
      expect(result).toEqual({
        totalHighLighted: 1,
        tokens: [
          { word: 'This', shouldHighlight: false },
          { word: 'is', shouldHighlight: false },
          { word: 'a', shouldHighlight: false },
          { word: 'test!!', shouldHighlight: true },
        ],
      });
    });

  });

});
