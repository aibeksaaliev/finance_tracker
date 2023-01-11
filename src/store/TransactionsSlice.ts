import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {ApiTransaction, ExtendedTransactionType} from "../types";
import {
  createTransaction,
  deleteOneTransaction,
  fetchAllTransactions,
  fetchOneTransaction,
  updateOneTransaction
} from "./TransactionsThunks";

interface TransactionsState {
  transactions: ExtendedTransactionType[];
  transaction: ApiTransaction | null;
  createLoading: boolean;
  pageLoading: boolean;
  formLoading: boolean;
  deleteLoading: false | string;
  modalConfirmStatus: boolean;
  deleteConfirm: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  createLoading: false,
  pageLoading: false,
  transaction: null,
  formLoading: false,
  deleteLoading: false,
  modalConfirmStatus: false,
  deleteConfirm: false,
}

export const TransactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    showModal: (state) => {
      state.modalConfirmStatus = true;
    },
    closeModal: (state) => {
      state.modalConfirmStatus = false;
    },
    confirmDelete: (state) => {
      state.deleteConfirm = true;
    },
    cancelDelete: (state) => {
      state.deleteConfirm = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(createTransaction.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchAllTransactions.pending, (state) => {
      state.pageLoading = true;
    });
    builder.addCase(fetchAllTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.pageLoading = false;
    });
    builder.addCase(fetchAllTransactions.rejected, (state) => {
      state.pageLoading = false;
    });

    builder.addCase(fetchOneTransaction.pending, (state) => {
      state.formLoading = true;
    })
    builder.addCase(fetchOneTransaction.fulfilled, (state, action) => {
      state.transaction = action.payload;
      state.formLoading = false;
    });
    builder.addCase(fetchOneTransaction.rejected, (state) => {
      state.formLoading = false;
    });

    builder.addCase(updateOneTransaction.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(updateOneTransaction.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(updateOneTransaction.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(deleteOneTransaction.pending, (state, {meta: {arg: id}}) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteOneTransaction.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteOneTransaction.rejected, (state) => {
      state.deleteLoading = false;
    });

  }
});

export const TransactionsReducer = TransactionsSlice.reducer;
export const {showModal, closeModal, confirmDelete, cancelDelete} = TransactionsSlice.actions;
export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectTransaction = (state: RootState) => state.transactions.transaction;
export const selectCreateTransactionLoading = (state: RootState) => state.transactions.createLoading;
export const selectTransactionsLoading = (state: RootState) => state.transactions.pageLoading;
export const selectTransactionFormLoading = (state: RootState) => state.transactions.formLoading;
export const selectTransactionDeleteLoading = (state: RootState) => state.transactions.deleteLoading;
export const selectModalTransactionStatus = (state: RootState) => state.transactions.modalConfirmStatus;
export const selectDeleteStatus = (state: RootState) => state.transactions.deleteConfirm;