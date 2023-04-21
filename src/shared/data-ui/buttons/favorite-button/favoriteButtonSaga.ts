import { PayloadAction } from '@reduxjs/toolkit';
import { articleActions } from 'article/articleSlice';
import { homeActions } from 'home/homeSlice';
import { profileActions } from 'profile/profileSlice';
import { call, put, takeLeading } from 'redux-saga/effects';
import { Article } from 'shared/data-access/common/configs/appModels';
import api from './favoriteButtonApi';
import { favoriteButtonActions } from './favoriteButtonSlice';

function* handleFavorite(action: PayloadAction<{ favorited: boolean; slug: string }>) {
  const { favorited, slug } = action.payload;
  try {
    const response: Article = yield call(api.toggleFavorite, favorited, slug);
    yield put(favoriteButtonActions.success());
    yield put(profileActions.toggleFavorite(response));
    yield put(homeActions.toggleFavorite(response));
    yield put(articleActions.toggleFavorite(response));
  } catch (error) {
    yield put(favoriteButtonActions.failed());
  }
}

export default function* favoriteSaga() {
  yield takeLeading(favoriteButtonActions.begin.type, handleFavorite);
}
