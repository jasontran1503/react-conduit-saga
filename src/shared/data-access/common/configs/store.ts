import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import articleReducer from 'article/articleSlice';
import commentReducer from 'article/comment/commentSlice';
import loginReducer from 'auth/login/loginSlice';
import registerReducer from 'auth/register/registerSlice';
import editorReducer from 'editor/editorSlice';
import homeReducer from 'home/homeSlice';
import tagsReducer from 'home/tags/tagsSlice';
import profileReducer from 'profile/profileSlice';
import createSagaMiddleware from 'redux-saga';
import settingsReducer from 'settings/settingsSlice';
import authReducer from '../../auth/authSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  auth: authReducer,
  tags: tagsReducer,
  home: homeReducer,
  profile: profileReducer,
  settings: settingsReducer,
  article: articleReducer,
  editor: editorReducer,
  comment: commentReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
