import { NextResponse, NextRequest } from "next/server";
import { client } from "@repo/db/client";
import { headers } from "next/headers";

export async function GET(
    request: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
      const headersList = await headers();
      const ip = headersList.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') ||
              '127.0.0.1';

      if (!ip) {
        return NextResponse.json({ error: "IP address not found" }, { status: 400 });
      }

      const postId = parseInt(params.postId);
      
      if (isNaN(postId)) {
        return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
      }
      
      // Check if this IP has liked this post
      const existingLike = await client.db.like.findFirst({
        where: {
            postId,
            userIP: ip.toString(),
        },
      });

      return NextResponse.json({ 
          isLiked: !!existingLike
      });
    } catch (error) {
      console.error("Error fetching liked or not: ", error);
      return NextResponse.json(
          { error: "Failed to fetch liked or not" },
          { status: 500 }
      );
    }
  }
export async function POST(
    request: NextRequest,
    { params }: { params: { postId: string} }
  ) {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            '127.0.0.1';

    if (!ip) {
        return NextResponse.json({ error: "IP address not found" }, { status: 400 });
    }
    
    try {
        const postId = parseInt(params.postId);
        if (isNaN(postId)) {
          return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
        }
        
        //Check if the request is coming from the intended origin
        const origin = headersList.get('origin');
        const host = headersList.get('host');
        const isValidOrigin = !origin || origin === `http://${host}`;
        if(!isValidOrigin) {
          return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
        }
                
        // Check if this IP has liked this post
        const existingLike = await client.db.like.findFirst({
          where: {
              postId,
              userIP: ip.toString(),
          },
        });
    
        if(existingLike) {
          return NextResponse.json({
              error: "Already liked",
              status: 409,
          });
        }
        try {
          await client.db.like.create({
              data: {
                  postId,
                  userIP: ip.toString(),
              },
          });
        } catch (error) {
          console.error("Error creating like relation in db: ", error);
          return NextResponse.json(
              { error: "Failed to create like relation in db" },
              { status: 500 }
          );
        }

        const likeCount = await client.db.like.count({
          where: {
            postId,
          },
        });
        return NextResponse.json({ likes: likeCount }, { status: 200 });

    } catch (error) {
      console.error("Error liking post: ", error);
      return NextResponse.json(
        { error: "Failed to like post" },
        { status: 500 }
      );
    }
}

export async function DELETE(
    request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
        // Get client IP address for tracking likes
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            '127.0.0.1';

    if (!ip) {
      return NextResponse.json({ error: "IP address not found" }, { status: 400 });
    }

    const postId = parseInt(params.postId);
    
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    
    // Check if this IP has liked this post
    const existingLike = await client.db.like.findFirst({
      where: {
        postId,
        userIP: ip.toString(),
      },
    });

    if(!existingLike) {
      return NextResponse.json({
        error: "Not liked yet",
        status: 409,
      });
    }

    try {
        await client.db.like.delete({
          where: {
            postId_userIP: {
              postId: existingLike.postId,
              userIP: ip.toString(),
            }
          }
        });
    } catch (error) {
      console.error("Error deleting like relation in db: ", error);
      return NextResponse.json(
        { error: "Failed to delete like relation in db" },
        { status: 500 }
      );
    }

    const likeCount = await client.db.like.count({
      where: {
        postId,
      },
    });

    return NextResponse.json({ likes: likeCount }, { status: 200 });

  } catch (error) {
    console.error("Error unliking post: ", error);
    return NextResponse.json(
      { error: "Failed to unliking post" },
      { status: 500 }
    );
  }
}