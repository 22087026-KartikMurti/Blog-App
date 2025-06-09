import { client } from "@repo/db/client";

export async function getActivePosts() {
    const postsNoLikeCount = await client.db.post.findMany({
        include: {
            Likes: true,
        },
        where: {
            active: true,
        },
        orderBy: {
            date: "desc",
        },
    });

    const posts = postsNoLikeCount.map((post) => ({
        ...post,
        likes: post.Likes.length,
    }));

    return posts;
}

export async function getPostByUrlId(urlId: string) {
    const post = await client.db.post.findFirst({
        where: {
            urlId: urlId,
            active: true,
        },
        include: {
            Likes: true,
        },
    });

    if (!post) {
        return null;
    }

    return post;
}

export async function viewCount(urlId: string) {
    const post = await getPostByUrlId(urlId);
    if (!post) {
        return null;
    }

    const viewUpdate = await client.db.post.update({
        where: {
            id: post.id,
        },
        data: {
            views: post.views + 1,
        },
    });

    return viewUpdate.views;
}