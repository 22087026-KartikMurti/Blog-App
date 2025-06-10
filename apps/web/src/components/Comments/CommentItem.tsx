// 'use client';

// import { useState, useEffect } from 'react';
// import ReplyForm from './ReplyForm';
// import ReplyList from './ReplyList';

// interface CommentItemProps {
//   comment: Comment;
// }

// export default function CommentItem({ comment }: CommentItemProps) {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replies, setReplies] = useState<Reply[]>([]);
//   const [isLoadingReplies, setIsLoadingReplies] = useState(false);

//   useEffect(() => {
//     const fetchReplies = async () => {
//       setIsLoadingReplies(true);
//       try {
//         const response = await fetch(`/api/replies?commentId=${comment.commentId}`);
//         if (!response.ok) throw new Error('Failed to fetch replies');
//         const data = await response.json();
//         setReplies(data);
//       } catch (error) {
//         console.error('Error fetching replies:', error);
//       } finally {
//         setIsLoadingReplies(false);
//       }
//     };

//     fetchReplies();
//   }, [comment.commentId]);

//   const handleReplyAdded = (newReply: Reply) => {
//     setReplies((prev) => [...prev, newReply]);
//     setShowReplyForm(false);
//   };

//   return (
//     <div className="p-4 border rounded mb-4">
//       <p className="mb-2">{comment.comment}</p>
      
//       <div className="mt-2 flex justify-between items-center">
//         <button 
//           onClick={() => setShowReplyForm(!showReplyForm)}
//           className="text-blue-500 text-sm hover:underline"
//         >
//           {showReplyForm ? 'Cancel Reply' : 'Reply'}
//         </button>
//         <span className="text-xs text-gray-500">
//           {new Date(comment.createdAt).toLocaleDateString()}
//         </span>
//       </div>
      
//       {showReplyForm && (
//         <ReplyForm 
//           commentId={comment.commentId} 
//           onReplyAdded={handleReplyAdded}
//         />
//       )}

//       {isLoadingReplies ? (
//         <p className="text-sm text-gray-500 mt-2">Loading replies...</p>
//       ) : (
//         replies.length > 0 && <ReplyList replies={replies} />
//       )}
//     </div>
//   );
// }