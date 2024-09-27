import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthOptions from "./components/AuthOptions";
import NavProfile from "./components/NavProfile";

const AuthBar = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  return (
    <ul className="flex flex-row gap-4">
      {currentUser ? (
        <NavProfile currentUser={currentUser.user} />
      ) : (
        <AuthOptions />
      )}
    </ul>
  );
};

export default AuthBar;
