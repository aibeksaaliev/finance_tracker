import {configureStore} from "@reduxjs/toolkit";
import {CategoriesReducer} from "../store/CategoriesSlice";

export const store = configureStore({
  reducer: {
    categories: CategoriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;