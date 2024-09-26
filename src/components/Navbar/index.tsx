import { Link } from "react-router-dom";
import AuthBar from "./AuthBar";

const Navbar = () => {
  return (
    <nav className="p-4 shadow-sm">
      <ul className="flex flex-row justify-between">
        <li>Logo</li>
        <li>
          <Link to="/chats">Chats</Link>
        </li>
        <AuthBar />
      </ul>
    </nav>
  );
};

export default Navbar;
