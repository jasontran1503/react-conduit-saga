import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, Article, Profile } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';

export type ProfileArticlesType = 'author' | 'favorited';

export interface ProfileState {
  user: Profile | null;
  articles: Article[];
  status: ApiStatus;
}

const initialState: ProfileState = {
  user: null,
  articles: [],
  status: 'idle'
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleFollow: (state, action: PayloadAction<Profile>) => {
      if (state.user) {
        state.user = action.payload;
      }
    },
    toggleFavorite: (state, action: PayloadAction<Article>) => {
      state.articles = state.articles.map((article) => {
        const { slug, favorited, favoritesCount } = action.payload;
        return article.slug === slug ? { ...article, favorited, favoritesCount } : article;
      });
    },

    getProfileBegin: (state, action: PayloadAction<string>) => {
      state.user = null;
    },
    getProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.user = action.payload;
    },
    getProfileFailed: (state) => {
      state.user = null;
    },

    getProfileArticlesBegin: (
      state,
      action: PayloadAction<{ articlesType: string; username: string }>
    ) => {
      state.articles = [];
      state.status = 'loading';
    },
    getProfileArticlesSuccess: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
      state.status = 'success';
    },
    getProfileArticlesFailed: (state) => {
      state.articles = [];
      state.status = 'error';
    }
  }
});

export const profileActions = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.user;
export const selectProfileArticles = (state: RootState) => state.profile.articles;
export const selectProfileArticlesStatus = (state: RootState) => state.profile.status;

const profileReducer = profileSlice.reducer;
export default profileReducer;
