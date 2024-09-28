import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import supabase from "../supabase/client";
import Message from "../components/Message";
import { MessageType } from "../helpers/types";

type PayloadType = {
  new: MessageType;
};

const createMessage = async (
  content: string,
  author: string,
  chatId: string | undefined,
) => {
  const { error } = await supabase
    .from("messages")
    .insert({ content, chatId, author });
  return error ? error : null;
};

const getMessages = async (chatId: string | undefined) => {
  const { data } = await supabase
    .from("messages")
    .select()
    .eq("chatId", chatId);
  return data;
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
          setMessages((prevState) => [...prevState, { ...payload.new }]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getMessages(chatId);
      setMessages(response || []);
    })();
  }, [chatId]);

  const renderMessages = messages.map((msg) => (
    <Message key={msg.id} currentUserId={currentUserId} message={msg} />
  ));

  return (
    <div className="mx-auto mt-10 flex h-[calc(100vh-10rem)] w-1/2 flex-col gap-5 rounded bg-gradient-to-t from-neutral-100 to-blue-100 p-4 shadow-md">
      <div className="text-center">
        You are chatting with {recipient?.email}{" "}
        {isOnline ? "is online" : "is offline"}
      </div>
      <div className="flex grow flex-col gap-4 rounded p-4 shadow-md">
        {renderMessages}
      </div>
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
