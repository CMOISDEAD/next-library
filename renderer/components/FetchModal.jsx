import axios from "axios";
import { useState } from "react";

// Preview book fetched component
const Item = ({
  title,
  authors,
  description,
  categories,
  imageLinks,
  callback,
}) => {
  const image = imageLinks?.thumbnail;

  const handleSelect = (e) => {
    e.preventDefault();
    callback({
      title,
      authors,
      description,
      image,
      category: categories[0],
    });
  };

  return (
    <div className="my-2 max-h-44 shadow-md card card-side bg-base-200">
      <img src={image} alt="Movie" />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-ellipsis overflow-clip">{description}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={handleSelect}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export const FetchModal = ({ trigger, title, callback }) => {
  const [books, setBooks] = useState([]);

  const handleFetch = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&download=pdf&key=AIzaSyAMFUEucH_j-Nu5ZMsgk5pVTasSKzFnd4c`
      )
      .then((res) => {
        const { items } = res.data;
        setBooks(items);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <label htmlFor={trigger} className="btn">
        Scrape book!
      </label>
      <input type="checkbox" id={trigger} className="modal-toggle" />
      <div className="modal">
        <div className="w-full max-w-full modal-box">
          <div className="flex justify-between mt-11">
            <h3 className="text-2xl text-center text-primary-content">
              Google Books
            </h3>
            <label
              className="top-2 right-2 btn btn-md btn-square"
              onClick={handleFetch}
            >
              Fetch
            </label>
          </div>
          <div className="h-auto">
            {books.length > 0
              ? books.map((book, i) => {
                  return (
                    <Item {...book.volumeInfo} key={i} callback={callback} />
                  );
                })
              : "no books"}
          </div>
          <div className="mb-11 modal-action">
            <label htmlFor={trigger} className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
