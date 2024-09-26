export type AuthFormType = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignUpType = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignInType = {
  email: string;
  password: string;
};

export type AuthFormErrorsType = {
  username?: string | null;
  email?: string | null;
  password: string | null;
  repeatPassword?: string | null;
  main?: string | null;
};
