import { client } from '@repo/db/client';

export async function getCommentsAndReplies(postId: number) {
    try {
        const comments = await client.db.comment.findMany({
            include: {
            Replies: {
                orderBy: {
                    replyId: 'asc',
                },
            },
            },
            where: {
                postId,
            },
            orderBy: {
                commentId: "desc",
            },
        });

        return comments;
    } catch (error) {
        console.error("Error fetching comments and replies:", error);
        throw new Error("Failed to fetch comments and replies");
    }
}