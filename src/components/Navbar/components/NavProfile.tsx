import { useDispatch } from "react-redux";
import { signOutAction } from "../../../store/reducers/currentUser";

type CurrentUser = { email: string };

const NavProfile = ({ currentUser }: { currentUser: CurrentUser }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.localStorage.removeItem("currentUser");
    dispatch(signOutAction());
  };

  return (
    <li className="flex gap-6">
      <div>{currentUser.email}</div>
      <button onClick={handleClick}>Sign Out</button>
    </li>
  );
};

export default NavProfile;
