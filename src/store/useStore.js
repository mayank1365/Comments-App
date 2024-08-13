import create from 'zustand';

const useStore = create((set) => ({
  comments: JSON.parse(localStorage.getItem('comments')) || [],

  addComment: (name, text) => set((state) => {
    const newComment = {
      name,
      text,
      date: new Date(),
      replies: []
    };
    const updatedComments = [...state.comments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  updateComment: (index, text) => set((state) => {
    const updatedComments = state.comments.map((comment, i) =>
      i === index ? { ...comment, text } : comment
    );
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  deleteComment: (index) => set((state) => {
    const updatedComments = state.comments.filter((_, i) => i !== index);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  addReply: (commentIndex, name, text) => set((state) => {
    const updatedComments = state.comments.map((comment, i) =>
      i === commentIndex
        ? {
            ...comment,
            replies: [...comment.replies, { name, text, date: new Date() }]
          }
        : comment
    );
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  updateReply: (commentIndex, replyIndex, text) => set((state) => {
    const updatedComments = state.comments.map((comment, i) =>
      i === commentIndex
        ? {
            ...comment,
            replies: comment.replies.map((reply, j) =>
              j === replyIndex ? { ...reply, text } : reply
            )
          }
        : comment
    );
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  deleteReply: (commentIndex, replyIndex) => set((state) => {
    const updatedComments = state.comments.map((comment, i) =>
      i === commentIndex
        ? {
            ...comment,
            replies: comment.replies.filter((_, j) => j !== replyIndex)
          }
        : comment
    );
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  })
}));

export default useStore;
