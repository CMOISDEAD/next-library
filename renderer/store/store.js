import { create } from "zustand";

// FIX: Change this name, generate confucion with zustand method
export const useStore = create((set) => ({
  books: [{}],
}));
