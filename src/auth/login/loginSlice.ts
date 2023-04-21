import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenericErrorModel } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';

export interface LoginState {
  errors: Record<string, string[]>;
}

const initialState: LoginState = {
  errors: {}
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    begin: (state, action) => {
      state.errors = {};
    },
    success: (state, action) => {
      state.errors = {};
    },
    failed: (state, action: PayloadAction<GenericErrorModel>) => {
      state.errors = action.payload.errors;
    },
    resetError: (state) => {
      state.errors = {};
    }
  }
});

export const loginActions = loginSlice.actions;

export const selectLoginErrors = (state: RootState) => state.login.errors;

const loginReducer = loginSlice.reducer;
export default loginReducer;
