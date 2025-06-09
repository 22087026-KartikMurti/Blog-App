type HistoryItem = {
  month: number;
  year: number;
  count: number; 
};

export function history(posts: 
  { 
    date: Date | string; 
    active: boolean 
  }[]): HistoryItem[] {
  // Implement per specification
  // Return the ordered list of "month, year" strings sorted from most recent to oldes
  // consider only active posts
  if (posts.length === 0) {
    return [];
  }
  const activePosts = posts.filter(post => post.active);

  const historyMap: Record<string, Record<string, number>> = {};

  activePosts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!historyMap[year]) {
      historyMap[year] = {};
    }
    if (!historyMap[year][month]) {
      historyMap[year][month] = 1;
    } else {
      historyMap[year][month]++;
    }
    
  });

  const sortedHistoryMap: HistoryItem[] = [];

  const sortedYears = Object.keys(historyMap).map(Number)
    .sort((a, b) => b - a); // Sort years in descending order

  

  for (const year of sortedYears) {
    const monthMap = historyMap[year];

    if(!monthMap) {
      continue;
    }
    
    const sortedMonths = Object.keys(monthMap).map(Number)
      .sort((a, b) => b - a); // Sort months in descending order
    
    // Get the months for this year (we know it exists because we're iterating over keys)
    const yearData = historyMap[year];

    if(!yearData) {
      continue;
    }

    for (const month of sortedMonths) {
      // Get the count (we know it exists because we're iterating over keys)
      sortedHistoryMap.push({
        month: month,
        year: year,
        count: yearData[month] || 0,
      });
    }
  }

  return sortedHistoryMap;
}
