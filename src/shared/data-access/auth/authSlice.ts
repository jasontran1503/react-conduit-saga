import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus, User } from 'shared/data-access/common/configs/appModels';
import { RootState } from '../common/configs/store';
import { setToken } from '../common/logic/token';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: ApiStatus;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCurrentUserBegin: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'loading';
    },
    getCurrentUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = 'success';
    },
    getCurrentUserFailed: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'error';
    },

    update: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('api_token');
      setToken(null);
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const authActions = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;

const authReducer = authSlice.reducer;
export default authReducer;
