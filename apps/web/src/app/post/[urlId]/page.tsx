import { AppLayout } from "@/components/Layout/AppLayout";
import Image from "next/image";
import Link from "next/link";
import { getPostByUrlId, viewCount } from "@/lib/db/posts";
import sanitizeHtml from 'sanitize-html';
import { marked } from 'marked';
import { getCommentsAndReplies } from "../../../lib/db/comments";

import { LikeButton } from "@/components/Blog/LikeButton";
import CommentSection from "@/components/Comments/CommentSection";

export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;
  
  // Fetch posts from the database
  const post = await getPostByUrlId(urlId);
  const viewUpdate = await viewCount(urlId);
  const comments = await getCommentsAndReplies(post?.id || 0);

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
      <div className="max-w-3xl mx-auto w-full">
        <article className="flex flex-col p-4 rounded-lg mt-2 shadow-sm hover:shadow-md 
            transition-shadow border border-gray-200 dark:border-gray-700" data-test-id={`blog-post-${updatedPost.id}`}>
          <Link href={`/post/${updatedPost.urlId}`} className="text-3xl font-bold mb-4 block hover:underline">{updatedPost.title}</Link>
          {updatedPost.imageUrl && (
          <>
            <div className="flex items-center mb-4">
              <p className="mr-3 font-bold">{new Date(updatedPost.date).toLocaleDateString('en-AU', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric',
              })}</p>
              <p className="font-bold">{updatedPost.category}</p>
            </div>
              <div className="mb-6 flex justify-center">
                <Image 
                  src={updatedPost.imageUrl} 
                  alt={updatedPost.title}
                  width={400}
                  height={250}
                  className="rounded-md"
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
                  <div className="flex flex-wrap gap-2 mt-4">
                    {updatedPost.tags.split(',').map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-4 mt-4">
                  <span>{updatedPost.views} views</span>
                  <LikeButton postId={updatedPost.id} initialLikes={updatedPost.likes} />
                </div>
              </div>
            </>
          )}
        </article>
        <CommentSection postId={updatedPost.id} initialComments={comments} />
        {/* Uncomment the line below to show a loading message while comments are being fetched */}
        {/* <p className="text-gray-600 dark:text-gray-300">Loading comments...</p> */}
      </div>
    </AppLayout>
  );
}
