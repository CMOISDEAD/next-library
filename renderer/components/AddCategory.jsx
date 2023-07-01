import electron from "electron";
import { useState } from "react";
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
        <div className="relative modal-box">
          <label
            htmlFor={trigger_id}
            className="absolute top-2 right-2 btn btn-sm btn-circle"
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
              className="w-full max-w-xs input input-bordered"
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
