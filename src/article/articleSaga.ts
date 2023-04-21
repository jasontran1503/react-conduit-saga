import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { Article } from 'shared/data-access/common/configs/appModels';
import { history } from 'shared/data-access/common/logic/history';
import api from './articleApi';
import { articleActions } from './articleSlice';

function* handleFetchArticleBySlug(action: PayloadAction<string>) {
  try {
    const response: Article = yield call(api.getArticleBySlug, action.payload);
    yield put(articleActions.getArticleBySlugSuccess(response));
  } catch (error) {
    yield put(articleActions.getArticleBySlugFailed());
  }
}

function* handleDeleteArticle(action: PayloadAction<string>) {
  try {
    yield call(api.deleteArticle, action.payload);
    yield put(articleActions.deleteArticleSuccess());
  } catch (error) {
    yield put(articleActions.deleteArticleFailed());
  } finally {
    yield call(history.push, '/');
  }
}

export default function* articleSaga() {
  yield takeEvery(articleActions.getArticleBySlugBegin.type, handleFetchArticleBySlug);
  yield takeLeading(articleActions.deleteArticleBegin.type, handleDeleteArticle);
}
