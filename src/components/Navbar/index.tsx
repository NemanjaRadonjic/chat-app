import { Link } from "react-router-dom";
import AuthBar from "./AuthBar";
import { IoMdChatbubbles } from "react-icons/io";
const Navbar = () => {
  return (
    <nav className="px-5 py-3 shadow-sm">
      <ul className="flex flex-row items-center justify-between">
        <li className="w-1/3">
          <IoMdChatbubbles size={25} className="fill-blue-600" />
        </li>
        <li className="w-1/3 text-center">
          <Link
            className="duration-400 transition-colors hover:text-blue-700"
            to="/chats"
          >
            Chats
          </Link>
        </li>
        <AuthBar />
      </ul>
    </nav>
  );
};

export default Navbar;
