import Link from "next/link";
import { useNotification } from "doom-react-notifications";
import { Theme } from "./Theme";

export const Header = () => {
  const { notificationList, wipeNotifications } = useNotification();

  return (
    <div className="fixed z-50 shadow navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
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
              <a>Configuration</a>
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
        <Theme />
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          {/* split this login in modules, and show a list of all notifications */}
          {/* (maybe is a dumb idea for now.) */}
          <div className="indicator" onClick={wipeNotifications}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item">
              {notificationList.length}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
