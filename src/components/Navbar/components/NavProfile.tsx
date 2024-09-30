import Avatar from "../../Avatar";

type NavProfileProps = {
  currentUser: { email: string };
  signOut: VoidFunction;
};

const NavProfile = ({ currentUser, signOut }: NavProfileProps) => {
  return (
    <li className="flex gap-4">
      <div className="flex items-center gap-2">
        <div>{currentUser.email}</div>
        <Avatar email={currentUser.email} isOnline={true} />
      </div>
      <button
        className="duration-400 transition-colors hover:text-blue-700"
        onClick={signOut}
      >
        Sign Out
      </button>
    </li>
  );
};

export default NavProfile;
