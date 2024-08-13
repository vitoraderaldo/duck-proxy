import { configureStore } from '@reduxjs/toolkit'
import { searchHistoryReducer } from '@/global-state/search-history'

export const makeStore = () => {
  return configureStore({
    reducer: {
      searchHistoryReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
