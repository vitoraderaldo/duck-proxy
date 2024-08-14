import { jest, expect } from '@jest/globals';
import { SearchUseCase } from './search';
import { ApiProxy } from '@/server/services/proxy/api-proxy-interface';
import { ApiProxyErrors } from '../errors/search-error';

describe('SearchUseCase', () => {
  let searchUseCase: SearchUseCase;
  let mockApiProxy: jest.Mocked<ApiProxy>;

  beforeEach(() => {
    mockApiProxy = {
      search: jest.fn(),
    }

    searchUseCase = new SearchUseCase(mockApiProxy);
  });

  it('should throw an error if the search term is not provided', async () => {
    const input = {
      query: '',
      page: 1,
      locale: 'en-US',
    };

    try {
      await searchUseCase.execute(input);
      throw new Error();
    } catch (err: any) {
      expect(err.message).toBe('Search term was not provided');
    }
  });

  it('should call apiProxy with correct parameters when locale is provided', async () => {
    const input = {
      query: 'test-query',
      page: 1,
      locale: 'fr-FR',
    };

    const expectedOutput = {
      page: 1,
      results: [
        {
          title: 'Result Title',
          description: 'Result Description',
          icon: 'icon.png',
          url: 'https://example.com',
        },
      ],
      errors: [],
    };

    mockApiProxy.search.mockResolvedValue(expectedOutput);

    const result = await searchUseCase.execute(input);

    expect(mockApiProxy.search).toHaveBeenCalledWith({
      term: input.query,
      page: input.page,
      locale: input.locale,
    });

    expect(result).toEqual(expectedOutput);
  });

  it('should call apiProxy.search with default locale when locale is not provided', async () => {
    const input = {
      query: 'test-query',
      page: 1,
      locale: undefined,
    };

    const expectedOutput = {
      page: 1,
      results: [
        {
          title: 'Result Title',
          description: 'Result Description',
          icon: 'icon.png',
          url: 'https://example.com',
        },
      ],
      errors: [],
    };

    mockApiProxy.search.mockResolvedValue(expectedOutput);

    const result = await searchUseCase.execute(input);

    expect(mockApiProxy.search).toHaveBeenCalledWith({
      term: input.query,
      page: input.page,
      locale: 'en-US', 
    });

    expect(result).toEqual(expectedOutput);
  });

  it('should handle errors returned from the apiProxy', async () => {
    const input = {
      query: 'test-query',
      page: 1,
      locale: 'en-US',
    };

    const expectedOutput = {
      page: 1,
      results: [],
      errors: [
        {
          code: 'ERROR' as ApiProxyErrors,
        },
      ],
    };

    mockApiProxy.search.mockResolvedValue(expectedOutput);

    const result = await searchUseCase.execute(input);
    expect(result).toEqual(expectedOutput);
  });
});
