import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateUser } from 'shared/data-access/common/configs/appModels';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {},
  reducers: {
    updateUserBegin: (state, action: PayloadAction<UpdateUser>) => {},
    updateUserSuccess: (state) => {},
    updateUserFailed: (state) => {}
  }
});

export const settingsActions = settingsSlice.actions;

const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
