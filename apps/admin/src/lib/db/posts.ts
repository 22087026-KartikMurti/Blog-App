import { client } from "@repo/db/client";

export async function getPosts() {
  const posts = await client.db.post.findMany({
    include: {
      Likes: true, 
      Comments: true,
    },
  });

  return posts;
}

export async function getPostByUrlId(urlId: string) {
  const post = await client.db.post.findUnique({
    where: {
      urlId,
    },
    include: {
      Likes: true,
      Comments: true,
    },
  });

  return post;
}