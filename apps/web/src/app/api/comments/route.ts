import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../../../../packages/db/src/client";

// POST handler for creating a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, comment } = body;

    if (!postId || !comment) {
      return NextResponse.json(
        { error: "Post ID and comment content are required" },
        { status: 400 }
      );
    }

    const newComment = await client.db.comment.create({
      data: {
        postId: parseInt(postId),
        comment,
      },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}