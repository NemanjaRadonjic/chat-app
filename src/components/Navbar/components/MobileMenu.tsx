import { IoMdClose } from "react-icons/io";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";

type MobileMenuProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  signOut: () => void;
};

const MobileMenu = ({ setActive, email, signOut }: MobileMenuProps) => {
  const handleClick = () => {
    setActive(false);
    signOut();
  };

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-10 bg-white">
      <IoMdClose
        onClick={() => setActive(false)}
        className="absolute right-5 top-3 cursor-pointer hover:fill-blue-700"
        size={26}
      />
      {email ? (
        <>
          <Avatar large email={email} isOnline={true} />
          <p>{email}</p>
          <button
            className="transition-colors duration-300 hover:text-blue-500"
            onClick={handleClick}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <li>
            <Link
              onClick={() => setActive(false)}
              className="duration-400 transition-colors hover:text-blue-700"
              to="sign-in"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setActive(false)}
              className="duration-400 transition-colors hover:text-blue-700"
              to="sign-up"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
