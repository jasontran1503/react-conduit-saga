import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiStatus } from 'shared/data-access/common/configs/appModels';
import { RootState } from 'shared/data-access/common/configs/store';

export interface TagsState {
  items: string[];
  status: ApiStatus;
}

const initialState: TagsState = {
  items: [],
  status: 'idle'
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    begin: (state) => {
      state.items = [];
      state.status = 'loading';
    },
    success: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
      state.status = 'success';
    },
    failed: (state, action) => {
      state.items = [];
      state.status = 'error';
    }
  }
});

export const tagsActions = tagsSlice.actions;

export const selectTags = (state: RootState) => state.tags.items;
export const selectTagsStatus = (state: RootState) => state.tags.status;

const tagsReducer = tagsSlice.reducer;
export default tagsReducer;
