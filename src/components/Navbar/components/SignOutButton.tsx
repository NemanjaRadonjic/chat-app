import { useDispatch } from "react-redux";
import { signOutAction } from "../../../store/reducers/currentUser";

const SignOutButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    window.localStorage.removeItem("currentUser");
    dispatch(signOutAction());
  };

  return (
    <li>
      <button onClick={handleClick}>Sign Out</button>
    </li>
  );
};

export default SignOutButton;
