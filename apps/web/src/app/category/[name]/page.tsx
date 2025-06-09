import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { getActivePosts } from "@/lib/db/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
    const posts = await getActivePosts();
    if (!posts) {
      return (
        <AppLayout>
          No posts found.
        </AppLayout>
      );
    }

  const filteredPosts = posts.filter((post) => 
    post.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <AppLayout>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}
