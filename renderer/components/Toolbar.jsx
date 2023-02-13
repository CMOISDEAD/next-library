import React from "react";
import { AddModal } from "./AddModal";
import { AddCategory } from "./AddCategory";
import {
  AiOutlineAppstoreAdd,
  AiOutlineFileAdd,
  AiOutlineFilter,
} from "react-icons/ai";

export const Toolbar = () => {
  return (
    <>
      <div className="inline-flex gap-4">
        <label htmlFor="add_category" className="cursor-pointer">
          <AiOutlineAppstoreAdd />
        </label>
        <label htmlFor="add_book" className="cursor-pointer">
          <AiOutlineFileAdd />
        </label>
        <AiOutlineFilter />
      </div>
      <AddModal trigger_id="add_book" />
      <AddCategory trigger_id="add_category" />
    </>
  );
};
