import { client } from "@repo/db/client";
import { NextResponse, NextRequest } from "next/server";
import { toUrlPath } from "@repo/utils/url";
import { isLoggedIn } from "../../../../utils/auth";

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

//Updates just the active status of a post in the database
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const auth = await checkAuth();
  if(auth !== true) {
    return auth;
  } else {
    console.log("User is authenticated");
  }

  try {
    let active = false;

    try {
      const body = await request.json();
      active = body.active;
    } catch (error) {
      console.error("Error parsing request body:", error);
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }
    const { postId } = await params;
    const pId = parseInt(postId);
        
    if (isNaN(pId)) {
      return NextResponse.json(
        { message: "Invalid post ID" },
        { status: 400 }
      );
    }

    // Update post in database
    const updatedPost = await client.db.post.update({
      where: { id: pId },
      data: { active },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post active status:", error);
    return NextResponse.json(
      { message: "Error updating post" },
      { status: 500 }
    );
  }
}

//Updates a post in the database with new data
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const auth = await checkAuth();
  if(auth !== true) {
    return auth;
  } else {
    console.log("User is authenticated");
  }

  try {
    const data = await request.json();
    const { postId } = await params;
    const pId = parseInt(postId);

    if (isNaN(pId)) {
      return NextResponse.json(
        { message: "Invalid post ID" },
        { status: 400 }
      );
    }

    // Update post in database
    const updatedPost = await client.db.post.update({
      where: { id: pId },
      data: { 
        title: data.title,
        category: data.category,
        content: data.content, 
        tags: data.tags,
        description: data.description,
        imageUrl: data.imageUrl,
        urlId: toUrlPath(data.title),
        date: new Date(),
      },
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Error updating post" },
      { status: 500 }
    );
  }
}