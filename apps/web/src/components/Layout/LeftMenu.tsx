import { CategoryList } from "../Menu/CategoryList";
import { HistoryList } from "../Menu/HistoryList";
import { TagList } from "../Menu/TagList";
import Link from "next/link";
import Image from "next/image";
import { getActivePosts } from "@/lib/db/posts";

export async function LeftMenu() {
  // Fetch posts from the database
  const posts = await getActivePosts();

  return (
    <div>
      <div>
        <Link href="/" className="text-xl font-bold ml-2 mt-2">
          <Image
            src="/wsulogo.png"
            alt="WSU_Logo"
            width={32}
            height={32}
            className="inline-block mr-2"
          />
          Full Stack Blog
        </Link>
      </div>
      <nav className="ml-2">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <CategoryList posts={posts} />
          </li>
          <li>
            <HistoryList selectedYear="" selectedMonth="" posts={posts} />
          </li>
          <li>
            <TagList selectedTag="" posts={posts} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
