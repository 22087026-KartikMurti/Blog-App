import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { getActivePosts } from "@/lib/db/posts";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const posts = await getActivePosts();

  // Filter posts based on search query (case-insensitive)
  const filteredPosts = posts.filter(post => {
    if (!q || q == "") return posts;
    
    const searchTermLower = q.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(searchTermLower);
    const contentMatch = post.content.toLowerCase().includes(searchTermLower);
    const descriptionMatch = post.description?.toLowerCase().includes(searchTermLower);
    const categoryMatch = post.category.toLowerCase().includes(searchTermLower);
    const tagsMatch = post.tags?.toLowerCase().includes(searchTermLower);
    
    return (titleMatch || contentMatch || descriptionMatch || categoryMatch || tagsMatch) && post.active;
  });

  return (
    <AppLayout query={q}>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}
