import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Chat = () => {
  const onlineIds = useSelector((state: RootState) => state.onlineUsers);
  const { state: recipient } = useLocation();
  const isOnline = onlineIds.includes(recipient.id);
  const [message, setMessage] = useState("");
  const { chatId } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto mt-10 flex h-[calc(100vh-10rem)] w-1/2 flex-col gap-5 rounded bg-gradient-to-t from-neutral-100 to-blue-100 p-4 shadow-md">
      <div className="text-center">
        You are chatting with {recipient?.email}{" "}
        {isOnline ? "is online" : "is offline"}
      </div>
      <div className="grow rounded shadow-md"></div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="grow px-4 shadow-md"
          type="text"
        />
        <button
          className="from-accent bg-gradient-to-r to-blue-500 px-4 py-1"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
