import axios from "axios";
import React, { useState } from "react";

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
    <div className="card card-side bg-base-200 shadow-md max-h-44 my-2">
      <img src={image} alt="Movie" />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-ellipsis overflow-clip">{description}</p>
        <div className="card-actions justify-end">
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
        <div className="modal-box w-full max-w-full">
          <div className="flex justify-between mt-11">
            <h3 className="text-2xl text-center text-primary-content">
              Google Books
            </h3>
            <label
              className="btn btn-md btn-square right-2 top-2"
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
          <div className="modal-action mb-11">
            <label htmlFor={trigger} className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
