'use client';

import { Pagination } from "@nextui-org/react";
import { redirectToSearchPage } from "@/server/actions";

interface PaginationProps {
  total: number;
  page: number;
  query: string;
  locale: string;
}

export default function SearchPagination({
  total,
  page,
  query,
  locale,
} : PaginationProps) {

  return (
    <Pagination 
      total={total} 
      initialPage={page} 
      onChange={(newPage) => redirectToSearchPage({ query, page: newPage, locale })}
    />
  );
}
