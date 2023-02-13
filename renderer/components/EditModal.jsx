import electron from "electron";
import React from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store/store";
import { Book } from "./Book";

const ipcRenderer = electron.ipcRenderer || false;

export const EditModal = ({ trigger_id }) => {
  const { book, categories } = useStore(
    (state) => ({ book: state.selected, categories: state.categories }),
    shallow
  );

  // manage the inputs changes
  const handleChange = (e) => {
    e.preventDefault();
    book[e.target.name] = e.target.value;
  };

  // manage the pdf path
  const handlePath = (e) => {
    e.preventDefault();
    const { path } = e.target.files[0];
    book.path = path;
  };

  // add the book to the local state and the app storage
  const editBook = (e) => {
    e.preventDefault();
    // add to electron storage
    const books = ipcRenderer.sendSync("edit-book", book);
    // add to app state
    useStore.setState({ books });
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
            <h3 className="text-lg font-bold"></h3>
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
                defaultValue={book.title}
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
                defaultValue={book.author}
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
                defaultValue={book.year}
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
                defaultValue=""
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
                defaultValue={book.image}
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
                defaultValue={book.path}
              />
            </div>
            <label
              className="btn mt-2"
              htmlFor={trigger_id}
              // HACK: find a better way to do this
              // disabled={
              //   book.title != "" && book.author != "" && book.path != ""
              //     ? false
              //     : true
              // }
              onClick={editBook}
            >
              Edit Book
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
