import electron from "electron";
import { useEffect } from "react";
import Head from "next/head";
import { BooksView } from "../components/BooksView";
import { BookList } from "../components/BookList";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { BookPreview } from "../components/BookPreview";

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  const { books, recently } = useStore(
    (state) => ({ books: state.books, recently: state.recently }),
    shallow
  );

  // If we use ipcRenderer in this scope, we must check the instance exists
  if (ipcRenderer) {
    // In this scope, the webpack process is the client
  }

  useEffect(() => {
    useStore.setState({ books: ipcRenderer.sendSync("get-books") });
    useStore.setState({ recently: ipcRenderer.sendSync("get-recent") });
    return () => {
      // unregister it, when unmount the component
      // ipcRenderer.removeAllListeners("ping-pong");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Reishi</title>
      </Head>
      <div className="flex flex-row justify-between gap-1">
        <div className="container mx-5">
          <div className="my-2">
            <BooksView books={recently} />
          </div>
          <div className="mb-2 my-5">
            <BookList books={books} />
          </div>
        </div>
        <BookPreview />
      </div>
    </>
  );
}

export default Home;
