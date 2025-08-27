'use client';

import { use, useEffect, useState } from "react";
import { filterPosts } from "../utils/filterPosts";
import Link from "next/link";
import { Post } from "@repo/db/data";

import { Filters } from "../components/Filters";
import { LogoutButton } from "../components/LogoutButton";
import { FilteredList } from "../components/FilteredList";

export default async function Homepage({
    searchParams,
}: {    
        searchParams: Promise<{
        contentOrTitle?: string;
        tag?: string;
        date?: string;
        sort?: string;
        active?: string;
    }>;
}) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/posts", {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const dbPosts: Post[] = await res.json();
                console.log("Got posts from database:", dbPosts);
                setPosts(dbPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    
    const params = await searchParams;
    const { filteredPosts, filtered } = filterPosts(posts, params);

    return (
      <main className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/">Admin of Full Stack Blog</Link>

          <div className="flex items-center gap-2">
            <Link 
              href="/posts/create" 
              className="bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded"
            >
              Create Post 
            </Link>
            <LogoutButton />
          </div>
        </div>

        <Filters params={params} />

        <div className="w-full">
            {loading && <div>Loading posts...</div>}
            <FilteredList filteredPosts={filteredPosts} filtered={filtered} />
        </div>

      </main>
    );
};