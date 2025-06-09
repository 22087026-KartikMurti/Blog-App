import { client } from "@repo/db/client";
import { NextResponse, NextRequest } from "next/server";
import { toUrlPath } from "@repo/utils/url";

//Creates a new post in the database
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const posts = await client.db.post.findMany();

        const newPost = await client.db.post.create({
            data: {
                id: posts.length + 1,
                title: data.title,
                content: data.content,
                tags: data.tags,
                description: data.description,
                imageUrl: data.imageUrl,
                urlId: toUrlPath(data.title),
                category: "Node", // Default category because form doesn't have category input
                active: true, // Default active status
                date: new Date(),
            },
        });

        return NextResponse.json({ success: true, post: newPost }, { status: 201 });
    } catch (error) {
        console.error("Error updating post active status:", error);
        return NextResponse.json(
            { message: "Error creating post" },
            { status: 500 }
        );
    }
}
