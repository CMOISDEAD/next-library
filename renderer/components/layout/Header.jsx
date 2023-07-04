import Link from "next/link";
import { AiOutlineBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useNotification } from "doom-react-notifications";

export const Header = () => {
  const { notificationList, wipeNotifications } = useNotification();

  return (
    <div className="fixed z-50 shadow navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <AiOutlineMenu className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 w-52 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
          >
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <a>Authors</a>
            </li>
            <li>
              <Link href="/config">Configuration</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/home">
          <p className="text-xl normal-case btn btn-ghost">Next Library</p>
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <AiOutlineSearch className="text-2xl" />
        </button>
        <button className="btn btn-ghost btn-circle">
          {/* split this login in modules, and show a list of all notifications */}
          {/* (maybe is a dumb idea for now.) */}
          <div className="indicator" onClick={wipeNotifications}>
            <AiOutlineBell className="text-2xl" />
            <span className="badge badge-xs badge-primary indicator-item">
              {notificationList.length}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
