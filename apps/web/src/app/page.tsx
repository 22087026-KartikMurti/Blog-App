import { getActivePosts } from "@/lib/db/posts";
import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";

export default async function Home() {
  const posts = await getActivePosts();
  if (!posts) {
    return (
      <AppLayout>
        No posts found.
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Main posts={posts} />
    </AppLayout>
  );
}
