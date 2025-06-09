"use client";

import { useState, useEffect } from 'react';
import { Button } from '@repo/ui/button';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the user has already liked this post
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(`/api/likes/${postId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Response from like status check:", response);
        if (response.ok) {
          const data = await response.json();
          setIsLiked(data.isLiked);
        } else {
            const error = await response.json();
            console.error("Error fetching like status:", error.error);
            return;
        }
      } catch (error) {
        console.error("Failed to check like status:", error);
      }
    };

    checkLikeStatus();
  }, [postId]);

  const handleLikeToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const method = isLiked ? 'DELETE' : 'POST';
      const url = `/api/likes/${postId}'}`;
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setIsLiked(!isLiked);
      } else {
        const error = await response.json();
        console.error("Error toggling like:", error.message);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // SVG heart icons for liked and not liked states
  const EmptyHeart = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
      />
    </svg>
  );

  const FilledHeart = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-6 w-6" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  return (
    <div className="flex items-center">
      <Button
        data-test-id="like-button"
        onClick={handleLikeToggle}
        disabled={isLoading}
        className={`inline-flex items-center justify-center p-2 rounded-full transition-colors ${
          isLiked 
            ? 'text-red-500 hover:bg-red-100' 
            : 'text-gray-400 hover:bg-gray-100'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        {isLiked ? <FilledHeart /> : <EmptyHeart />}
      </Button>
      <span data-test-id="like-count" className="ml-1 text-sm">
        {likes} {likes === 1 ? 'like' : 'likes'}
      </span>
    </div>
  );
}