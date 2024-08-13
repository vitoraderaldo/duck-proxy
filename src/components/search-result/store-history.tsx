'use client'

import { useEffect } from "react";
import { addHistory } from "@/global-state/search-history";
import { useAppDispatch } from "@/global-state/boilerplate/hooks";

export default function StoreHistory(params: {
  query: string;
  page: number;
  locale: string;
}) {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (params.page !== 1) {
      return;
    } 

    const history = {
      ...params,
      isoDate: new Date().toISOString(),
    }

    dispatch(addHistory(history))
  });

  return <></>
}
