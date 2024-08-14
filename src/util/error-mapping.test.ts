import { expect } from '@jest/globals';

import { generateErrorMessage } from "./error-mapping";
import { ApiProxyErrors } from "@/server/errors/search-error";

describe('generateErrorMessage', () => {
  const DEFAULT_ERROR_MESSAGE = 'An unkown error happened. Try again later';

  it('should return the default error message when no code is provided', () => {
    const result = generateErrorMessage();
    expect(result).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('should return the correct message for RATE_LIMIT_EXCEEDED error', () => {
    const result = generateErrorMessage('RATE_LIMIT_EXCEEDED');
    expect(result).toBe('Rate Limit Exceeded. Try again later');
  });

  it('should return the correct message for UNKNOWN error', () => {
    const result = generateErrorMessage('UNKNOWN');
    expect(result).toBe(DEFAULT_ERROR_MESSAGE);
  });

  it('should return the default error message for an unrecognized error code', () => {
    const result = generateErrorMessage('UNRECOGNIZED_ERROR_CODE' as ApiProxyErrors);
    expect(result).toBe(DEFAULT_ERROR_MESSAGE);
  });
});
