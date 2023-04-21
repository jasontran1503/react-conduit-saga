import { call, put, takeEvery } from 'redux-saga/effects';
import api from './tagsApi';
import { tagsActions } from './tagsSlice';

function* handleFetchTags() {
  try {
    const response: string[] = yield call(api.getTags);
    yield put(tagsActions.success(response));
  } catch (error) {
    yield put(tagsActions.failed(error));
  }
}

export default function* tagsSaga() {
  yield takeEvery(tagsActions.begin.type, handleFetchTags);
}
