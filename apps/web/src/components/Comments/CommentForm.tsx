'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/button';
import sanitize from 'sanitize-html';

interface CommentFormProps {
  postId: number;
  onCommentAdded: (comment: {
    commentId: number;
    postId: number;
    comment: string;
  }) => void;
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
        setError('Comment cannot be empty');
        return;
    }
    const sanitizedComment = sanitize(comment.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, comment: sanitizedComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment = await response.json();
      onCommentAdded(newComment);
      setComment('');
    } catch (err) {
      setError('Failed to submit your comment. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded focus:outline-none focus:ring-2"
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Post Comment'}
      </Button>
    </form>
  );
}