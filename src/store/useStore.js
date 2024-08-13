import create from 'zustand';

const useStore = create((set) => ({
  comments: JSON.parse(localStorage.getItem('comments')) || [],
  addComment: (name, text) => set((state) => {
    const newComments = [...state.comments, { name, text, date: new Date() }];
    localStorage.setItem('comments', JSON.stringify(newComments));
    return { comments: newComments };
  }),
  updateComment: (index, text) => set((state) => {
    const updatedComments = [...state.comments];
    updatedComments[index].text = text;
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  deleteComment: (index) => set((state) => {
    const updatedComments = state.comments.filter((_, i) => i !== index);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    return { comments: updatedComments };
  }),
  sortComments: () => set((state) => {
    const sortedComments = [...state.comments].sort((a, b) => b.date - a.date);
    return { comments: sortedComments };
  })
}));

export default useStore;
