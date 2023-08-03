import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}


const category: Category = {
  id: "0ce68ddd-4981-4ee2-a23b-a01452b96b01",
  name: "Olive",
  description: "Earum quo at dolor tempore nisi.",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  updated_at: "2022-08-15T10:59:09+0000"
};

export const initialState = [
  category,
  { ...category, id: "1ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Peach"},
  { ...category, id: "2ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Apple"},
  { ...category, id: "3ce68ddd-4981-4ee2-a23b-a01452b96b01", name: "Banana"},
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload)
    },
    updateCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state[index] = action.payload
    },
    deleteCategory(state, action) {
      const index = state.findIndex(
        (category) => category.id === action.payload.id
      );
      state.splice(index, 1)
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: String) => {
  state.categories.find((category) => category.id === id)

  return category || {
    id: "",
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
  };
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;