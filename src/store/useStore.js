import create from 'zustand';

const useStore = create((set) => ({
  comments: [],
  addComment: (name, text) => set((state) => ({
    comments: [
      ...state.comments,
      { name, text, date: new Date(), replies: [] },
    ],
  })),
  updateComment: (index, newText) => set((state) => {
    const comments = [...state.comments];
    comments[index].text = newText;
    return { comments };
  }),
  addReply: (commentIndex, name, text) => set((state) => {
    const comments = [...state.comments];
    if (!comments[commentIndex].replies) {
      comments[commentIndex].replies = []; // Initialize replies array if undefined
    }
    comments[commentIndex].replies.push({ name, text, date: new Date() });
    return { comments };
  }),
  updateReply: (commentIndex, replyIndex, newText) => set((state) => {
    const comments = [...state.comments];
    if (comments[commentIndex].replies) {
      comments[commentIndex].replies[replyIndex].text = newText;
    }
    return { comments };
  }),
  deleteComment: (index) => set((state) => ({
    comments: state.comments.filter((_, i) => i !== index),
  })),
  deleteReply: (commentIndex, replyIndex) => set((state) => {
    const comments = [...state.comments];
    if (comments[commentIndex].replies) {
      comments[commentIndex].replies.splice(replyIndex, 1);
    }
    return { comments };
  }),
  sortComments: () => set((state) => {
    const comments = [...state.comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    return { comments };
  }),
}));

export default useStore;
