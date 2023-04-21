import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Article, Profile } from 'shared/data-access/common/configs/appModels';
import api from './profileApi';
import { profileActions } from './profileSlice';

function* handleFetchProfile(action: PayloadAction<string>) {
  try {
    const response: Profile = yield call(api.getProfile, action.payload);
    yield put(profileActions.getProfileSuccess(response));
  } catch (error) {
    yield put(profileActions.getProfileFailed());
  }
}

function* handleFetchProfileArticles(
  action: PayloadAction<{ articlesType: string; username: string }>
) {
  const { articlesType, username } = action.payload;
  try {
    const response: Article[] = yield call(api.getProfileArticles, articlesType, username);
    yield put(profileActions.getProfileArticlesSuccess(response));
  } catch (error) {
    yield put(profileActions.getProfileArticlesFailed());
  }
}

export default function* profileSaga() {
  yield takeLatest(profileActions.getProfileBegin.type, handleFetchProfile);
  yield takeLatest(profileActions.getProfileArticlesBegin.type, handleFetchProfileArticles);
}
