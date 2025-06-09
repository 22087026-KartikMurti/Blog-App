'use client';

import type { Post } from "@repo/db/data";
import BlogList from "./Blog/List";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Main({
  posts,
  className,
}: {
  posts: Post[];
  className?: string;
}) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    //This is just to simulate loading time
    //In production the timer would be removed and the 
    //loading state would only happen when the posts are too slow to load
    //(e.g. low network speed, slow server, etc.)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);

  }, [searchParams]);

  return (
    <main className={className}>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-pulse text-lg">Loading posts...</div>
        </div>
      ) : (
        <BlogList posts={posts} />
      )}
    </main>
  );
}
