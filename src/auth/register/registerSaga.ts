import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLeading } from 'redux-saga/effects';
import { authActions } from 'shared/data-access/auth/authSlice';
import {
  GenericErrorModel,
  NewUser,
  UserResponse
} from 'shared/data-access/common/configs/appModels';
import { history } from 'shared/data-access/common/logic/history';
import api from './registerApi';
import { registerActions } from './registerSlice';

function* handleRegister(action: PayloadAction<NewUser>) {
  try {
    const response: UserResponse = yield call(api.register, action.payload);
    yield put(registerActions.success(response));
    yield put(authActions.getCurrentUserBegin());
    yield call(history.push, '/');
  } catch (error) {
    yield put(registerActions.failed(error as GenericErrorModel));
  }
}

export default function* registerSaga() {
  yield takeLeading(registerActions.begin.type, handleRegister);
}
