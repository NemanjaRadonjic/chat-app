const Toast = ({ msg, error }: { msg: string; error?: boolean }) => {
  return (
    <div
      className={`absolute bottom-10 right-10 ${error ? "bg-red-500" : "bg-blue-500"} rounded px-4 py-2 shadow`}
    >
      {msg}
    </div>
  );
};

export default Toast;
