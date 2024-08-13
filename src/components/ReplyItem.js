import React from 'react';

const ReplyItem = ({ reply, updateReply }) => {
    const handleUpdateReply = () => {
        const updatedText = prompt('Enter new reply text:', reply.text);
        if (updatedText !== null) {
            updateReply(reply.commentId, reply.id, updatedText); 
        }
    };

    return (
        <div className="reply-item">
            <div className="reply-header">
                <span className="reply-name">{reply.name}</span>
                <button onClick={handleUpdateReply} className="edit-reply-button">
                    Edit
                </button>
            </div>
            <div>{reply.text}</div>
        </div>
    );
};

export default ReplyItem;
