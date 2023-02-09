import React from "react";
import { Book } from "./Book";

export const BooksView = ({ books }) => {
  return (
    <>
      <div className="text-md font-bold">
        Recent books{" "}
        <span className="text-secondary-content text-sm font-normal italic">
          ~ Continue with your last books
        </span>
      </div>
      <div className="flex flex-row justify-start gap-4 overflow-auto">
        {[...books]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map((book, i) => {
            return (
              <div className="w-[14.6vw]" key={i}>
                <Book {...book} />
              </div>
            );
          })}
      </div>
    </>
  );
};
