import React, { useEffect } from 'react';
import useStore from '../store/useStore';
import CommentItem from './CommentItem';

const CommentList = () => {
  const { comments, sortComments } = useStore((state) => ({
    comments: state.comments,
    sortComments: state.sortComments,
  }));

  useEffect(() => {
    sortComments();
  }, [sortComments]);

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentItem
            key={index}
            index={index}
            name={comment.name}
            text={comment.text}
            date={comment.date}
            replies={comment.replies}
          />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default CommentList;
