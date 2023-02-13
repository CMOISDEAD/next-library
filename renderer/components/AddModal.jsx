import electron from "electron";
import React, { useState } from "react";
import { Book } from "./Book";
import { useStore } from "../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const AddModal = ({ trigger_id }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "Mathematics",
    path: "",
  });

  const { categories } = useStore((state) => ({
    categories: state.categories,
  }));

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
    const books = ipcRenderer.sendSync("add-book", book);
    // add to app state
    useStore.setState({ books: books });
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
                onChange={handleChange}
              >
                {categories.map((category, i) => (
                  <option value={category} key={i}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
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
          </div>
          {/* preview */}
          <div className="flex-1">
            <h3 className="text-lg font-bold">Book Preview</h3>
            <p className="py-4">This is gonna looks like.</p>
            <div className="max-w-[30vw] h-auto">
              <Book {...book} />
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
            <label
              className="btn mt-2"
              htmlFor={trigger_id}
              // HACK: find a better way to do this
              disabled={
                book.title != "" && book.author != "" && book.path != ""
                  ? false
                  : true
              }
              onClick={addBook}
            >
              Add Book
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
