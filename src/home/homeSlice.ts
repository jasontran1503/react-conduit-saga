import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Article } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';

export type HomeArticlesType = 'feed' | 'global' | 'tag';

export interface HomeState {
  articles: Article[];
  status: ApiStatus;
}

const initialState: HomeState = {
  articles: [],
  status: 'idle'
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      state.articles = state.articles.map((article) => {
        const { slug, favorited, favoritesCount } = action.payload;
        return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
      });
    },

    getYourFeedBegin: (state) => {
      state.articles = [];
      state.status = 'loading';
    },
    getYourFeedSuccess: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.status = 'success';
    },
    getYourFeedFailed: (state) => {
      state.articles = [];
      state.status = 'error';
    },

    getGlobalFeedBegin: (state) => {
      state.articles = [];
      state.status = 'loading';
    },
    getGlobalFeedSuccess: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.status = 'success';
    },
    getGlobalFeedFailed: (state) => {
      state.articles = [];
      state.status = 'error';
    },

    getArticlesByTagBegin: (state, action: PayloadAction<string>) => {
      state.articles = [];
      state.status = 'loading';
    },
    getArticlesByTagSuccess: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.status = 'success';
    },
    getArticlesByTagFailed: (state) => {
      state.articles = [];
      state.status = 'error';
    }
  }
});

export const homeActions = homeSlice.actions;

export const selectHomeArticles = (state: RootState) => state.home.articles;
export const selectArticlesStatus = (state: RootState) => state.home.status;

const homeReducer = homeSlice.reducer;
export default homeReducer;
