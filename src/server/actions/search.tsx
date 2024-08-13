'use server'

import SearchUseCase from "@/server/usecases/search";
import { ApiProxyErrors } from "@/server/errors/search-error";

interface SearchActionInput {
  query: string;
  page: number;
  locale: string;
}

export interface SearchActionOutput {
  page: number;
  results: {
    title: string;
    description: string;
    icon: string;
    url: string;
  }[];
  errors?: {
    code: ApiProxyErrors
  }[]
}

export async function search(input: SearchActionInput): Promise<SearchActionOutput> {
  return SearchUseCase.execute({
    query: input.query,
    page: input.page,
    locale: input.locale
  });
}
