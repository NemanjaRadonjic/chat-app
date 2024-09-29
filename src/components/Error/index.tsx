import { useNavigate } from "react-router-dom";

const Error = ({ msg }: { msg: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chats");
  };

  return (
    <div className="mx-auto mt-10 flex w-fit flex-col gap-4 rounded px-40 py-8 shadow">
      <div className="text-center">{msg}</div>
      <button
        className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 bg-[length:300%] px-5 py-2 shadow-md transition-[background-size] hover:bg-[length:100%]"
        onClick={handleClick}
      >
        Go to chats
      </button>
    </div>
  );
};

export default Error;
