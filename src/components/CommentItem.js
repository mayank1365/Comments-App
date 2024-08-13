import React, { useState } from 'react';
import useStore from '../store/useStore';

const CommentItem = ({ index, name, text, date, replies = [] }) => { // Provide default value for replies
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyEditMode, setReplyEditMode] = useState({});
  const [editedReplyText, setEditedReplyText] = useState({});

  const updateComment = useStore((state) => state.updateComment);
  const addReply = useStore((state) => state.addReply);
  const updateReply = useStore((state) => state.updateReply);
  const deleteComment = useStore((state) => state.deleteComment);
  const deleteReply = useStore((state) => state.deleteReply);

  const handleUpdateComment = () => {
    updateComment(index, editText);
    setEditMode(false);
  };

  const handleAddReply = () => {
    if (replyName && replyText) {
      addReply(index, replyName, replyText);
      setReplyName('');
      setReplyText('');
    }
  };

  const handleUpdateReply = (replyIndex) => {
    updateReply(index, replyIndex, editedReplyText[replyIndex]);
    setReplyEditMode({ ...replyEditMode, [replyIndex]: false });
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span>{name}</span>
        <span>{new Date(date).toLocaleString()}</span>
        <button onClick={() => deleteComment(index)}>Delete</button>
      </div>
      <div className="comment-body">
        {editMode ? (
          <>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button onClick={handleUpdateComment}>Update</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>{text}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
      <div className="reply-form">
        <input
          type="text"
          value={replyName}
          onChange={(e) => setReplyName(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Your reply"
          required
        />
        <button onClick={handleAddReply}>Add Reply</button>
      </div>
      {replies.map((reply, replyIndex) => (
        <div key={replyIndex} className="reply-item">
          <div className="reply-header">
            <span>{reply.name}</span>
            <span>{new Date(reply.date).toLocaleString()}</span>
            <button onClick={() => deleteReply(index, replyIndex)}>Delete Reply</button>
          </div>
          <div className="reply-body">
            {replyEditMode[replyIndex] ? (
              <>
                <textarea
                  value={editedReplyText[replyIndex] || reply.text}
                  onChange={(e) => setEditedReplyText({ ...editedReplyText, [replyIndex]: e.target.value })}
                />
                <button onClick={() => handleUpdateReply(replyIndex)}>Update Reply</button>
                <button onClick={() => setReplyEditMode({ ...replyEditMode, [replyIndex]: false })}>Cancel</button>
              </>
            ) : (
              <>
                <p>{reply.text}</p>
                <button onClick={() => setReplyEditMode({ ...replyEditMode, [replyIndex]: true })}>Edit Reply</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentItem;
