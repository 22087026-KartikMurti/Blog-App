'use client';

import { useState } from 'react';
// import CommentForm from './CommentForm';
// import CommentList from './CommentList';

interface Reply {
    replyId: number;
    commentId: number;
    reply: string;
}

interface Comment {
    commentId: number;
    postId: number;
    comment: string;
    Replies?: Reply[];
}

interface CommentSectionProps {
    postId: number;
    initialComments?: Comment[];
}

export default function CommentSection({ initialComments, postId }: CommentSectionProps) {
    if (!initialComments) {
        return <p className="text-center py-4">No comments yet.</p>;
    }
    const [comments, setComments] = useState(initialComments);

    const addComment = (newComment: Comment) => {
        setComments((prev) => [newComment, ...prev]);
    };

    return (
        <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Comments</h3>
            {/* <CommentForm postId={postId} onCommentAdded={addComment} /> */}

            {/* {isLoading ? (
                <p className="text-center py-4">Loading comments...</p>
                ) : (
                <CommentList comments={comments} />
                )} */}
            {comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.commentId} className="p-4 border rounded bg-white dark:bg-gray-900 shadow-sm">
                            <p className="mb-2">{comment.comment}</p>
                            
                            {comment.Replies && comment.Replies.length > 0 && (
                                <div className="mt-3 ml-4 pl-4 border-l-2 border-gray-300 dark:border-gray-700 space-y-2">
                                    <p className="text-sm text-gray-500 mb-1">Replies:</p>
                                    {comment.Replies.map((reply) => (
                                        <div key={reply.replyId} className="text-sm">
                                            <p>{reply.reply}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 dark:text-gray-300">No comments yet. Be the first to comment!</p>
                </div>
            )}
        </div> 
    );
}