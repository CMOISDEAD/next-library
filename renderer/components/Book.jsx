import electron from "electron";
import React from "react";
import { useStore } from "../store/store";

const shell = electron.shell;
const ipcRenderer = electron.ipcRenderer || false;

export const Book = ({ id, image, title, author, year, category, path }) => {
  const { recently } = useStore((state) => ({ recently: state.recently }));

  // Select book to show on preview section
  const handleSelect = (e) => {
    e.preventDefault();
    const book = {
      id,
      image,
      title,
      author,
      year,
      category,
      path,
    };
    useStore.setState({
      selected: book,
    });
    ipcRenderer.send("add-current", book);
  };

  // Open the book with an external application
  const handleOpen = (e) => {
    e.preventDefault();
    shell.openExternal(`file://${path}`);
    // Add book to recently list, HACK: this function need a refactor!!
    const book = { id, image, title, author, year, category, path };
    const new_recent = [...recently];
    const exist = new_recent.find((element) => element.id == id);
    if (exist) {
      new_recent = new_recent.filter((element) => element.id != id);
    }
    new_recent.unshift(book);
    if (new_recent.length > 4) new_recent.pop();
    useStore.setState(() => ({
      recently: [...new_recent],
    }));
    ipcRenderer.send("add-recent", [...new_recent]);
  };

  return (
    <>
      <div
        className="my-1 bg-base-200 border border-accent rounded-sm flex flex-col justify-start gap-4 w-[15rem] h-[21.5rem] cursor-pointer tooltip shadow-md hover:shadow-xl transition-all"
        onClick={handleSelect}
        onDoubleClick={handleOpen}
        data-tip={title}
      >
        <img
          src={image}
          alt={`${title} - ${author} book image`}
          className="w-full h-full object-fill"
        />
      </div>
    </>
  );
};
