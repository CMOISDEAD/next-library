import Head from "next/head";
import { BooksView } from "../components/home/BooksView";
import { BookList } from "../components/home/BookList";
import { BookPreview } from "../components/home/BookPreview";

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
