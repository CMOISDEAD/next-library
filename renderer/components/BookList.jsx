import React from "react";
import { Book } from "./Book";
import { AddModal } from "./AddModal";

export const BookList = ({ books }) => {
  return (
    <>
      <div className="text-md font-bold">
        All books
        <span className="text-secondary-content text-sm font-normal italic">
          ~ Look all your magic books
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row gap-4">
        {books.map((book, i) => {
          return <Book {...book} key={i} />;
        })}
        <label
          className="my-1 bg-base-200 border border-accent rounded-md flex flex-col justify-center items-center content-center gap-4 min-w-[12rem] h-[21.5rem] cursor-pointer hover:border-accent-focus"
          htmlFor="add_book"
        >
          <p className="text-white text-9xl">+</p>
          <p className="text-white text-sm font-bold">Add a book</p>
        </label>
      </div>
      <AddModal trigger_id="add_book" />
    </>
  );
};
