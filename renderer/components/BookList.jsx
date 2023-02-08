import React, { useState } from "react";
import { Book } from "./Book";
import { Modal } from "./Modal";

export const BookList = ({ books }) => {
  return (
    <>
      <div className="text-md font-bold">
        All books
        <span className="text-secondary-content text-sm font-normal italic">
          ~ Look all your magic books
        </span>
      </div>
      <div className="grid grid-cols-6 grid-flow-row gap-4">
        {books.map((book, i) => {
          return (
            <div className="w-[10vw]" key={i}>
              <Book {...book} key={i} />
            </div>
          );
        })}
        <label
          className="my-1 bg-base-200 border border-accent rounded-md flex flex-col justify-center items-center content-center gap-4 min-w-[12rem] h-[20.5rem] cursor-pointer hover:border-accent-focus"
          htmlFor="add_book"
        >
          <p className="text-white text-9xl">+</p>
          <p className="text-white text-sm font-bold">Add a book</p>
        </label>
      </div>
      <Modal trigger_id="add_book" />
    </>
  );
};
