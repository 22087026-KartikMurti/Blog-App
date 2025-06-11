'use client';

import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

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
            <CommentForm postId={postId} onCommentAdded={addComment} />
            <CommentList comments={comments} />
        </div> 
    );
}