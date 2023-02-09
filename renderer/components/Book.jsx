import electron from "electron";
import React from "react";
import { BookRemove } from "./BookRemove";

const shell = electron.shell;

export const Book = ({ id, image, title, author, year, category, path }) => {
  // Open the book with an external application
  const handleOpen = (e) => {
    e.preventDefault();
    shell.openExternal(`file://${path}`);
  };

  return (
    <>
      <div
        className="my-1 bg-base-200 border border-accent rounded-md flex flex-col justify-start gap-4 min-w-[12rem] h-[20.5rem] cursor-pointer tooltip hover:border-accent-focus"
        onDoubleClick={handleOpen}
        data-tip={title}
      >
        <img
          src={image}
          alt={`${title} - ${author} book image`}
          className="w-full h-52 object-cover"
        />
        <div className="px-1 mb-1">
          <p className="text-2xl font-bold capitalize truncate">{title}</p>
          <p className="text-sm italic truncate">{author}</p>
          <p className="text-sm italic">{year}</p>
          <p className="badge badge-secondary">{category}</p>
          <label className="badge badge-error" htmlFor={`remove_book_${id}`}>
            x
          </label>
        </div>
        <BookRemove id={id} title={title} />
      </div>
    </>
  );
};
