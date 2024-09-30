import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import AuthOptions from "./components/AuthOptions";
import NavProfile from "./components/NavProfile";
import { IoIosMenu } from "react-icons/io";
import MobileMenu from "./components/MobileMenu";
import { useState } from "react";
import { signOutAction } from "../../store/reducers/currentUser";

const AuthBar = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const handleClick = () => setMobileMenuActive(true);
  const dispatch = useDispatch();

  const signOut = () => {
    window.localStorage.removeItem("currentUser");
    dispatch(signOutAction());
  };
  return (
    <>
      <ul className="hidden w-1/3 flex-row justify-end gap-4 md:flex">
        {currentUser ? (
          <NavProfile currentUser={currentUser.user} signOut={signOut} />
        ) : (
          <AuthOptions />
        )}
      </ul>
      <li className="flex w-1/3 flex-col md:hidden">
        <IoIosMenu
          onClick={handleClick}
          className="cursor-pointer self-end"
          size={26}
        />
      </li>
      {mobileMenuActive && (
        <MobileMenu
          setActive={setMobileMenuActive}
          email={currentUser?.user.email}
          signOut={signOut}
        />
      )}
    </>
  );
};

export default AuthBar;
