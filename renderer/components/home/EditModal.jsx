import electron from "electron";
import { shallow } from "zustand/shallow";
import { useStore } from "../../store/store";
import { Book } from "./Book";
import { useNotification } from "doom-react-notifications";

const ipcRenderer = electron.ipcRenderer || false;

export const EditModal = ({ trigger_id }) => {
  const { book, categories } = useStore(
    (state) => ({ book: state.selected, categories: state.categories }),
    shallow
  );
  const { showNotification } = useNotification();

  // manage the inputs changes
  const handleChange = (e) => {
    e.preventDefault();
    book[e.target.name] = e.target.value;
  };

  // manage the pdf path
  const handlePath = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files[0]) return;
    const { path } = files[0];
    book.path = path;
  };

  // add the book to the local state and the app storage
  const editBook = (e) => {
    e.preventDefault();
    const books = ipcRenderer.sendSync("edit-book", book);
    useStore.setState({ books });
    showNotification({
      type: "success",
      title: "Book updated",
      message: `${book.title} successfully updated.`,
    });
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
            <h3 className="text-lg font-bold"></h3>
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
                defaultValue={book.title}
              />
            </div>
            {/* description */}
            <div className="w-full max-w-xs form-control">
              <label className="label">
                <span className="label-text">Book Description</span>
              </label>
              <input
                type="text"
                placeholder="Description"
                name="description"
                className="w-full max-w-xs input input-bordered"
                onChange={handleChange}
                defaultValue={book.description}
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
                defaultValue={book.author}
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
                defaultValue={book.year}
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
                defaultValue={book.image}
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
            <label className="mt-2 btn" htmlFor={trigger_id} onClick={editBook}>
              Edit Book
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
