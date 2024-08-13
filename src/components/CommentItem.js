import React, { useState } from 'react';
import useStore from '../store/useStore';

const CommentItem = ({ index, name, text, date }) => {
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);
  const updateComment = useStore((state) => state.updateComment);
  const deleteComment = useStore((state) => state.deleteComment);

  const handleUpdate = () => {
    updateComment(index, editText);
    setEditMode(false);
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
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>{text}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
