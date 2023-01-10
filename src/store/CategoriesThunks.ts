import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ApiCategoriesList, ApiCategory, CategoryType, UpdateCategoryParams} from "../types";

export const createCategory = createAsyncThunk<void, ApiCategory>(
  "categories/createCategory",
  async (newCategory) => {
    await axiosApi.post("/categories.json", newCategory);
  }
);

export const fetchAllCategories = createAsyncThunk<CategoryType[]>(
  "categories/fetchAllCategories",
  async () => {
    const response = await axiosApi.get<ApiCategoriesList | null>("/categories.json");
    const categories = response.data;

    if (categories) {
      return Object.keys(categories).map(id => {
        const category = categories[id];
        return {...category, id: id};
      });
    }

    return [];
  }
);

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  "categories/fetchOneCategory",
  async (id) => {
    const response = await axiosApi.get<ApiCategory | null>("/categories/" + id + ".json");
    const category = response.data;

    if (category === null) {
      throw new Error("Not found");
    }

    return category;
  }
);

export const updateOneCategory = createAsyncThunk<void, UpdateCategoryParams>(
  "categories/updateOneCategory",
  async (params) => {
    await axiosApi.put("/categories/" + params.id + ".json", params.category);
  }
);

export const deleteOneCategory = createAsyncThunk<void, string>(
  "categories/deleteOneCategory",
  async (id) => {
    await axiosApi.delete("/categories/" + id + ".json");
  }
);

