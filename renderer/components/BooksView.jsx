import React from "react";
import { Book } from "./Book";

export const BooksView = ({ books }) => {
  return (
    <>
      <div className="text-md font-bold">
        Recent books
        <span className="text-secondary-content text-sm font-normal italic">
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
