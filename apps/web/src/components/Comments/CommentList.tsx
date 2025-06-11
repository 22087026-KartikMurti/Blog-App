'use client';

import ReplyForm from './ReplyForm';
import { useState, useEffect } from 'react';

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

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    const [currentComments, setCurrentComments] = useState<Comment[]>(comments);

    useEffect(() => {
        setCurrentComments(comments);
    }, [comments]);

    const handleReplyAdded = (reply: Reply, commentId: number) => {
        // Update the comments state to include the new reply
        setCurrentComments(prevComments => 
            prevComments.map(comment => 
                comment.commentId === commentId 
                    ? { 
                        ...comment, 
                        Replies: [...(comment.Replies || []), reply] 
                    } : comment
            )
        );
    };
    return (
        <>
            {currentComments.length > 0 ? (
                <div className="space-y-4">
                    {currentComments.map((comment) => (
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
                            <ReplyForm
                                commentId={comment.commentId}
                                onReplyAdded={(reply) => handleReplyAdded(reply, comment.commentId)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 dark:text-gray-300">No comments yet. Be the first to comment!</p>
                </div>
            )}
        </>
    );
}