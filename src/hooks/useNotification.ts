import { useEffect, useState } from "react";

const useNotification = () => {
  const [state, setState] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (state) {
        setState(false);
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);
  return [state, setState] as const;
};

export default useNotification;
