export interface SearchHistory {
  isoDate: string;
  query: string;
  page: number;
  locale: string;
}

export interface SearchHistoryService {
  get(): SearchHistory[],
  save(history: SearchHistory): void
}
