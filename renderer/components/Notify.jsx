export const Notify = ({ type, title, message, onClick }) => {
  return (
    <div
      className={`my-2 alert alert-${type.toLowerCase()} cursor-pointer`}
      onClick={onClick}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="flex-shrink-0 w-6 h-6 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{message}</div>
        </div>
      </div>
    </div>
  );
};
