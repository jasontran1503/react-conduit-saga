import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Article, GenericErrorModel } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';

export interface EditorState {
  article: Article | null;
  status: ApiStatus;
  errors: Record<string, string[]>;
}

const initialState: EditorState = {
  article: null,
  status: 'idle',
  errors: {}
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    getArticleBySlugBegin: (state, action: PayloadAction<string>) => {
      state.article = null;
      state.status = 'loading';
    },
    getArticleBySlugSuccess: (state, action: PayloadAction<Article>) => {
      state.article = action.payload;
      state.status = 'success';
    },
    getArticleBySlugFailed: (state) => {
      state.article = null;
      state.status = 'error';
    },

    createArticleBegin: (state, action) => {
      state.status = 'loading';
      state.errors = {};
    },
    createArticleSuccess: (state, action) => {
      state.status = 'success';
      state.errors = {};
    },
    createArticleFailed: (state, action: PayloadAction<GenericErrorModel>) => {
      state.status = 'error';
      state.errors = action.payload.errors;
    },

    updateArticleBegin: (state, action) => {
      state.status = 'loading';
      state.errors = {};
    },
    updateArticleSuccess: (state, action) => {
      state.status = 'success';
      state.errors = {};
    },
    updateArticleFailed: (state, action: PayloadAction<GenericErrorModel>) => {
      state.status = 'error';
      state.errors = action.payload.errors;
    },

    resetError: (state) => {
      state.errors = {};
    }
  }
});

export const editorActions = editorSlice.actions;

export const selectEditorArticleBySlug = (state: RootState) => state.editor.article;
export const selectEditorErrors = (state: RootState) => state.editor.errors;

const editorReducer = editorSlice.reducer;
export default editorReducer;
