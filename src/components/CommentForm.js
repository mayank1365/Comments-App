import React, { useState } from 'react';
import useStore from '../store/useStore';

const CommentForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const addComment = useStore((state) => state.addComment);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      addComment(name, text);
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your comment"
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
