import { SearchHistoryLocalStorage } from "@/util/history-service/history-local-storage";
import { SearchHistoryService } from "@/util/history-service/history-service";

class SearchHistoryFactoryService {
  static create(): SearchHistoryService {
    return new SearchHistoryLocalStorage();
  }
}

export default SearchHistoryFactoryService.create();
