import React, { useState } from 'react';
import useStore from '../store/useStore';
import './CommentItem.css';

const CommentItem = ({ index, name, text, date, replies = [] }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyEditMode, setReplyEditMode] = useState({});
  const [editedReplyText, setEditedReplyText] = useState({});
  const [showReplyForm, setShowReplyForm] = useState(false);

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
      setShowReplyForm(false);
    }
  };

  const handleUpdateReply = (replyIndex) => {
    updateReply(index, replyIndex, editedReplyText[replyIndex]);
    setReplyEditMode({ ...replyEditMode, [replyIndex]: false });
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-name">{name}</span>
        <span className="comment-date">{new Date(date).toLocaleString()}</span>
        <button className="delete-button" onClick={() => deleteComment(index)}>Delete</button>
      </div>
      <div className="comment-body">
        {editMode ? (
          <>
            <textarea
              className="edit-textarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button className="update-button" onClick={handleUpdateComment}>Update</button>
            <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>{text}</p>
            <button className="edit-button" onClick={() => setEditMode(true)}>Edit</button>
            <button className="reply-button" onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
          </>
        )}
      </div>
      {showReplyForm && (
        <div className="reply-form">
          <input
            type="text"
            className="reply-name-input"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            placeholder="Your name"
            required
          />
          <textarea
            className="reply-textarea"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Your reply"
            required
          />
          <button className="add-reply-button" onClick={handleAddReply}>Add Reply</button>
        </div>
      )}
      <div className="replies-list">
        {replies.map((reply, replyIndex) => (
          <div key={replyIndex} className="reply-item">
            <div className="reply-header">
              <span className="reply-name">{reply.name}</span>
              <span className="reply-date">{new Date(reply.date).toLocaleString()}</span>
              <button className="delete-reply-button" onClick={() => deleteReply(index, replyIndex)}>Delete Reply</button>
            </div>
            <div className="reply-body">
              {replyEditMode[replyIndex] ? (
                <>
                  <textarea
                    className="edit-reply-textarea"
                    value={editedReplyText[replyIndex] || reply.text}
                    onChange={(e) => setEditedReplyText({ ...editedReplyText, [replyIndex]: e.target.value })}
                  />
                  <button className="update-reply-button" onClick={() => handleUpdateReply(replyIndex)}>Update Reply</button>
                  <button className="cancel-reply-button" onClick={() => setReplyEditMode({ ...replyEditMode, [replyIndex]: false })}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{reply.text}</p>
                  <button className="edit-reply-button" onClick={() => setReplyEditMode({ ...replyEditMode, [replyIndex]: true })}>Edit Reply</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentItem;
