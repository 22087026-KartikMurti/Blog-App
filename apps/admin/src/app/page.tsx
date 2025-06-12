import { isLoggedIn } from "../utils/auth";
import { filterPosts } from "../utils/filterPosts";
import Link from "next/link";
import { getPosts } from "../lib/db/posts";

import { Login } from "../components/Login";
import { Filters } from "../components/Filters";
import { LogoutButton } from "../components/LogoutButton";
import { FilteredList } from "../components/FilteredList";


export default async function Home({
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
  const loggedIn = await isLoggedIn();

  if (!loggedIn) {
    return(
      <main>
        <Login />
      </main>
    );
  } else {

    const dbPosts = await getPosts();
    const posts = dbPosts.map((post) => ({
      ...post,
      likes: post.Likes.length,
    }));
     
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
          <FilteredList filteredPosts={filteredPosts} filtered={filtered} />
        </div>

      </main>
    );
  }
}
