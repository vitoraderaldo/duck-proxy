import { SearchHistory } from '@/util/history-service/history-service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import historyService from '@/util/history-service/history-factory'

const initialState: {
  records: SearchHistory[],
} = {
  records: [],
}

const searchHistorySlice = createSlice({
  name: 'SEARCH_HISTORY_RECORDS',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<SearchHistory[]>) => {
      state.records = action.payload
    },
    addHistory: (state, action: PayloadAction<SearchHistory>) => {
      historyService.save(action.payload)
      state.records.push(action.payload)
    }
  }
})

export const { addHistory, setHistory } = searchHistorySlice.actions;
export const searchHistoryReducer = searchHistorySlice.reducer;
