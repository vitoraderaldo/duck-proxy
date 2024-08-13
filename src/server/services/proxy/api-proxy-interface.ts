import { ApiProxyErrors } from "@/server/errors/search-error";

export interface ApiProxySearchInput {
  term: string;
  page: number;
  locale: string;
}

export interface ApiProxySearchOutput {
  page: number;
  results: {
    title: string;
    description: string;
    icon: string;
    url: string;
  }[]
  errors?: {
    code: ApiProxyErrors
  }[]
}

export interface ApiProxy {
  search(input: ApiProxySearchInput): Promise<ApiProxySearchOutput>
}
