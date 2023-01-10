import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {ApiCategory, CategoryType} from "../types";
import {
  createCategory,
  deleteOneCategory,
  fetchAllCategories,
  fetchOneCategory,
  updateOneCategory
} from "./CategoriesThunks";

interface CategoriesState {
  categories: CategoryType[];
  category: ApiCategory | null;
  createLoading: boolean;
  pageLoading: boolean;
  formLoading: boolean;
  deleteLoading: false | string;
}

const initialState: CategoriesState = {
  categories: [],
  category: null,
  createLoading: false,
  pageLoading: false,
  formLoading: false,
  deleteLoading: false,
};

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchAllCategories.pending, (state) => {
      state.pageLoading = true;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.pageLoading = false;
    });
    builder.addCase(fetchAllCategories.rejected, (state) => {
      state.pageLoading = false;
    });

    builder.addCase(fetchOneCategory.pending, (state) => {
      state.formLoading = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.formLoading = false;
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.formLoading = false;
    });

    builder.addCase(updateOneCategory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(updateOneCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(updateOneCategory.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteOneCategory.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteOneCategory.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteOneCategory.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});

export const CategoriesReducer = CategoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectCreateLoading = (state: RootState) => state.categories.createLoading;
export const selectPageLoading = (state: RootState) => state.categories.pageLoading;
export const selectFormLoading = (state: RootState) => state.categories.formLoading;
export const selectDeleteLoading = (state: RootState) => state.categories.deleteLoading;