import UserList from "../components/UserList";
import { UsersType } from "../helpers/types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import { useLoaderData } from "react-router-dom";

type LoaderData = {
  data: UsersType;
  error: {
    message: string;
  };
};

const Chats = () => {
  const { data: users, error } = useLoaderData() as LoaderData;
  const onlineIds = useSelector((state: RootState) => state.onlineUsers);

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
      <UserList onlineIds={onlineIds} users={users} />
    </div>
  );
};

export default Chats;
