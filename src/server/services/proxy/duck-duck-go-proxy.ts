import { ApiProxy, ApiProxySearchInput, ApiProxySearchOutput } from "@/server/services/proxy/api-proxy-interface";
import { search, SearchResult } from 'duck-duck-scrape';
import { ApiProxyErrors } from "@/server/errors/search-error";
import { decode } from "html-entities";

export class DuckDuckGoProxy implements ApiProxy {
  async search(input: ApiProxySearchInput): Promise<ApiProxySearchOutput> {
    const offset = input.page - 1
    const locale = input.locale;

    try {
      const results = await search(input.term, { offset, locale});

      return {
        page: input.page,
        results: this.convertToProxyOutputDto(results.results),
      }
    } catch (err: any) {
      console.error(`Failed to fetch using DuckDuckGo for term: (${input.term}) and page: (${input.page})`, err)
      return this.convertErrorToOutputError(err.message)
    }
  }

  private convertToProxyOutputDto(results: SearchResult[]): ApiProxySearchOutput['results'] {
    return results.map(result => {
      return {
        title: decode(result.title),
        description: this.stripHtml(result.description),
        icon: result.icon,
        url: `${result.url}`,
      }
    })
  }

  private convertErrorToOutputError(message: string): ApiProxySearchOutput {
    let err: ApiProxyErrors = 'UNKNOWN';
    if (message.includes('making requests too quickly')) {
      err = 'RATE_LIMIT_EXCEEDED';
    }

    return {
      page: 0,
      results: [],
      errors: [{ code: err }]
    }
  }

  private stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  }
}
