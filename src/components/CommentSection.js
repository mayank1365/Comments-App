import React, { useState } from 'react';
import ReplyItem from './ReplyItem';

const CommentsSection = () => {
    const [comments, setComments] = useState([]);

    const updateReply = (commentId, replyId, updatedText) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                          ...comment,
                          replies: comment.replies.map((reply) =>
                              reply.id === replyId
                                  ? { ...reply, text: updatedText }
                                  : reply
                          ),
                      }
                    : comment
            )
        );
    };

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                        <span className="comment-name">{comment.name}</span>
                        <span className="comment-date">{comment.date}</span>
                    </div>
                    {comment.replies.map((reply) => (
                        <ReplyItem
                            key={reply.id}
                            reply={reply}
                            updateReply={updateReply} 
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CommentsSection;
