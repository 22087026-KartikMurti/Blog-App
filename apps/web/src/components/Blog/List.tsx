import type { Post } from "@repo/db/data";
import { BlogListItem } from "./ListItem";

export function BlogList({ posts }: { posts: Post[] }) {
    const activePosts = posts.filter(post => post.active);

  if (activePosts.length === 0) {
    return (
      <div className="py-6 text-center">
        <h2 className="text-xl font-semibold">0 Posts</h2>
        <p className="mt-2 text-gray-600">No posts found in this category.</p>
      </div>
    );
  }

  return (
    <div className="py-6 ml-4 mr-4">
      <h2 className="text-xl font-semibold mb-4">{activePosts.length} Post{activePosts.length !== 1 ? 's' : ''}</h2>
      {activePosts.map((post) => (
        <BlogListItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default BlogList;
