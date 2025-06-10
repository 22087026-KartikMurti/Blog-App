import { client } from "@repo/db/client";
import { NextResponse, NextRequest } from "next/server";
import { toUrlPath } from "@repo/utils/url";
import { isLoggedIn } from "../../../utils/auth";

async function checkAuth() {
    const isAuthenticated = await isLoggedIn();
    if (!isAuthenticated) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    } else {
        return true;
    }
}

//Creates a new post in the database
export async function POST(request: NextRequest) {
    try {
        const auth = await checkAuth();
        if(auth !== true) {
            return auth;
        } else {
            console.log("User is authenticated");
        }

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
                category: data.category,
                active: true, // True on default
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
