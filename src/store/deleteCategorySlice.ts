import { createSlice } from '@reduxjs/toolkit';

const deleteCategorySlices = createSlice({
  name: 'deleteCategory',
  initialState: {
    isDeleteCategoriesName: [],
    isDeleteCategoriesId: [''],
  },
  reducers: {
    isDeleteCategoriesName(state, action) {
      state.isDeleteCategoriesName = action.payload.isDeleteCategoriesName;
    },
    isDeleteCategoriesId(
      state,
      action: { payload: { isDeleteCategoriesId: never[] | string[] }; type: string | [string] }
    ) {
      state.isDeleteCategoriesId = action.payload.isDeleteCategoriesId;
    },
  },
});

export const { isDeleteCategoriesName, isDeleteCategoriesId } = deleteCategorySlices.actions;
export default deleteCategorySlices.reducer;
