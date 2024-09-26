import User from "./User";
import { UsersType } from "../../helpers/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const UserList = ({ users }: { users: UsersType }) => {
  const currentUserId = useSelector<RootState>(
    (state) => state.currentUser?.user.id,
  );

  const renderUsers = users
    .filter((user) => user.id !== currentUserId)
    .map((user) => <User key={user.id} user={user} />);
  return <div className="flex gap-12 p-14">{renderUsers}</div>;
};

export default UserList;
