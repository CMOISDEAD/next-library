import electron from "electron";
import React from "react";
import { useStore } from "../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const BookRemove = ({ id, title }) => {
  const trigger = `remove_book_${title}`;

  const handleRemove = (e) => {
    e.preventDefault();
    const { books, recent } = ipcRenderer.sendSync("remove-book", id);
    ipcRenderer.send("add-current", {});
    useStore.setState({ books, selected: {}, recently: recent });
  };

  return (
    <>
      <input type="checkbox" id={trigger} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={trigger}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-error">
            Are you sure to delete {title} ?
          </h3>
          <p className="py-4 text-warning">
            Be carefull if you delete this book, you can get it back!
          </p>
          <label
            className="btn btn-warning mt-2"
            htmlFor={trigger}
            onClick={handleRemove}
          >
            Remove book
          </label>
        </div>
      </div>
    </>
  );
};
