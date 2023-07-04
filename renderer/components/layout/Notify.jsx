import { AiOutlineInfoCircle } from "react-icons/ai";

export const Notify = ({ type, title, message, onClick }) => {
  const notificationStyles = {
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
    info: "alert-info",
  };

  return (
    <div
      className={`my-2 cursor-pointer alert ${notificationStyles[type]}`}
      onClick={onClick}
    >
      <div>
        <AiOutlineInfoCircle className="text-2xl" />
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{message}</div>
        </div>
      </div>
    </div>
  );
};
