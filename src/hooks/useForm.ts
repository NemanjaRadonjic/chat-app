import { useState } from "react";
import { AuthFormType } from "../helpers/types";

const useForm = (initialState: AuthFormType) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  return [state, handleChange] as const;
};

export default useForm;
