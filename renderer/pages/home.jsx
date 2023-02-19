import electron from "electron";
import { useEffect } from "react";
import Head from "next/head";
import { BooksView } from "../components/BooksView";
import { BookList } from "../components/BookList";
import { useStore } from "../store/store";
import { BookPreview } from "../components/BookPreview";

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  // If we use ipcRenderer in this scope, we must check the instance exists
  if (ipcRenderer) {
    // In this scope, the webpack process is the client
  }

  useEffect(() => {
    const books = ipcRenderer.sendSync("get-books") || [];
    const recently = ipcRenderer.sendSync("get-recent") || [];
    const selected = ipcRenderer.sendSync("get-current") || [];
    const theme = ipcRenderer.sendSync("get-theme") || [];
    const categories = ipcRenderer.sendSync("get-categories") || [];
    useStore.setState({
      books,
      recently,
      selected,
      theme,
      categories,
    });
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
      <div className="flex flex-row justify-between">
        <div className="container mx-5">
          <div className="my-2">
            <BooksView />
          </div>
          <div className="mb-2 my-5">
            <BookList />
          </div>
        </div>
        <BookPreview />
      </div>
    </>
  );
}

export default Home;
