import { client } from "./client.ts";
import { posts, comments, replies } from "./data.ts";

export async function seed() {
  console.log("🌱 Seeding data");
  await client.db.like.deleteMany();
  await client.db.reply.deleteMany();
  await client.db.comment.deleteMany();
  await client.db.post.deleteMany();


  console.log("📝 Seeding posts...");
  for (const post of posts) {
    await client.db.post.create({
      data: {
        title: post.title, 
        content: post.content, 
        category: post.category, 
        description: post.description, 
        imageUrl: post.imageUrl, 
        tags: post.tags, 
        urlId: post.urlId,
        active: post.active, 
        date: post.date, 
        id: post.id, 
        views: post.views, 
      },
    });
    for (let i = 0; i < post.likes; i++) {
      await client.db.like.create({
        data: {
          postId: post.id,
          userIP: `192.168.100.${i}`,
        },
      });
    }
  }

  console.log("💬 Seeding comments...");
  for(const comment of comments) {
    await client.db.comment.create({
      data: {
        commentId: comment.commentId,
        postId: comment.postId,
        comment: comment.comment,
      },
    });
  }
  
  console.log("↩️ Seeding replies...");
  for(const reply of replies) {
    await client.db.reply.create({
      data: {
        replyId: reply.replyId,
        commentId: reply.commentId,
        reply: reply.reply,
      },
    });
  }

  console.log("✅ Seeding completed!");
}



