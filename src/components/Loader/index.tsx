import { AiOutlineLoading } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex grow items-center justify-center gap-4 overflow-y-auto scroll-smooth rounded p-4 shadow-inner">
      <AiOutlineLoading size={50} className="animate-spin fill-blue-500" />
    </div>
  );
};

export default Loader;
