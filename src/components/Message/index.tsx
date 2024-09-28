import { MessageType } from "../../helpers/types";

type MessageProps = {
  message: MessageType;
  currentUserId: string;
};

const Message = ({ message, currentUserId }: MessageProps) => {
  const isSelfMessage = currentUserId === message.author;
  return (
    <div
      className={`w-fit ${isSelfMessage ? "self-start" : "self-end"} rounded bg-white px-4 py-1 shadow-sm`}
    >
      {message.content}
    </div>
  );
};

export default Message;
