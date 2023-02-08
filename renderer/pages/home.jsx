import electron from "electron";
import { useEffect } from "react";
import Head from "next/head";
import { BooksView } from "../components/BooksView";
import { BookList } from "../components/BookList";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  const { books } = useStore((state) => ({ books: state.books }), shallow);

  // If we use ipcRenderer in this scope, we must check the instance exists
  if (ipcRenderer) {
    // In this scope, the webpack process is the client
  }

  useEffect(() => {
    useStore.setState({ books: ipcRenderer.sendSync("get-books") });
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
      <div className="my-2">
        <BooksView books={books} />
      </div>
      <div className="mb-2 my-5">
        <BookList books={books} />
      </div>
    </>
  );
}

export default Home;
