import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import supabase from "../supabase/client";
import Message from "../components/Message";
import { MessageType } from "../helpers/types";
import { flushSync } from "react-dom";
import Avatar from "../components/Avatar";
import { IoMdSend } from "react-icons/io";
import { messagesWithAvatar } from "../helpers";
import Loader from "../components/Loader";
import ErrorElement from "../components/Error";
import { createMessage, getMessages } from "../helpers/requests";

type PayloadType = {
  new: MessageType;
};

const Chat = () => {
  const onlineIds = useSelector((state: RootState) => state.onlineUsers);
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser?.user.id,
  );
  const { state: recipient } = useLocation();
  const isOnline = onlineIds.includes(recipient.id);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const messagesDivRef = useRef<HTMLDivElement>(null);
  const { chatId } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createMessage(message, currentUserId, chatId);
    setMessage("");
  };

  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload: PayloadType) => {
          flushSync(() =>
            setMessages((prevState) => [...prevState, { ...payload.new }]),
          );
          if (messagesDivRef.current) {
            messagesDivRef.current.scrollTop =
              messagesDivRef.current.scrollHeight;
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await getMessages(chatId);
      setIsLoading(false);
      if (error) {
        setIsError(true);
        throw new Error(error.message);
      } else {
        setMessages(data || []);
      }
    })();
  }, [chatId]);

  const renderMessages = messagesWithAvatar(messages, currentUserId).map(
    (msg) => (
      <Message
        key={msg.id}
        currentUserId={currentUserId}
        message={msg}
        email={recipient?.email}
      />
    ),
  );

  return (
    <div className="mx-auto mt-10 flex h-[calc(100vh-10rem)] w-2/3 flex-col rounded shadow-lg">
      <div className="flex items-center gap-2 p-4">
        <Avatar email={recipient?.email} isOnline={isOnline} />
        <div>{recipient?.email}</div>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="flex grow items-center">
          <ErrorElement>Something went wrong</ErrorElement>
        </div>
      ) : (
        <div
          ref={messagesDivRef}
          className="flex grow flex-col-reverse gap-4 overflow-y-auto scroll-smooth rounded p-4 shadow-inner"
        >
          {renderMessages.reverse()}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Aa"
          className="grow border-t border-blue-100 px-4 focus:outline-none"
          type="text"
        />
        <button
          className="flex items-center gap-2 rounded-br-lg bg-gradient-to-r from-indigo-600 to-blue-500 px-4 py-1 text-white"
          type="submit"
        >
          Send <IoMdSend size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
