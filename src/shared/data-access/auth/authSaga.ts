import { call, put, takeEvery } from 'redux-saga/effects';
import { authActions } from 'shared/data-access/auth/authSlice';
import { User } from 'shared/data-access/common/configs/appModels';
import { setToken } from '../common/logic/token';
import authApi from './authApi';

function* handleFetchCurrentUser() {
  const token = localStorage.getItem('api_token');
  if (token) {
    try {
      setToken(token);
      const response: User = yield call(authApi.getCurrentUser);
      yield put(authActions.getCurrentUserSuccess(response));
    } catch (error) {
      yield put(authActions.getCurrentUserFailed(error));
    }
    return;
  }
  yield put(authActions.getCurrentUserFailed(null));
}

export default function* authSaga() {
  yield takeEvery(authActions.getCurrentUserBegin.type, handleFetchCurrentUser);
}
