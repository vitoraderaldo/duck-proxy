'use server';

import { RedirectToSearchPageUseCase } from "@/server/usecases/redirect-to-search-page";

export async function redirectToSearchPageViaForm(formData: FormData) {
  const query = formData.get('query')?.toString() || '';
  const locale = formData.get('locale')?.toString() || '';

  RedirectToSearchPageUseCase.execute({query, locale, page: 1});
}

export async function redirectToSearchPage(input: {
  query: string,
  page: number,
  locale: string,
}) {
  RedirectToSearchPageUseCase.execute(input);
}
