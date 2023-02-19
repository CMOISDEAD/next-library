import React from "react";
import { AddModal } from "./AddModal";
import { AddCategory } from "./AddCategory";
import {
  AiOutlineAppstoreAdd,
  AiOutlineFileAdd,
  AiOutlineFilter,
} from "react-icons/ai";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;

export const Toolbar = () => {
  const handleClear = (e) => {
    e.preventDefault();
    ipcRenderer.sendSync("clear-data"); // freeze app
  };

  return (
    <>
      <div className="inline-flex gap-4">
        <label htmlFor="add_category" className="cursor-pointer">
          <AiOutlineAppstoreAdd />
        </label>
        <label htmlFor="add_book" className="cursor-pointer">
          <AiOutlineFileAdd />
        </label>
        <AiOutlineFilter
          onClick={handleClear}
          className="cursor-pointer text-error"
        />
      </div>
      <AddModal trigger_id="add_book" />
      <AddCategory trigger_id="add_category" />
    </>
  );
};
