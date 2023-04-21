import articleSaga from 'article/articleSaga';
import commentSaga from 'article/comment/commentSaga';
import loginSaga from 'auth/login/loginSaga';
import registerSaga from 'auth/register/registerSaga';
import editorSaga from 'editor/editorSaga';
import homeSaga from 'home/homeSaga';
import tagsSaga from 'home/tags/tagsSaga';
import profileSaga from 'profile/profileSaga';
import { all } from 'redux-saga/effects';
import settingsSaga from 'settings/settingsSaga';
import favoriteSaga from 'shared/data-ui/buttons/favorite-button/favoriteButtonSaga';
import followSaga from 'shared/data-ui/buttons/follow-button/followButtonSaga';
import authSaga from '../../auth/authSaga';

const sagas = [
  loginSaga(),
  registerSaga(),
  authSaga(),
  tagsSaga(),
  homeSaga(),
  settingsSaga(),
  profileSaga(),
  followSaga(),
  favoriteSaga(),
  articleSaga(),
  editorSaga(),
  commentSaga()
];

export default function* rootSaga() {
  yield all(sagas);
}
