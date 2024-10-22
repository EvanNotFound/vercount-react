"use client"

import { useState } from "react";
import { useVercount } from "vercount-react";

export default function Home() {
  const [count, setCount] = useState(0);
  const visitorData = useVercount();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <div>
            <li>Site PV: {visitorData.sitePv}</li>
            <li>Page PV: {visitorData.pagePv}</li>
            <li>Site UV: {visitorData.siteUv}</li>
          </div>
        </ol>
        <button onClick={() => setCount(count + 1)}>Re-render</button>
      </main>
    </div>
  );
}