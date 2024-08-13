import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import CommentItem from './CommentItem';

const CommentList = () => {
  const comments = useStore((state) => state.comments);
  const sortComments = useStore((state) => state.sortComments);

  useEffect(() => {
    sortComments();
  }, [comments, sortComments]);

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
