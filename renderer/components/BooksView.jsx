// NOTE: this file should be named recentBooks.jsx
import React from "react";
import { Book } from "./Book";
import { BsBook } from "react-icons/bs";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";

export const BooksView = () => {
  const { books } = useStore(
    (state) => ({
      books: state.recently,
    }),
    shallow
  );

  return (
    <>
      <div className="inline-flex gap-2 content-center items-center font-bold text-md">
        <BsBook />
        Recent books
        <span className="text-sm italic font-normal text-secondary">
          ~ Continue with your last books
        </span>
      </div>
      <div className="flex overflow-auto flex-row gap-4 justify-start">
        {books.length ? (
          books.map((book, i) => {
            return <Book {...book} key={i} />;
          })
        ) : (
          <p className="text-xs italic">Try to read something, no..?</p>
        )}
      </div>
    </>
  );
};
