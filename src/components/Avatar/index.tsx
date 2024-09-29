interface AvatarProps {
  large?: boolean;
  email: string;
  isOnline?: boolean;
}

const Avatar = ({ large, email, isOnline }: AvatarProps) => {
  return (
    <div
      className={`relative flex ${large ? "h-24 w-24 text-4xl" : "h-9 w-9 text-xl"} items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-700 shadow-md`}
    >
      <div>{email.charAt(0).toUpperCase()}</div>
      <i
        className={`absolute bottom-0 ${large ? "right-3 h-6 w-6" : "right-0 h-3 w-3"} rounded-full border border-white ${isOnline ? "bg-gradient-to-br from-green-400 to-green-600" : "bg-gradient-to-br from-gray-200 to-gray-300"}`}
      />
    </div>
  );
};

export default Avatar;
