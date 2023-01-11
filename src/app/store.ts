import {configureStore} from "@reduxjs/toolkit";
import {CategoriesReducer} from "../store/CategoriesSlice";
import {TransactionsReducer} from "../store/TransactionsSlice";

export const store = configureStore({
  reducer: {
    categories: CategoriesReducer,
    transactions: TransactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;