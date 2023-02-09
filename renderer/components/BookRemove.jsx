import electron from "electron";
import React from "react";
import { useStore } from "../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const BookRemove = ({ id, title }) => {
  const handleRemove = (e) => {
    e.preventDefault();
    const books = ipcRenderer.sendSync("remove-book", id);
    useStore.setState({ books });
  };

  return (
    <>
      <input
        type="checkbox"
        id={`remove_book_${id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`remove_book_${id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-error">
            Are you sure to delete {title} ?
          </h3>
          <p className="py-4 text-warning">
            Carefull if you delete this book, you can get it back !
          </p>
          <label
            className="btn btn-warning mt-2"
            htmlFor={`remove_book_${id}`}
            onClick={handleRemove}
          >
            Remove book
          </label>
        </div>
      </div>
    </>
  );
};
