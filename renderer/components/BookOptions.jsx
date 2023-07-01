import { BookRemove } from "./BookRemove";
import { EditModal } from "./EditModal";
import { RxDotsHorizontal } from "react-icons/rx";

export const BookOptions = ({ book }) => {
  const { id, title } = book;

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className="m-1 cursor-pointer badge badge-ghost hover:bg-info-content hover:text-primary-focus"
      >
        <RxDotsHorizontal />
      </label>
      <ul
        tabIndex={0}
        className="p-2 w-52 shadow dropdown-content menu bg-base-100 rounded-box"
      >
        <li>
          <label htmlFor={`remove_book_${title}`}>Delete Book</label>
        </li>
        <li>
          <label htmlFor="edit_book">Edit Metadata</label>
        </li>
      </ul>
      <BookRemove id={id} title={title} />
      <EditModal trigger_id="edit_book" selectBook={book} />
    </div>
  );
};
