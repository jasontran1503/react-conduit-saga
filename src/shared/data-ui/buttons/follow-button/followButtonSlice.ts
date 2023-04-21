import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const followButtonSlice = createSlice({
  name: 'followButton',
  initialState: {},
  reducers: {
    begin: (state, action: PayloadAction<{ following: boolean; username: string }>) => {},
    success: (state) => {},
    failed: (state) => {}
  }
});

export const followButtonActions = followButtonSlice.actions;
