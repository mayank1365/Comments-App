import create from 'zustand';

const useStore = create((set) => ({
  comments: JSON.parse(localStorage.getItem('comments')) || [],
  
  addComment: (name, text) => set((state) => {
    const newComment = {
        name,
        text,
        date: new Date().toISOString(),
        replies: [],
    };
    const updatedComments = [newComment, ...state.comments];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),

  addReply: (commentIndex, name, text) => set((state) => {
    const updatedComments = [...state.comments];
    const reply = {
      name,
      text,
      date: new Date().toISOString(),
    };
    updatedComments[commentIndex].replies.push(reply);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  
  updateComment: (index, newText) => set((state) => {
    const updatedComments = [...state.comments];
    updatedComments[index].text = newText;
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  
  updateReply: (commentIndex, replyIndex, newText) => set((state) => {
    const updatedComments = [...state.comments];
    updatedComments[commentIndex].replies[replyIndex].text = newText;
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  
  deleteComment: (index) => set((state) => {
    const updatedComments = state.comments.filter((_, i) => i !== index);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  
  deleteReply: (commentIndex, replyIndex) => set((state) => {
    const updatedComments = [...state.comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  
}));

export default useStore;
