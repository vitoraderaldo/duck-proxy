import { ApiProxyErrors } from "@/server/errors/search-error";

const DEFAULT_ERROR_MESSAGE = 'An unkown error happened. Try again later';

const SearchErrorMapping: {
  [k in ApiProxyErrors]: string
} = {
  'RATE_LIMIT_EXCEEDED': 'Rate Limit Exceeded. Try again later',
  'UNKNOWN': DEFAULT_ERROR_MESSAGE,
}

export const generateErrorMessage = (code?: ApiProxyErrors): string => {
  if (!code ) {
    return DEFAULT_ERROR_MESSAGE;
  }
  return SearchErrorMapping[code] || DEFAULT_ERROR_MESSAGE;
}
