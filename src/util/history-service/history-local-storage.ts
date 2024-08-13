import { SearchHistoryService, SearchHistory } from "@/util/history-service/history-service";

export class SearchHistoryLocalStorage implements SearchHistoryService {
  private readonly HISTORY_SEARCH_KEY = 'HISTORY_SEARCH';

  get(): SearchHistory[] {
    const items = localStorage.getItem(this.HISTORY_SEARCH_KEY);
    return JSON.parse(items || '[]');
  }

  save(history: SearchHistory): void {
    const items = this.get();
    items.push(history)

    localStorage.setItem(
      this.HISTORY_SEARCH_KEY,
      JSON.stringify(items)
    );
  }
  
  
}
