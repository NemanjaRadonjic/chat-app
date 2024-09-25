import { Link } from "react-router-dom";
import AuthBar from "./AuthBar";

const Navbar = () => {
  return (
    <nav>
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
