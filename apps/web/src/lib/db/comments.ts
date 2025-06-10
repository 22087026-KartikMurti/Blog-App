// import { client } from '@repo/db/client';

// export async function getActivePosts(postId: number) {
//     const postsNoLikeCount = await client.db.comment.findMany({
//         include: {
//           Replies: true,
//         },
//         where: {
//             postId,
//         },
//         orderBy: {
//             commentId: "asc",
//         },
//     });

//     const posts = postsNoLikeCount.map((post) => ({
//         ...post,
//         likes: post.Likes.length,
//     }));

//     return posts;
// }