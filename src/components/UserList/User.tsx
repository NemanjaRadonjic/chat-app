import { useNavigate } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Avatar from "../Avatar";
import { createChat, findChat } from "../../helpers/requests";

type UserType = { id: string; email: string; isOnline: boolean };

const User = ({
  user,
  currentUserId,
}: {
  user: UserType;
  currentUserId: string;
}) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const matchedChatId = await findChat(currentUserId, user.id);
    if (matchedChatId) {
      navigate(`/chats/${matchedChatId}`, { state: user });
    } else {
      const chatId = await createChat(currentUserId, user.id);
      navigate(`/chats/${chatId}`, { state: user });
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-10 rounded-md px-6 pb-5 pt-10 shadow"
      key={user.id}
    >
      <Avatar large email={user.email} isOnline={user.isOnline} />
      <p>{user.email}</p>
      <button
        onClick={handleClick}
        className="flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-700 to-blue-500 bg-[length:200%] px-8 py-2 text-white shadow-md transition-[background-size] hover:bg-[length:100%]"
      >
        Chat <IoChatbubbleEllipsesOutline size={20} />
      </button>
    </div>
  );
};

export default User;
