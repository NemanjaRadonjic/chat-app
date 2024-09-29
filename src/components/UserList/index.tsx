import User from "./User";
import { UsersType } from "../../helpers/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const UserList = ({
  users,
  onlineIds,
}: {
  users: UsersType;
  onlineIds: string[];
}) => {
  const currentUserId = useSelector<RootState, string>(
    (state) => state.currentUser?.user.id,
  );
  const usersWithOnlineStatus = users.map((user) =>
    onlineIds.includes(user.id)
      ? { ...user, isOnline: true }
      : { ...user, isOnline: false },
  );

  const sortedUsers = usersWithOnlineStatus.sort((a, b) => {
    if (a.isOnline && !b.isOnline) {
      return -1;
    } else if (!a.isOnline && b.isOnline) {
      return 1;
    } else {
      return 0;
    }
  });

  const renderUsers = sortedUsers
    .filter((user) => user.id !== currentUserId)
    .map((user) => (
      <User key={user.id} currentUserId={currentUserId} user={user} />
    ));
  return (
    <div className="mx-auto flex flex-wrap justify-center gap-12 p-14">
      {renderUsers}
    </div>
  );
};

export default UserList;
