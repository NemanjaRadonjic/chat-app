type UserType = { id: string; email: string; isOnline: boolean };

const User = ({ user }: { user: UserType }) => {
  return (
    <div
      className="flex flex-col items-center gap-5 rounded-md border border-purple-100 px-5 py-10 shadow-sm"
      key={user.id}
    >
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 text-4xl">
        <div>{user.email.charAt(0).toUpperCase()}</div>
        <div
          className={`absolute bottom-0 right-3 h-6 w-6 rounded-full ${user.isOnline ? "bg-green-400" : "bg-slate-400"}`}
        />
      </div>
      <p>{user.email}</p>
      <button className="from-accent rounded-full bg-gradient-to-r to-blue-500 bg-[length:300%] px-5 py-2 shadow-md transition-[background-size] hover:bg-[length:100%]">
        Chat
      </button>
    </div>
  );
};

export default User;
