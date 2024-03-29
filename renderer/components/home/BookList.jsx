import electron from "electron";
import { BsBookshelf } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { shallow } from "zustand/shallow";
import { useNotification } from "doom-react-notifications";
import { Book } from "./Book";
import { Toolbar } from "./Toolbar";
import { useStore } from "../../store/store";

const ipcRenderer = electron.ipcRenderer || false;

export const BookList = () => {
  const { categories, books } = useStore(
    (state) => ({
      categories: state.categories,
      books: state.books,
    }),
    shallow
  );
  const { showNotification } = useNotification();

  const handleRemoveCategory = (e) => {
    const { value: category } =
      e.currentTarget.attributes.getNamedItem("data-name");
    const newCategories = ipcRenderer.sendSync("delete-category", category);
    useStore.setState({ categories: newCategories });
    showNotification({
      type: "warning",
      title: "Category deleted",
      message: `${category} successfully removed.`,
    });
  };

  return (
    <>
      <div className="flex gap-4 justify-between content-center items-center">
        <div className="inline-flex gap-2 content-center items-center font-bold text-md">
          <BsBookshelf />
          All books
          <span className="text-sm italic font-normal text-secondary">
            ~ Look all your magic books
          </span>
        </div>
        <Toolbar />
      </div>
      {categories.length ? (
        categories.map((category, i) => {
          return (
            <div key={i}>
              <div className="flex justify-between content-center items-center">
                <div className="my-2 text-sm font-bold underline uppercase">
                  {category}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={handleRemoveCategory}
                  data-name={category}
                >
                  <AiOutlineDelete />
                </div>
              </div>
              <div className="flex overflow-auto flex-row flex-wrap gap-4 justify-start w-full">
                {books.length ? (
                  books
                    .filter((book) => book.category == category)
                    .map((book, i) => {
                      return <Book {...book} key={i} />;
                    })
                ) : (
                  <p className="text-xs italic">
                    No books yet in this category...
                  </p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-3xl font-bold text-center uppercase">
          No categories yet...
        </p>
      )}
    </>
  );
};
