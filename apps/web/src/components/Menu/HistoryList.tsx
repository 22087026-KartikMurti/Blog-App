'use client';

import { history } from "@/functions/history";
import { type Post } from "@repo/db/data";
import { usePathname } from "next/navigation";
import { SummaryItem } from "./SummaryItem";
import { useMemo } from "react";

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function HistoryList({
  selectedYear,
  selectedMonth,
  posts,
}: {
  selectedYear?: string;
  selectedMonth?: string;
  posts: Post[];
}) {
  const pathname = usePathname();
  const historyItems = useMemo(() => history(posts),
    [posts]
  );

  // Group by year
  const groupedByYear: Record<number, Array<{month: number, count: number}>> = {};
  
  historyItems.forEach(item => {
    if (!groupedByYear[item.year]) {
      groupedByYear[item.year] = [];
    }
    
    groupedByYear[item.year]!.push({
      month: item.month,
      count: item.count
    });
  });
  
  // Get sorted years
  const sortedYears = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // TODO: use the "history" function on "functions" directory to get the history
  //       and render all history items using the SummaryItem component
  return (
    <div className="history-list">
      <h2 className="text-lg font-semibold mb-3">Archive</h2>
      {sortedYears.length === 0 ? (
        <p>No archives available</p>
      ) : (
        <div>
          {sortedYears.map(year => {
            return (
              <div key={year} className="mb-4">
                <h3 className="text-md font-medium mb-2 text-center">{year}</h3>
                <ul className="pl-2">
                  {groupedByYear[year]?.map(({ month, count })=> {
                    const monthName = months[month];
                    const postCount = count;
                    const historyUrl = `/history/${year}/${month}`;
                    const isSelected = 
                      pathname === historyUrl || 
                      (selectedYear === String(year) && selectedMonth === String(month));
                    
                    return (
                      <SummaryItem
                        key={`${year}-${month}`}
                        name={monthName || "Unknown Month"}
                        count={postCount}
                        link={historyUrl}
                        isSelected={isSelected}
                        title={`History / ${monthName}, ${year}`}
                      />
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
