import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { getActivePosts } from "@/lib/db/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getActivePosts();
  if (!posts) {
    return (
      <AppLayout>
        No posts found with the tag: {tag}
      </AppLayout>
    );
  }
  
  // Filter posts by tag (case-insensitive)
  const filteredPosts = posts.filter(post => {
    // Skip posts without tags or inactive posts
    if (!post.active || !post.tags) return false;
    
    // Split tags string into an array, trim whitespace, and convert to lowercase
    const postTags = post.tags
      .split(',')
      .map(t => t.trim().toLowerCase().replace(' ', '-'));
    
    // Check if the current tag is in the post's tags
    return postTags.includes(tag.toLowerCase());
  });

  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}