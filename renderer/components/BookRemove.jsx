import electron from "electron";
import { useStore } from "../store/store";
import { useNotification } from "doom-react-notifications";

const ipcRenderer = electron.ipcRenderer || false;

export const BookRemove = ({ id, title }) => {
  const { showNotification } = useNotification();
  const trigger = `remove_book_${title}`;

  const handleRemove = (e) => {
    e.preventDefault();
    const { books, recent } = ipcRenderer.sendSync("remove-book", id);
    ipcRenderer.send("add-current", {});
    useStore.setState({ books, selected: {}, recently: recent });
    showNotification({
      type: "warning",
      title: "Book deleted",
      message: `${title} successfully added.`,
    });
  };

  return (
    <>
      <input type="checkbox" id={trigger} className="modal-toggle" />
      <div className="modal">
        <div className="relative modal-box">
          <label
            htmlFor={trigger}
            className="absolute top-2 right-2 btn btn-sm btn-circle"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-error">
            Are you sure to delete {title} ?
          </h3>
          <p className="py-4 text-warning">
            Be carefull if you delete this book, you can get it back!
          </p>
          <label
            className="mt-2 btn btn-warning"
            htmlFor={trigger}
            onClick={handleRemove}
          >
            Remove book
          </label>
        </div>
      </div>
    </>
  );
};
