// 'use client';

// import { useState, useEffect } from 'react';
// import CommentForm from './CommentForm';
// import CommentList from './CommentList';
// import { client } from "@repo/db/client";

// interface CommentSectionProps {
//   postId: number;
// }

// export default function CommentSection({ postId }: CommentSectionProps) {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await fetch(`/api/comments?postId=${postId}`);
//         if (!response.ok) throw new Error('Failed to fetch comments');
//         const data = await response.json();
//         setComments(data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchComments();
//   }, [postId]);

//   const addComment = (newComment: Comment) => {
//     setComments((prev) => [newComment, ...prev]);
//   };

//   return (
//     <div className="mt-10 border-t pt-6">
//       <h3 className="text-xl font-bold mb-4">Comments</h3>
//       <CommentForm postId={postId} onCommentAdded={addComment} />
      
//       {isLoading ? (
//         <p className="text-center py-4">Loading comments...</p>
//       ) : (
//         <CommentList comments={comments} />
//       )}
//     </div>
//   );
// }