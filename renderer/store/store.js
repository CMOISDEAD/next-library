import { create } from "zustand";

export const useStore = create((_set) => ({
  selected: {},
  books: [{}],
  recently: [],
  categories: [],
  theme: "gruvbox",
}));
