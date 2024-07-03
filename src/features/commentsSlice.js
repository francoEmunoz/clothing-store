import { createSlice } from '@reduxjs/toolkit';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
  },
  reducers: {
    setComments(state, action) {
      state.items = action.payload;
    },
    addComment(state, action) {
        const newComment = action.payload;
        state.items.unshift(newComment);
      },
    updateComment(state, action) {
      const updatedComment = action.payload;
      const index = state.items.findIndex((c) => c.ID === updatedComment.ID);
      if (index !== -1) {
        state.items[index] = updatedComment;
      }
    },
    deleteComment(state, action) {
      const deletedCommentId = action.payload;
      state.items = state.items.filter((p) => p.ID !== deletedCommentId);
    },
  },
});

export const { setComments, addComment, updateComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;