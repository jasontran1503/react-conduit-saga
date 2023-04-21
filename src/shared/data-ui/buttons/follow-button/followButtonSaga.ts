import { PayloadAction } from '@reduxjs/toolkit';
import { articleActions } from 'article/articleSlice';
import { profileActions } from 'profile/profileSlice';
import { call, put, takeLeading } from 'redux-saga/effects';
import { Profile } from 'shared/data-access/common/configs/appModels';
import api from './followButtonApi';
import { followButtonActions } from './followButtonSlice';

function* handleFollow(action: PayloadAction<{ following: boolean; username: string }>) {
  const { following, username } = action.payload;
  try {
    const response: Profile = yield call(api.toggleFollow, following, username);
    yield put(followButtonActions.success());
    yield put(profileActions.toggleFollow(response));
    yield put(articleActions.toggleFollow(response));
  } catch (error) {
    yield put(followButtonActions.failed());
  }
}

export default function* followSaga() {
  yield takeLeading(followButtonActions.begin.type, handleFollow);
}
