import { useDispatch } from "react-redux";
import { signOutAction } from "../../../store/reducers/currentUser";
import Avatar from "../../Avatar";

type CurrentUser = { email: string };

const NavProfile = ({ currentUser }: { currentUser: CurrentUser }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.localStorage.removeItem("currentUser");
    dispatch(signOutAction());
  };

  return (
    <li className="flex gap-4">
      <div className="flex items-center gap-2">
        <div>{currentUser.email}</div>
        <Avatar email={currentUser.email} isOnline={true} />
      </div>
      <button
        className="duration-400 transition-colors hover:text-blue-700"
        onClick={handleClick}
      >
        Sign Out
      </button>
    </li>
  );
};

export default NavProfile;
