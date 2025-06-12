import { NextRequest, NextResponse } from "next/server";
import { client } from "@repo/db/client";

// POST handler for creating a new reply
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, reply } = body;

    if (!commentId || !reply) {
      return NextResponse.json(
        { error: "Comment ID and reply content are required" },
        { status: 400 }
      );
    }

    const repliesLength = await client.db.reply.count();
    const newReply = await client.db.reply.create({
      data: {
        replyId: repliesLength + 1,
        commentId: parseInt(commentId),
        reply,
      },
    });

    return NextResponse.json(newReply);
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
}