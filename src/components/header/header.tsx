'use client';

import { Suspense, useEffect, useState } from "react";
import SearchInput from "@/components/header/search";
import { Button, Link } from "@nextui-org/react";
import { Paths } from "@/paths";
import { useAppDispatch, useAppSelector } from "@/global-state/boilerplate/hooks";
import { setHistory } from "@/global-state/search-history";
import historyService from "@/util/history-service/history-factory";
import Cross from "@/components/icons/cross";

export default function Header() {
  const [historyVisibility, setHistoryVisibility] = useState("hidden")
  const searchHistoryState = useAppSelector((state) => state.searchHistoryReducer)
  const records = [...searchHistoryState.records].reverse()

  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentHistory = historyService.get();
    if (currentHistory.length && !searchHistoryState.records.length) {
      dispatch(setHistory(currentHistory))
    }
  });

  const changeVisibility = () => {
    if (historyVisibility === 'visible') {
      setHistoryVisibility('hidden');
    } else {
      setHistoryVisibility('visible');
    }
  }

  const isoDateToHumanDate = (date: string): string => {

    const currentDate = new Date();
    const historyDate = new Date(date);

    const shouldIncludeYear = currentDate.getUTCFullYear() !== historyDate.getUTCFullYear();

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }

    if (shouldIncludeYear) {
      options.year = 'numeric'
    }

    return historyDate.toLocaleString(undefined, options)
  }

  const History = () => {
    if (!records.length) {
      return (
        <p className="text-center text-gray-500 mt-4">You have not searched yet</p>
      )
    }
    
    return records.map((query, index) => {
      return (
        <Link 
          id={`history-item-${index}`}
          key={index}
          href={Paths.searchPage(query)}
          onClick={changeVisibility}
          className="block"
        >
          <div className="bg-white bg-opacity-50 shadow-md my-1 flex flex-row w-full justify-between items-center p-3 hover:bg-gray-100">
            <h4 className="max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium text-blue-600">{query.query}</h4>
            <h5 className="text-xs text-gray-600">{isoDateToHumanDate(query.isoDate)}</h5>
          </div>
        </Link>
      );
    })
  }


  return (
    <header className="border-b-1 py-4 flex flex-row justify-between items-center gap-x-12 px-3">
      <div className="flex gap-x-12">
        <Link className="hover:underline text-black text-md" href="/">Home</Link>
        <Button id="history" className="bg-transparent hover:underline text-black text-md" onClick={changeVisibility}>History</Button>
      </div>     
      <Suspense><SearchInput /></Suspense>

      <div id="history-modal" className={`z-50 absolute max-w-md bg-gray-100 inset-0 border ${historyVisibility} overflow-scroll`}>
        <div className="flex flex-col p-3">
          <div className="flex flex-row mb-3">
            <h3 className="text-lg w-full text-center">History</h3>
            <button 
              onClick={changeVisibility} 
              className="h-auto w-auto bg-transparent absolute right-3 top-2 hover:opacity-70"
            >
              <Cross width={16} height={16} />
            </button>
          </div>
          
          <History />

        </div>
      </div>

    </header>
  )
}
