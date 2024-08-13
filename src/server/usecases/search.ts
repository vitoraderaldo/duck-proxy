import { ApiProxyErrors } from "@/server/errors/search-error";
import apiProxy from "@/server/services/proxy/api-proxy-factory";

interface SearchInputDto {
  query: string;
  page: number;
  locale: string;
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

class SearchUseCase {
  execute(input: SearchInputDto): Promise<SearchOutputDto> {
    const term = input.query;
    const page = input.page;
    const locale = input.locale || 'en-US'

    if (!term) {
      throw new Error("Search term was not provided")
    }

    return apiProxy.search({ term, page, locale })
  }
}

const searchUseCase = new SearchUseCase()
export default searchUseCase;
