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
      <div className="flex gap-4 justify-between content-center items-center">
        <div className="inline-flex gap-2 content-center items-center font-bold text-md">
          <BsBookshelf />
          All books
          <span className="text-sm italic font-normal text-secondary">
            ~ Look all your magic books
          </span>
        </div>
        <Toolbar />
      </div>
      {categories.length ? (
        categories.map((category, i) => {
          return (
            <div key={i}>
              <div className="flex justify-between content-center items-center">
                <div className="my-2 text-sm font-bold underline uppercase">
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
              <div className="grid grid-cols-2 grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {books.length ? (
                  books
                    .filter((book) => book.category == category)
                    .map((book, i) => {
                      return <Book {...book} key={i} />;
                    })
                ) : (
                  <p className="text-xs italic">
                    No books yet in this category...
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-3xl font-bold text-center uppercase">
          No categories yet...
        </p>
      )}
    </>
  );
};
