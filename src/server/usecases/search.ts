import { ApiProxyErrors } from "@/server/errors/search-error";
import apiProxy from "@/server/services/proxy/api-proxy-factory";
import { ApiProxy } from "@/server/services/proxy/api-proxy-interface";

interface SearchInputDto {
  query: string;
  page: number;
  locale?: string;
}

interface SearchOutputDto {
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

export class SearchUseCase {

  constructor(
    private readonly apiProxy: ApiProxy,
  ) {}

  execute(input: SearchInputDto): Promise<SearchOutputDto> {
    const term = input.query;
    const page = input.page;
    const locale = input.locale || 'en-US'

    if (!term) {
      throw new Error("Search term was not provided")
    }

    return this.apiProxy.search({ term, page, locale })
  }
}

const searchUseCase = new SearchUseCase(apiProxy);
export default searchUseCase;
