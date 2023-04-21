import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects';
import { Comment, NewComment } from 'shared/data-access/common/configs/appModels';
import api from './commentApi';
import { commentActions } from './commentSlice';

function* handleFetchComments(action: PayloadAction<string>) {
  try {
    const response: Comment[] = yield call(api.getComments, action.payload);
    yield put(commentActions.getCommentsSuccess(response));
  } catch (error) {
    yield put(commentActions.getCommentsFailed());
  }
}

function* handleCreateComment(action: PayloadAction<{ slug: string; comment: NewComment }>) {
  const { slug, comment } = action.payload;
  try {
    const response: Comment = yield call(api.createComment, slug, comment);
    yield put(commentActions.createCommentSuccess(response));
  } catch (error) {
    yield put(commentActions.createCommentFailed());
  }
}

function* handleDeleteComment(action: PayloadAction<{ slug: string; id: number }>) {
  const { slug, id } = action.payload;
  try {
    yield call(api.deleteComment, slug, id);
    yield put(commentActions.deleteCommentSuccess(id));
  } catch (error) {
    yield put(commentActions.deleteCommentFailed());
  }
}

export default function* commentSaga() {
  yield takeEvery(commentActions.getCommentsBegin.type, handleFetchComments);
  yield takeLeading(commentActions.createCommentBegin.type, handleCreateComment);
  yield takeLeading(commentActions.deleteCommentBegin.type, handleDeleteComment);
}
