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

  const result = await search(props);

  if (result.errors) {
    const errorMessage = generateErrorMessage(result.errors[0].code);

    return (
      <div>
        <h3>Something went wrong!</h3>
        <h3>{errorMessage}</h3>
      </div>
    )
  }

  let totalHighlighted = 0;

  const highlightedResults = result.results.map((result) => {
    const highlightedDescription = HighLighter.highlight(props.query, result.description);

    totalHighlighted = totalHighlighted + highlightedDescription.totalHighLighted;

    return {
      ...result,
      description: <Highlighter key={result.url} tokens={highlightedDescription.tokens} />,
    }
  })

  const TotalHighlighted = () => {
    return (
      <div>
        <h3 className="text-md">Spotted {totalHighlighted} mentions on page {props.page} </h3>
      </div>
    )
  }

  

  const SearchResult = () => {
    return highlightedResults.map((result, index) => {
      return (
        <div key={index} className="flex flex-col">
          
          <Link href={result.url} target="_blank">
            <div className="flex flex-row items-center gap-x-3">
              <Avatar className="w-5 h-5 text-tiny" size="sm" src={result.icon} />
              <span className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{result.url}</span>
            </div>

            <h3 className="text-md text-blue-600">{result?.title}</h3>
          </Link>
          <p className="text-sm text-">
            {result?.description}
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
