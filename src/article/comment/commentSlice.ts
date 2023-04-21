import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Comment } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';

export interface CommentState {
  comments: Comment[];
  status: ApiStatus;
}

const initialState: CommentState = {
  comments: [],
  status: 'idle'
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getCommentsBegin: (state, action) => {
      state.comments = [];
      state.status = 'loading';
    },
    getCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.status = 'success';
    },
    getCommentsFailed: (state) => {
      state.comments = [];
      state.status = 'error';
    },

    createCommentBegin: (state, action) => {
      state.status = 'loading';
    },
    createCommentSuccess: (state, action: PayloadAction<Comment>) => {
      state.comments = [...state.comments, action.payload];
      state.status = 'success';
    },
    createCommentFailed: (state) => {
      state.status = 'error';
    },

    deleteCommentBegin: (state, action) => {
      state.status = 'loading';
    },
    deleteCommentSuccess: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      state.status = 'success';
    },
    deleteCommentFailed: (state) => {
      state.status = 'error';
    }
  }
});

export const commentActions = commentSlice.actions;

export const selectCommentsBySlug = (state: RootState) => state.comment.comments;
export const selectCommentsStatus = (state: RootState) => state.comment.status;

const commentReducer = commentSlice.reducer;
export default commentReducer;
