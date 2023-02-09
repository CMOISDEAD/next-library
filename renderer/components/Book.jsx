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
    useStore.setState({
      selected: {
        id,
        image,
        title,
        author,
        year,
        category,
        path,
      },
    });
  };

  // Open the book with an external application
  const handleOpen = (e) => {
    e.preventDefault();
    shell.openExternal(`file://${path}`);
    // Add book to recently list, HACK:
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
        className="my-1 bg-base-200 border border-accent rounded-sm flex flex-col justify-start gap-4 min-w-[12rem] h-[20.5rem] cursor-pointer tooltip hover:border-accent-focus"
        onClick={handleSelect}
        onDoubleClick={handleOpen}
        data-tip={title}
      >
        <img
          src={image}
          alt={`${title} - ${author} book image`}
          className="w-full h-52 object-cover"
        />
        <div className="px-1 mb-1">
          <p className="text-2xl font-bold capitalize truncate">{title}</p>
          <p className="text-sm italic truncate">{author}</p>
          <p className="text-sm italic">{year}</p>
          <div className="flex items-center justify-center content-center gap-4">
            <p className="badge badge-secondary truncate">{category}</p>
          </div>
        </div>
      </div>
    </>
  );
};
