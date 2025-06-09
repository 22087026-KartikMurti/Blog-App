import { AppLayout } from "@/components/Layout/AppLayout";
import Image from "next/image";
import Link from "next/link";
import { getPostByUrlId, viewCount } from "@/lib/db/posts";
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';


import { LikeButton } from "@/components/Blog/LikeButton";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;
  
  // Fetch posts from the database
  const post = await getPostByUrlId(urlId);
   const viewUpdate = await viewCount(urlId);

  if (!post) {
    return (
      <AppLayout>
        No post found with the URL ID: {urlId}
      </AppLayout>
    );
  }

  if (!viewUpdate) {
    return (
      <AppLayout>
        Could not update view of post with URL ID: {urlId}
      </AppLayout>
    );
  }

  const updatedPost = {
    ...post,
    views: viewUpdate,
    likes: post.Likes.length,
  };

  return (
    <AppLayout>
      <article className="max-w-4xl mx-auto py-8 px-4" data-test-id={`blog-post-${updatedPost.id}`}>
        <Link href={`/post/${updatedPost.urlId}`} className="text-3xl font-bold mb-4 block hover:underline">{updatedPost.title}</Link>
        {updatedPost.imageUrl && (
        <>
          <div>
            <p>{new Date(updatedPost.date).toLocaleDateString('en-AU', { 
              day: 'numeric', 
              month: 'short', 
              year: 'numeric',
            })}
            </p>
            <p>{updatedPost.category}</p>
          </div>
            <div className="mb-6">
              <Image 
                src={updatedPost.imageUrl} 
                alt={updatedPost.title}
                width={400}
                height={250}
              />
            </div>
            <div>
              <div data-test-id="content-markdown" dangerouslySetInnerHTML={{
                __html: sanitizeHtml(marked(updatedPost.content) as string, {
                  allowedTags: [
                    'br', 'strong', 'em', 'p', 'a', 'i',
                    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'ul', 'ol', 'li',
                  ],
                  allowedAttributes: {},
              })}} />
              {updatedPost.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {updatedPost.tags.split(',').map((tag, index) => (
                    <span key={index} className="px-3 py-1">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
              <div>
                <span>{updatedPost.views} views</span>
                <LikeButton postId={updatedPost.id} initialLikes={updatedPost.likes} />
              </div>
            </div>
          </>
        )}
      
      </article>
    </AppLayout>
  );
}
