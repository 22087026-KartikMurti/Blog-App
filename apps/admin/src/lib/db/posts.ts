import { client } from "@repo/db/client";

export async function getPosts() {
  const posts = await client.db.post.findMany({
    include: {
      Likes: true, 
    },
  });

  return posts;
}