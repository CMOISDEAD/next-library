import electron from "electron";
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
        className="p-2 mt-4 w-52 shadow menu dropdown-content bg-base-100 rounded-box"
      >
        {["light", "dark", "black", "dracula", "gruvbox", "oxocarbon"].map(
          (theme, i) => (
            <li
              key={i}
              onClick={() => {
                useStore.setState({ theme });
                ipcRenderer.send("set-theme", theme);
              }}
            >
              <a>{theme}</a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
