'use client';

import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { redirectToSearchPageViaForm } from "@/server/actions";
import { useEffect, useState } from "react";

export default function SearchInput() {

  const params = useSearchParams();
  const query = params.get('query');

  const [locale, setLocale] = useState('');

  useEffect(() => {
    setLocale(navigator.language);
  }, [])

  return (
    <div className="flex w-full">
      <form action={redirectToSearchPageViaForm} className="w-full flex gap-x-4">
        <Input 
          name="query"
          placeholder="What do you want to search?"
          defaultValue={query || ''}
        />
        <Input className="hidden"
          name="locale"
          value={locale}
        />    
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}
