import { create } from "zustand";

export const useStore = create((_set) => ({
  books: [{}],
  categories: [],
  theme: "black",
  selected: {},
  recently: [],
}));
