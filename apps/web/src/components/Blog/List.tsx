'use client';

import { useState } from 'react';
import type { Post } from "@repo/db/data";
import { BlogListItem } from "./ListItem";
import { Button } from "@repo/ui/button";

interface BlogListProps {
  posts: Post[];
  postsPerPage?: number;
}

export function BlogList({ posts, postsPerPage = 2 }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const activePosts = posts.filter(post => post.active);

  // Pagination calculations
  const totalPosts = activePosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = activePosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Previous and next page handlers
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (totalPosts === 0) {
    return (
      <div className="py-6 text-center">
        <h2 className="text-xl font-semibold">0 Posts</h2>
        <p className="mt-2 text-gray-600">No posts found in this category.</p>
      </div>
    );
  }

  return (
    <div className="py-6 ml-4 mr-4">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
        {totalPosts} Post{totalPosts !== 1 ? 's' : ''}
        {totalPages > 1 && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            (Page {currentPage} of {totalPages})
          </span>
        )}
      </h2>
      
      {/* Display current posts */}
      {currentPosts.map((post) => (
        <BlogListItem key={post.id} post={post} />
      ))}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pb-4">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </Button>
          
          <div className="hidden md:flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-9 h-9 rounded-md ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default BlogList;