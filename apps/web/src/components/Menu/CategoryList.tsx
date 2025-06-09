'use client';

import { categories } from "@/functions/categories";
import type { Post } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { SummaryItem } from "./SummaryItem";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function CategoryList({ posts }: { posts: Post[] }) {
  // TODO: Implement proper category list
  const pathname = usePathname();

  const categoryList = useMemo(() => categories(posts),
    [posts]
  );
  
  return (
    <>
      <h2 className="text-lg font-semibold mb-3 mt-3">Categories</h2>
      <ul className="pl-0">
        {categoryList.map((item) => {
          // Create the category URL
          const categoryUrl = `/category/${toUrlPath(item.name)}`;
          // Check if this category is currently selected
          const isSelected = pathname === categoryUrl;
          
          return (
            <SummaryItem
              key={item.name}
              count={item.count}
              name={item.name}
              isSelected={isSelected}
              link={categoryUrl}
              title={`Category / ${item.name}`}
            />
          );
        })}
      </ul>
    </>
  );
}
