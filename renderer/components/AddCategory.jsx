import electron from "electron";
import React, { useState } from "react";
import { useStore } from "../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const AddCategory = ({ trigger_id }) => {
  const [category, setCategory] = useState("");
  const { categories } = useStore((state) => ({
    categories: state.categories,
  }));

  const handleChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    useStore.setState({ categories: [...categories, category] });
    ipcRenderer.send("add-categories", category);
  };

  return (
    <>
      <input type="checkbox" id={trigger_id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={trigger_id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add a new category</h3>
          <p className="py-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />
          </p>
          <div className="btn btn-success" onClick={handleSave}>
            Add
          </div>
        </div>
      </div>
    </>
  );
};
