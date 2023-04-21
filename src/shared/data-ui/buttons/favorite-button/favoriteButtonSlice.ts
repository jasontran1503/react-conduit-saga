import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const favoriteButtonSlice = createSlice({
  name: 'favoriteButton',
  initialState: {},
  reducers: {
    begin: (state, action: PayloadAction<{ favorited: boolean; slug: string }>) => {},
    success: (state) => {},
    failed: (state) => {}
  }
});

export const favoriteButtonActions = favoriteButtonSlice.actions;
