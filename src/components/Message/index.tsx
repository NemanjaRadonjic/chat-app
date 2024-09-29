import { MessageWithAvatarType } from "../../helpers/types";

type MessageProps = {
  message: MessageWithAvatarType;
  currentUserId: string;
  email: string;
};

const Message = ({ message, currentUserId, email }: MessageProps) => {
  const isSelfMessage = currentUserId === message.author;
  return (
    <div
      className={`w-fit ${isSelfMessage ? "self-end" : "self-start"} flex items-center gap-2 rounded`}
    >
      {message.renderAvatar && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-700 shadow-md">
          {email.charAt(0).toUpperCase()}
        </div>
      )}
      <div
        className={`${message.renderAvatar ? "ml-0" : "ml-9"} rounded bg-white px-4 py-1 shadow`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;
