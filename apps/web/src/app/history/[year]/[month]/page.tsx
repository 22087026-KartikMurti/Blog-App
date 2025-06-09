import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { getActivePosts } from "@/lib/db/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ 
    year: string, 
    month: string 
  }>;
}) {
  
  const { year, month } = await params;
  // Fetch posts from the database
  const posts = await getActivePosts();
  if (!posts) {
    return (
      <AppLayout>
        No posts found.
      </AppLayout>
    );
  }
  
  // Convert string params to numbers for date comparison
  const targetYear = parseInt(year, 10);
  const targetMonth = parseInt(month, 10) - 1; // JavaScript months are 0-indexed
  if (isNaN(targetYear) || isNaN(targetMonth)) {
    return (
      <AppLayout>
        Invalid year or month.
      </AppLayout>
    );
  }
  
  // Filter posts by year and month
  const filteredPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getFullYear() === targetYear && 
           postDate.getMonth() === targetMonth && 
           post.active;
  });
  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}
