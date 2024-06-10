import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const navbarSlices = createSlice({
  name: 'navbar',
  initialState: {
    isImage: '',
  },
  reducers: {
    setImage(state, action: PayloadAction<{ isImage: string }>) {
      state.isImage = action.payload.isImage;
    },
  },
});

export const { setImage } = navbarSlices.actions;
export default navbarSlices.reducer;
