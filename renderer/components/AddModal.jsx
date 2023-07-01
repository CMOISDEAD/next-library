import electron from "electron";
import React, { useState } from "react";
import { Book } from "./Book";
import { useStore } from "../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const AddModal = ({ trigger_id }) => {
  const { categories } = useStore((state) => ({
    categories: state.categories,
  }));
  const [book, setBook] = useState({
    title: "",
    description: "",
    author: "",
    category: categories[0] || "",
    path: "",
  });

  // manage the inputs changes
  const handleChange = (e) => {
    e.preventDefault();
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // manage path of the pdf
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
        <div className="flex relative justify-evenly w-8/12 max-w-5xl modal-box">
          <div className="flex-1">
            <label
              htmlFor={trigger_id}
              className="absolute top-2 right-2 btn btn-sm btn-circle"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Edit book metadata</h3>
            <p className="py-4">Edit the metadata of the book.</p>
            {/* title */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">Book title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="w-full max-w-xs input input-bordered"
                onChange={handleChange}
              />
            </div>
            {/* description */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">description</span>
              </label>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                className="w-full max-w-xs input input-bordered"
                onChange={handleChange}
              />
            </div>
            {/* Author */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">Book author</span>
              </label>
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="w-full max-w-xs input input-bordered"
                onChange={handleChange}
              />
            </div>
            {/* year */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="number"
                placeholder="Year"
                name="year"
                className="w-full max-w-xs input input-bordered"
                onChange={handleChange}
              />
            </div>
            {/* category */}
            <div className="w-full max-w-xs form-control">
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
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">Pick a book cover</span>
              </label>
              <input
                type="text"
                placeholder="url image"
                name="image"
                className="w-full max-w-xs input input-bordered"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* preview */}
          <div className="flex-1">
            <h3 className="text-lg font-bold">Book Preview</h3>
            <p className="py-4">This is gonna looks like.</p>
            <div className="h-auto max-w-[30vw]">
              <Book {...book} />
            </div>
            {/* path */}
            <div className="mb-2 w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">Pick a book file</span>
              </label>
              <input
                type="file"
                className="w-full max-w-xs file-input file-input-bordered"
                name="path"
                onChange={handlePath}
              />
            </div>
            <label
              className="mt-2 btn"
              htmlFor={trigger_id}
              // TODO: find a better way to do this, and add a information message.
              disabled={
                book.title != "" &&
                book.author != "" &&
                book.path != "" &&
                book.category != ""
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
