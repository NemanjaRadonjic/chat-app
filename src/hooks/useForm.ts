import { useState } from "react";

export type InitialStateType = {
  username?: string;
  email?: string;
  emailOrUsername?: string;
  password: string;
  repeatPassword?: string;
};

const useForm = (initialState: InitialStateType) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  return [state, handleChange] as const;
};

export default useForm;
