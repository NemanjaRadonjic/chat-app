export type AuthFormType = {
  username?: string;
  email?: string;
  emailOrUsername?: string;
  password: string;
  repeatPassword?: string;
};

export type AuthFormErrorsType = {
  username?: string | null;
  email?: string | null;
  emailOrUsername?: string | null;
  password: string | null;
  repeatPassword?: string | null;
};
