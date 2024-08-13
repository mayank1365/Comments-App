import create from 'zustand';

const useStore = create((set) => ({
  comments: [],
  addComment: (name, text) => set((state) => ({
    comments: [...state.comments, { name, text, date: new Date() }]
  })),
  updateComment: (index, text) => set((state) => {
    const updatedComments = [...state.comments];
    updatedComments[index].text = text;
    return { comments: updatedComments };
  }),
  deleteComment: (index) => set((state) => ({
    comments: state.comments.filter((_, i) => i !== index)
  })),
  sortComments: () => set((state) => ({
    comments: [...state.comments].sort((a, b) => b.date - a.date)
  }))
}));

export default useStore;
