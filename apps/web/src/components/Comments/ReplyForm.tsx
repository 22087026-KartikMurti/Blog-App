// 'use client';

// import { useState } from 'react';

// interface ReplyFormProps {
//   commentId: number;
//   onReplyAdded: (reply: Reply) => void;
// }

// export default function ReplyForm({ commentId, onReplyAdded }: ReplyFormProps) {
//   const [replyText, setReplyText] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;

//     setIsSubmitting(true);
//     setError('');

//     try {
//       const response = await fetch('/api/replies', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ commentId, reply: replyText }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit reply');
//       }

//       const newReply = await response.json();
//       onReplyAdded(newReply);
//       setReplyText('');
//     } catch (err) {
//       setError('Failed to submit your reply. Please try again.');
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-3">
//       <div className="mb-2">
//         <textarea
//           value={replyText}
//           onChange={(e) => setReplyText(e.target.value)}
//           placeholder="Write a reply..."
//           className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//           rows={2}
//           required
//           disabled={isSubmitting}
//         />
//       </div>
//       {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50"
//       >
//         {isSubmitting ? 'Posting...' : 'Post Reply'}
//       </button>
//     </form>
//   );
// }