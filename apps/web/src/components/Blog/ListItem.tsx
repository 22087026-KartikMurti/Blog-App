import type { Post } from "@repo/db/data";
import Link from "next/link";
import Image from "next/image";

export function BlogListItem({ post }: { post: Post }) {
  return (
    <>
      <article
        key={post.id}
        className="
          flex flex-col p-4 rounded-lg shadow-sm hover:shadow-md 
          transition-shadow border border-gray-200 dark:border-gray-700
        "
        data-test-id={`blog-post-${post.id}`}
      >
        {post.imageUrl && (
        <div className="mb-4 w-full overflow-hidden rounded-md">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            width={200}
            height={500}
            className="w-200 h-120 object-cover"
          />
        </div>
        )}
        <h3 className="text-xl font-semibold mb-2">
          <Link 
            href={`/post/${post.urlId}`} 
            className="text-gray-700 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 hover:underline"
          >
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{post.description}</p>
        
        <div className="mt-auto flex flex-col space-y-3">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{new Date(post.date).toLocaleDateString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            })}</span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
          </div>
        
          {post.tags && (
            <div className="flex flex-wrap gap-2">
            {post.tags.split(',').map(tag => {
              const trimmedTag = tag.trim();
              return (
              <span 
                key={trimmedTag}
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                #{trimmedTag}
              </span>
              );
            })}
            </div>
          )}
        
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views} views
              </span>
            <span className="flex items-center ml-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes} likes
            </span>
          </div>
        </div>
      </article>
    </>
  );
}