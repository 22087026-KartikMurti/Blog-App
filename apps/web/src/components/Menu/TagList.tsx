"use client";

import { type Post } from "@repo/db/data";
import { tags } from "../../functions/tags";
import { SummaryItem } from "./SummaryItem";
import { usePathname } from "next/navigation";
import { toUrlPath } from "@repo/utils/url";
import { useMemo } from "react";

export function TagList({
  selectedTag,
  posts,
}: {
  selectedTag?: string;
  posts: Post[];
}) {
  const pathname = usePathname();

  const tagList = useMemo(() => tags(posts),
    [posts]
  );

  return (
    <>
      <h2 className="text-lg font-semibold mb-3">Tags</h2>
      <ul>
        {tagList.map((tag) => {
          const tagUrl = `/tags/${toUrlPath(tag.name)}`;
          const isSelected = pathname === tagUrl || selectedTag === tag.name;
          
          return (
            <SummaryItem
              key={tag.name}
              name={tag.name}
              count={tag.count}
              isSelected={isSelected}
              link={tagUrl}
              title={`Tag / ${tag.name}`}
            />
          );
        })}
      </ul>
    </>
  );
}
