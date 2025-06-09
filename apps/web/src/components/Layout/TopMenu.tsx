"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "../Themes/ThemeSwitcher";
import { useEffect, useState } from "react";

function debounce<T extends (...args: Any[]) => Any>(fn: T, delay = 300) {
  let timeoutId: Any;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function TopMenu({ query }: { query?: string }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query || "");

  useEffect(() => {
    setSearchTerm(query || '');
  }, [query]);

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      router.push(`/search?q=${search}`);
    },
    
  );

  // TODO: create and hook the search input to the handleSearch function
  //       make sure you are able to explain what the handleSearch is doing and what debounce does

  return (
    <div className="flex items-center justify-between space-x-4">
      <form action="#" method="GET" className="grid flex-1 grid-cols-1 ml-2 mt-2">
        <input 
          type="text"
          name="q"
          placeholder="Search posts..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md 
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e);
          }}
        />
      </form>
      <div className="flex items-center gap-x-6">
        <ThemeSwitch />
      </div>
    </div>
  );
}
