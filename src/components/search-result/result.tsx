import { search } from "@/server/actions";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { generateErrorMessage } from "@/util/error-mapping";
import StoreHistory from "@/components/search-result/store-history";
import { HighLighter } from "@/util/highlighter/highlighters";
import { Highlighter } from "@/util/highlighter/jsx-highlighter";

export default async function SearchResult(props: {
  query: string;
  page: number;
  locale: string
}) {

  const searchResults = await search(props);

  if (searchResults.errors) {
    const errorMessage = generateErrorMessage(searchResults.errors[0].code);

    return (
      <div className="text-center mt-8">
        <h3 className="text-red-500 text-xl font-bold">Something went wrong!</h3>
        <p className="text-gray-700">{errorMessage}</p>
      </div>
    )
  }

  let totalHighlightedCount = 0;

  const highlightedResults = searchResults.results.map((result) => {
    const highlightedDescription = HighLighter.highlight(props.query, result.description);

    totalHighlightedCount = totalHighlightedCount + highlightedDescription.totalHighLighted;

    return {
      ...result,
      highlightedDescription: <Highlighter key={result.url} tokens={highlightedDescription.tokens} />,
    }
  })

  const TotalHighlighted = () => {
    return (
      <div id="highlighted-count">
        <h3 className="text-md">Spotted {totalHighlightedCount} mentions on page {props.page}</h3>
      </div>
    )
  }

  

  const SearchResult = () => {
    return highlightedResults.map((result, index) => {
      return (
        <div 
          id={`result-${index}`}
          key={index}
          className="flex flex-col p-4 rounded-lg shadow-md mb-2"
        >
          
          <Link href={result.url} target="_blank">
            <div className="flex flex-row items-center gap-x-3">
              <Avatar className="w-5 h-5 text-tiny" size="sm" src={result.icon} />
              <span className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{result.url}</span>
            </div>

            <h3 className="text-md font-semibold text-gray-800">{result?.title}</h3>
          </Link>
          <p className="text-sm text-gray-600">
            {result?.highlightedDescription}
          </p>
  
        </div>
      )
    })
  }

  return (
    <div className="py-3 ml-5 flex flex-col gap-5 max-w-3xl">
      <StoreHistory {...props} />
      <TotalHighlighted />
      <SearchResult />
    </div> 
  )


}
