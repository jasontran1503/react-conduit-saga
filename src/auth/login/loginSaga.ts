import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { authActions } from 'shared/data-access/auth/authSlice';
import {
  GenericErrorModel,
  LoginUser,
  UserResponse
} from 'shared/data-access/common/configs/appModels';
import { history } from 'shared/data-access/common/logic/history';
import api from './loginApi';
import { loginActions } from './loginSlice';

function* handleLogin(action: PayloadAction<LoginUser>) {
  try {
    const response: UserResponse = yield call(api.login, action.payload);
    yield put(loginActions.success(response));
    yield put(authActions.getCurrentUserBegin());
    yield call(history.push, '/');
  } catch (error) {
    yield put(loginActions.failed(error as GenericErrorModel));
  }
}

export default function* loginSaga() {
  yield takeLeading(loginActions.begin.type, handleLogin);
}
