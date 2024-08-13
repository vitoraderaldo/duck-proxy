import { redirect } from "next/navigation";
import { Paths } from "@/paths";
import SearchPagination from "@/components/search-result/pagination";
import { Suspense } from "react";
import SearchResult from "@/components/search-result/result";
import { Spinner } from "@nextui-org/react";

export default async function SearchPage(props: {
  searchParams: {
    query: string;
    page: string;
    locale: string;
  }
}) {
  
  const { query, locale } = props.searchParams
  const page = parseInt(props.searchParams.page || '1');

  if (!query) {
    redirect(Paths.homePage())
  }

  return (
    <div className="h-full-minus-header flex flex-col justify-between">      
      <div className="w-full h-full overflow-scroll">
        <Suspense 
          key={`query=${query}&page=${page}`}
          fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size="lg"/>
          </div>
        } >
          <SearchResult {...props.searchParams} page={page} />
        </Suspense> 
      </div>
      
      <div className="flex justify-center py-4 border-t-1">
        <SearchPagination 
          key={`query=${query}&page=${page}`}
          total={20} 
          page={page} 
          query={query} 
          locale={locale}
        />
      </div>
     
    </div>
  )


}
