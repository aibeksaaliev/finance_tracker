import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiTransaction, ApiTransactionsList, ExtendedTransactionType, UpdateTransactionParams} from "../types";
import {RootState} from "../app/store";

export const createTransaction = createAsyncThunk<void, ApiTransaction>(
  "transactions/createTransactions",
  async (newTransaction) => {
    await axiosApi.post("/transactions.json", newTransaction);
  }
);

export const fetchAllTransactions = createAsyncThunk<ExtendedTransactionType[], undefined, {state: RootState}>(
  "transactions/fetchAllTransactions",
  async (_, thunkAPI) => {
    const categories = thunkAPI.getState().categories.categories;

    const extendedTransactions: ExtendedTransactionType[] = [];
    const transactionsResponse = await axiosApi.get<ApiTransactionsList | null>("/transactions.json");
    const transactions = transactionsResponse.data;

    if (transactions && categories) {
      Object.keys(transactions).forEach(transactionId => {
        const transaction = transactions[transactionId];
        categories.forEach(category => {
          if (transaction.category === category.id) {
            const extendedTransaction: ExtendedTransactionType = {
              categoryId: category.id,
              categoryTitle: category.title,
              transactionId: transactionId,
              createdAt: transaction.createdAt,
              amount: transaction.amount,
              type: category.type
            };
            extendedTransactions.push(extendedTransaction);
          }
        })
      })

      return extendedTransactions.sort((a, b) => {
        return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
      });
    }

    return [];
  }
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string>(
  "transactions/fetchOneTransaction",
  async (id) => {
      const response = await axiosApi.get<ApiTransaction | null>("/transactions/" + id + ".json");
      const transaction = response.data;

      if (transaction === null) {
        throw new Error("Not found");
      }

      return transaction;
  }
);

export const updateOneTransaction = createAsyncThunk<void, UpdateTransactionParams>(
  "transactions/updateOneTransaction",
  async (params) => {
    await axiosApi.put("/transactions/" + params.id + ".json", params.transaction);
  }
);

export const deleteOneTransaction = createAsyncThunk<void, string>(
  "transactions/deleteOneTransaction",
  async (id) => {
    await axiosApi.delete("/transactions/" + id + ".json");
  }
);