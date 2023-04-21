import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  Article,
  GenericErrorModel,
  NewArticle,
  UpdateArticle
} from 'shared/data-access/common/configs/appModels';
import { history } from 'shared/data-access/common/logic/history';
import api from './editorApi';
import { editorActions } from './editorSlice';

function* handleFetchArticleBySlug(action: PayloadAction<string>) {
  try {
    const response: Article = yield call(api.getArticleBySlug, action.payload);
    yield put(editorActions.getArticleBySlugSuccess(response));
  } catch (error) {
    yield put(editorActions.getArticleBySlugFailed());
  }
}

function* handleCreateArticle(action: PayloadAction<NewArticle>) {
  try {
    const response: Article = yield call(api.createArticle, action.payload);
    yield put(editorActions.createArticleSuccess(response));
    yield call(history.push, `/article/${response.slug}`);
  } catch (error) {
    yield put(editorActions.createArticleFailed(error as GenericErrorModel));
  }
}

function* handleUpdateArticle(action: PayloadAction<{ slug: string; article: UpdateArticle }>) {
  try {
    const { slug, article } = action.payload;
    const response: Article = yield call(api.updateArticle, slug, article);
    yield put(editorActions.updateArticleSuccess(response));
    yield call(history.push, `/article/${response.slug}`);
  } catch (error) {
    yield put(editorActions.updateArticleFailed(error as GenericErrorModel));
  }
}

export default function* editorSaga() {
  yield takeEvery(editorActions.getArticleBySlugBegin.type, handleFetchArticleBySlug);
  yield takeLeading(editorActions.createArticleBegin.type, handleCreateArticle);
  yield takeLeading(editorActions.updateArticleBegin.type, handleUpdateArticle);
}
