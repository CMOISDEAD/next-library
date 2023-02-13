import React, { useState } from "react";
import { useStore } from "../store/store";
import { BookOptions } from "./BookOptions";
import { shallow } from "zustand/shallow";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineGold,
} from "react-icons/ai";

export const BookPreview = () => {
  const [isVisible, setVisible] = useState(true);
  const { book } = useStore((state) => ({ book: state.selected }), shallow);
  const { image, title, author, year, category } = book;
  const style = isVisible ? "w-4/12" : "w-[2vw]";

  const handleChange = (e) => {
    e.preventDefault();
    setVisible(!isVisible);
  };

  return (
    <div className={`bg-base-200 ${style} transition-all shadow`}>
      <div className="fixed p-2 bg-base-200">
        <div className="flex gap-4 justify-between">
          <p className="link" onClick={handleChange}>
            {isVisible ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
          </p>
          <BookOptions book={book} />
        </div>
        <div
          className={`my-2 ${isVisible ? "visible" : "invisible"} min-h-screen`}
        >
          <div className="flex flex-row content-center items-center justify-center">
            <img src={image} alt={title} className="h-[50vh]" />
          </div>
          <p className="text-md text-center font-bold pt-2 text-ellipsis">
            {title}
          </p>
          <p className="text-sm pt-3 h-[12vh] overflow-hidden">
            Elit repellendus modi eos rem quam ipsum, distinctio at laboriosam?
            Ab sint praesentium sit porro expedita Voluptate eum excepturi id
            iure architecto Eligendi dolorem error quaerat obcaecati esse
            Sapiente quos
          </p>
          <div className="divider"></div>
          <div className="text-sm">
            <div className="inline-flex content-center items-center gap-1">
              <AiOutlineUser />
              <p className="font-bold">Author: </p>
              <p className="link">{author}</p>
            </div>
            <br />
            <div className="inline-flex content-center items-center gap-1">
              <AiOutlineGold />
              <p className="font-bold">Category: </p>
              {category}
            </div>
            <br />
            <div className="inline-flex content-center items-center gap-1">
              <AiOutlineCalendar />
              <p className="font-bold">Year: </p>
              {year}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
