import { create } from "zustand";

export const useStore = create((_set) => ({
  books: [{}],
  categories: [],
  theme: "lofi",
  selected: {},
  recently: [],
}));
