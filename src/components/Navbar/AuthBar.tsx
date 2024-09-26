import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SignOutButton from "./components/SignOutButton";
import AuthOptions from "./components/AuthOptions";

const AuthBar = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return (
    <ul className="flex flex-row gap-4">
      {currentUser ? <SignOutButton /> : <AuthOptions />}
    </ul>
  );
};

export default AuthBar;
