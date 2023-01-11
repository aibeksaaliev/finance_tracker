export interface CategoryType {
  type: string;
  title: string;
  id: string;
}

export type ApiCategory = Omit<CategoryType, "id">;

export interface ApiCategoriesList {
  [id: string]: ApiCategory;
}

export interface UpdateCategoryParams {
  id: string,
  category: ApiCategory
}

export interface TransactionType {
  category: string;
  amount: number;
  createdAt: string;
  id: string;
}

export type ApiTransaction = Omit<TransactionType, "id">;

export interface UpdateTransactionParams {
  id: string;
  transaction: ApiTransaction;
}

export interface ApiTransactionsList {
  [id: string]: ApiTransaction;
}

export interface TransactionMutationType {
  category: string;
  amount: string;
  createdAt: string;
}

export interface ExtendedTransactionType {
  categoryId: string;
  categoryTitle: string;
  transactionId: string;
  amount: number;
  createdAt: string;
  type: string;
}