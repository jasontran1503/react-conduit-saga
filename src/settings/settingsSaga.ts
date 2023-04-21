import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { authActions } from 'shared/data-access/auth/authSlice';
import { UpdateUser, User } from 'shared/data-access/common/configs/appModels';
import { history } from 'shared/data-access/common/logic/history';
import api from './settingsApi';
import { settingsActions } from './settingsSlice';

function* handleUpdateUser(action: PayloadAction<UpdateUser>) {
  try {
    const response: User = yield call(api.updateUser, action.payload);
    yield put(settingsActions.updateUserSuccess());
    yield put(authActions.update(response));
    yield call(history.push, `/profile/${response.username}`);
  } catch (error) {
    yield put(settingsActions.updateUserFailed());
  }
}

export default function* settingsSaga() {
  yield takeLeading(settingsActions.updateUserBegin.type, handleUpdateUser);
}
