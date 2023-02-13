import React from "react";
import { BookRemove } from "./BookRemove";
import { EditModal } from "./EditModal";
import { RxDotsHorizontal } from "react-icons/rx";

export const BookOptions = ({ book }) => {
  const { id, title } = book;

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className="badge badge-ghost m-1 cursor-pointer hover:bg-info-content hover:text-primary-focus"
      >
        <RxDotsHorizontal />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <label htmlFor={`remove_book_${title}`}>Delete Book</label>
        </li>
        <li>
          <label htmlFor="edit_book">Edit Metadata</label>
        </li>
      </ul>
      <BookRemove id={id} title={title} />
      <EditModal trigger_id="edit_book" selectBook={book} />
    </div>
  );
};
