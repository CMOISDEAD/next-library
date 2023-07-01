import { useState } from "react";
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
  const [isVisible, setVisible] = useState(false);
  const { book } = useStore((state) => ({ book: state.selected }), shallow);
  const { image, title, description, author, year, category } = book;

  const handleChange = (e) => {
    e.preventDefault();
    setVisible(!isVisible);
  };

  return (
    <div className={`${isVisible ? "w-[25rem]" : "w-7"} transition-all shadow`}>
      <div className="fixed p-2 bg-base-200">
        <div className="flex gap-4 justify-between">
          <p className="link" onClick={handleChange}>
            {isVisible ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
          </p>
          {/* NOTE: Hide this options when no books is on preview. */}
          <BookOptions book={book} />
        </div>
        <div
          className={`my-2 ${isVisible ? "visible" : "invisible"} min-h-screen`}
        >
          {title ? (
            <div className="w-72">
              <div className="flex flex-row justify-center content-center items-center">
                <img src={image} alt={title} className="h-[50vh]" />
              </div>
              <p className="py-1 font-bold text-center text-md truncate">
                {title}
              </p>
              <p className="overflow-y-scroll py-1 text-sm h-[15vh]">
                {description}
              </p>
              <div className="divider"></div>
              <div className="text-sm">
                <div className="inline-flex gap-1 content-center items-center">
                  <AiOutlineUser />
                  <p className="font-bold">Author: </p>
                  <p className="link">{author}</p>
                </div>
                <br />
                <div className="inline-flex gap-1 content-center items-center">
                  <AiOutlineGold />
                  <p className="font-bold">Category: </p>
                  {category}
                </div>
                <br />
                <div className="inline-flex gap-1 content-center items-center">
                  <AiOutlineCalendar />
                  <p className="font-bold">Year: </p>
                  {year}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-72">
              <p className="pt-5 font-bold text-center">
                no book to preview...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
