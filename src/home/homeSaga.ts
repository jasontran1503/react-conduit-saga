import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Article } from 'shared/data-access/common/configs/appModels';
import api from './homeApi';
import { homeActions } from './homeSlice';

function* handleFetchYourFeed() {
  try {
    const response: Article[] = yield call(api.getYourFeed);
    yield put(homeActions.getYourFeedSuccess(response));
  } catch (error) {
    yield put(homeActions.getYourFeedFailed());
  }
}

function* handleFetchGlobalFeed() {
  try {
    const response: Article[] = yield call(api.getGlobalFeed);
    yield put(homeActions.getGlobalFeedSuccess(response));
  } catch (error) {
    yield put(homeActions.getGlobalFeedFailed());
  }
}

function* handleFetchArticlesByTag(action: PayloadAction<string>) {
  try {
    const response: Article[] = yield call(api.getArticlesByTag, action.payload);
    yield put(homeActions.getArticlesByTagSuccess(response));
  } catch (error) {
    yield put(homeActions.getArticlesByTagFailed());
  }
}

export default function* homeSaga() {
  yield takeLatest(homeActions.getYourFeedBegin.type, handleFetchYourFeed);
  yield takeLatest(homeActions.getGlobalFeedBegin.type, handleFetchGlobalFeed);
  yield takeLatest(homeActions.getArticlesByTagBegin.type, handleFetchArticlesByTag);
}
