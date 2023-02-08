import electron from "electron";
import React from "react";

const shell = electron.shell;

export const Book = ({ image, title, author, year, category, path }) => {
  // Open the book with an external application
  const handleOpen = (e) => {
    e.preventDefault();
    shell.openExternal(`file://${path}`);
  };

  return (
    <div
      className="my-1 bg-base-200 border border-accent rounded-md flex flex-col justify-start gap-4 min-w-[12rem] h-[20.5rem] cursor-pointer hover:border-accent-focus"
      onClick={handleOpen}
    >
      <img
        src={image}
        alt={`${title} - ${author} book image`}
        className="w-full h-52 object-cover"
      />
      <div className="px-1 pb-1">
        <p className="text-2xl font-bold capitalize truncate">{title}</p>
        <p className="text-sm italic truncate">{author}</p>
        <p className="text-sm italic">{year}</p>
        <p className="badge badge-secondary">{category}</p>
      </div>
    </div>
  );
};
