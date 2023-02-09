import React from "react";
import { BookRemove } from "./BookRemove";

export const BookOptions = ({ id, title }) => {
  return (
    <div className="dropdown dropdown-top dropdown-end">
      <label
        tabIndex={0}
        className="badge badge-info m-1 cursor-pointer hover:bg-info-content hover:text-primary-focus"
      >
        ...
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <label htmlFor={`remove_book_${id}`}>Delete Book</label>
        </li>
        <li>
          <a>Edit Metadata</a>
        </li>
      </ul>
      <BookRemove id={id} title={title} />
    </div>
  );
};
