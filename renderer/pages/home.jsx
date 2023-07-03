import Head from "next/head";
import { BooksView } from "../components/BooksView";
import { BookList } from "../components/BookList";
import { BookPreview } from "../components/BookPreview";

function Home() {
  return (
    <>
      <Head>
        <title>Next Library</title>
      </Head>
      <div className="flex flex-row justify-between">
        <div className="container mx-5">
          <div className="my-2">
            <BooksView />
          </div>
          <div className="my-5 mb-2">
            <BookList />
          </div>
        </div>
        <BookPreview />
      </div>
    </>
  );
}

export default Home;
