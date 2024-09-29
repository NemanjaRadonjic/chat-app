import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorElement = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldReload = location.pathname === "/chats";

  const handleClick = () =>
    shouldReload ? window.location.reload() : navigate("/chats");

  return (
    <div className="mx-auto mt-10 flex w-fit flex-col gap-7 rounded px-40 py-8 shadow">
      <div className="text-center">{children}</div>
      <button
        className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 bg-[length:300%] px-5 py-2 shadow-md transition-[background-size] hover:bg-[length:100%]"
        onClick={handleClick}
      >
        {shouldReload ? "Try again" : "Go to chats"}
      </button>
    </div>
  );
};

export default ErrorElement;
