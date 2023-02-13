import electron from "electron";
import React from "react";
import { useStore } from "../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const Theme = () => {
  const { current } = useStore((state) => ({ current: state.theme }));
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost rounded-btn">
        {current}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        {[
          "black",
          "dark",
          "retro",
          "cyberpunk",
          "luxury",
          "dracula",
          "forest",
          "coffe",
          "winter",
          "synthwave",
        ].map((theme, i) => (
          <li
            key={i}
            onClick={() => {
              useStore.setState({ theme });
              ipcRenderer.send("set-theme", theme);
            }}
          >
            <a>{theme}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
