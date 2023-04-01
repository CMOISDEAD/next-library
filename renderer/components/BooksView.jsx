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
      <div className="text-md font-bold inline-flex content-center items-center gap-2">
        <BsBook />
        Recent books
        <span className="text-secondary text-sm font-normal italic">
          ~ Continue with your last books
        </span>
      </div>
      <div className="flex flex-row justify-start gap-4 overflow-auto">
        {books.map((book, i) => {
          return <Book {...book} key={i} />;
        })}
      </div>
    </>
  );
};
