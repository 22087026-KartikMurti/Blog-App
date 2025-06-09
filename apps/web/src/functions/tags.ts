type TagItem = {
  name: string;
  count: number;
};

export function tags(posts: { tags: string; active: boolean }[]) {
  // TODO: Implement per specification
  const activePosts = posts.filter(post => post.active);
  
  // Create a map to count occurrences of each tag
  const tagMap = new Map<string, number>();
  
  // Process each post
  activePosts.forEach(post => {
    // Skip posts without tags
    if (!post.tags) return;
    
    // Split the tags string by commas, trim whitespace
    const postTags = post.tags.split(',').map(tag => tag.trim());
    
    // Count each tag
    postTags.forEach(tag => {
      if (tag) {
        const currentCount = tagMap.get(tag) || 0;
        tagMap.set(tag, currentCount + 1);
      }
    });
  });
  
  // Convert the map to an array of objects with name and count properties
  const tagItems: TagItem[] = Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  
  return tagItems;
}
