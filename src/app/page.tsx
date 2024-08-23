import { Link } from "@nextui-org/react";
import React from "react";

export default function Home() {
  return (
    <div className="h-full-minus-header flex flex-col justify-center items-center px-4 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Proxy Search Engine</h1>
      <p className="text-lg mt-2">A seamless way to search the web using DuckDuckGo API</p>
      <p className="text-md mt-4">Developed by <Link href="https://github.com/vitoraderaldo">Vitor Aderaldo</Link></p>
    </div>

  );
}
