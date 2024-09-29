export type AuthFormType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type AuthFormErrorsType = {
  email?: string | null;
  password: string | null;
  repeatPassword?: string | null;
  main?: string | null;
};

export type UsersType = { id: string; email: string }[];

export type MessageType = {
  chatId: string;
  content: string;
  created_at: string;
  id: string;
  author: string;
};

export interface MessageWithAvatarType extends MessageType {
  renderAvatar?: boolean;
}
