import { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const useForm = () => {
  const [state, setState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  return [state, handleChange] as const;
};

export default useForm;
