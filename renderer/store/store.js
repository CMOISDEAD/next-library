import { create } from "zustand";

// FIX: Change this name, generate confucion with a zustand method
export const useStore = create((set) => ({
  books: [{}],
  theme: "black",
  // current selected book
  selected: {},
}));
