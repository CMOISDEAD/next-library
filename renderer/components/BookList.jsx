import electron from "electron";
import React from "react";
import { Book } from "./Book";
import { BsBookshelf } from "react-icons/bs";
import { Toolbar } from "./Toolbar";
import { AiOutlineDelete } from "react-icons/ai";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";

const ipcRenderer = electron.ipcRenderer || false;

export const BookList = () => {
  const { categories, books } = useStore(
    (state) => ({
      categories: state.categories,
      books: state.books,
    }),
    shallow
  );

  return (
    <>
      <div className="flex justify-between content-center items-center gap-4">
        <div className="text-md font-bold inline-flex content-center items-center gap-2">
          <BsBookshelf />
          All books
          <span className="text-secondary-content text-sm font-normal italic">
            ~ Look all your magic books
          </span>
        </div>
        <Toolbar />
      </div>
      {categories.map((category, i) => {
        return (
          <div key={i}>
            <div className="flex justify-between content-center items-center">
              <div className="text-sm font-bold underline uppercase my-2">
                {category}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  const newCategories = ipcRenderer.sendSync(
                    "delete-category",
                    category
                  );
                  useStore.setState({ categories: newCategories });
                }}
              >
                <AiOutlineDelete />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 grid-flow-row gap-4">
              {books
                .filter((book) => book.category == category)
                .map((book, i) => {
                  return <Book {...book} key={i} />;
                })}
            </div>
          </div>
        );
      })}
    </>
  );
};
