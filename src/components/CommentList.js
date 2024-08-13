import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import CommentItem from './CommentItem';

const CommentList = () => {
  const comments = useStore((state) => state.comments);
  const sortComments = useStore((state) => state.sortComments);

  // Sort comments only when the component mounts or comments change
  useEffect(() => {
    sortComments();
  }, [sortComments]); // Dependency array ensures sortComments is only called once when necessary

  return (
    <div>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          index={index}
          name={comment.name}
          text={comment.text}
          date={comment.date}
        />
      ))}
    </div>
  );
};

export default CommentList;
