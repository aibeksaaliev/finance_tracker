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