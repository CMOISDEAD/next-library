import React, { useState } from "react";
import { useStore } from "../store/store";

export const BookPreview = () => {
  const [isVisible, setVisible] = useState(true);
  const style = isVisible ? "w-4/12" : "w-[2vw]";
  const { book } = useStore((state) => ({ book: state.selected }));
  const { image, title, author, year, category } = book;

  const handleChange = (e) => {
    e.preventDefault();
    setVisible(!isVisible);
  };

  return (
    <div className={` bg-base-200 relative ${style} transition-all`}>
      <div className="fixed p-2 bg-base-200">
        <p className="link" onClick={handleChange}>
          {isVisible ? ">" : "<"}
        </p>
        <div className={`my-2 ${isVisible ? "visible" : "invisible"}`}>
          <div className="flex flex-row content-center items-center justify-center">
            <img src={image} alt={title} className="h-[50vh]" />
          </div>
          <p className="text-xl text-center font-bold pt-2">{title}</p>
          <p className="text-sm pt-3 h-[12vh] overflow-hidden">
            Elit repellendus modi eos rem quam ipsum, distinctio at laboriosam?
            Ab sint praesentium sit porro expedita Voluptate eum excepturi id
            iure architecto Eligendi dolorem error quaerat obcaecati esse
            Sapiente quos
          </p>
          <div className="divider"></div>
          <div className="text-sm">
            <p>
              <span className="font-bold">Author: </span>
              <span className="link">{author}</span>
            </p>
            <p>
              <span className="font-bold">Category: </span>
              {category}
            </p>
            <p>
              <span className="font-bold">Year: </span>
              {year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
