import electron from "electron";
import React, { useState } from "react";
import { useStore } from "../store/store";
import { Book } from "./Book";

const ipcRenderer = electron.ipcRenderer || false;

export const Modal = ({ trigger_id }) => {
  const [book, setBook] = useState({});
  const store = useStore(); // store from zustand

  // manage the inputs changes
  const handleChange = (e) => {
    e.preventDefault();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // manage the pdf path
  const handlePath = (e) => {
    e.preventDefault();
    const { name: _title, path } = e.target.files[0];
    setBook({ ...book, path });
  };

  // add the book to the local state and the app storage
  const addBook = (e) => {
    e.preventDefault();
    // add to electron storage
    ipcRenderer.send("add-book", book);
    // add to app state
    useStore.setState({ books: [...store.books, book] });
  };

  return (
    <>
      <input type="checkbox" id={trigger_id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-8/12 max-w-5xl relative flex justify-evenly">
          <div className="flex-1">
            <label
              htmlFor={trigger_id}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Edit book metadata</h3>
            <p className="py-4">Edit the metadata of the book.</p>
            {/* title */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Book title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
              />
            </div>
            {/* Author */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Book author</span>
              </label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
              />
            </div>
            {/* year */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="number"
                placeholder="Year"
                name="year"
                className="input input-bordered w-full max-w-xs"
                onChange={handleChange}
              />
            </div>
            {/* category */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Pick a category</span>
              </label>
              <select
                className="select select-bordered"
                name="category"
                defaultValue="void"
                onChange={handleChange}
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Mathematics</option>
                <option>Computer Science</option>
                <option>Science</option>
              </select>
            </div>
            <div className="inline-flex gap-2">
              {/* image */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Pick a book cover</span>
                </label>
                <input
                  type="text"
                  placeholder="url image"
                  name="image"
                  className="input input-bordered w-full max-w-xs"
                  onChange={handleChange}
                />
              </div>
              {/* path */}
              <div className="form-control w-full max-w-xs mb-2">
                <label className="label">
                  <span className="label-text">Pick a book file</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                  name="path"
                  onChange={handlePath}
                />
              </div>
            </div>
          </div>
          {/* preview */}
          <div className="flex-1">
            <h3 className="text-lg font-bold">Book Preview</h3>
            <p className="py-4">This is gonna looks like.</p>
            <div className="w-auto h-auto">
              <Book {...book} />
            </div>
            <button className="btn mt-2" onClick={addBook}>
              Add Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
