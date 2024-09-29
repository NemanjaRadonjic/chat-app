import { MessageWithAvatarType } from "./types";

export const messagesWithAvatar = (
  messages: MessageWithAvatarType[],
  currentUserId: string,
) => {
  const messagesCopy = [...messages];
  let newMessages: MessageWithAvatarType[] = [];
  let previousAuthorId = "";
  messagesCopy.reverse().map((msg, i) => {
    if (i === 0) {
      if (msg.author !== currentUserId) {
        newMessages = [...newMessages, { ...msg, renderAvatar: true }];
      } else {
        newMessages = [...newMessages, msg];
      }
    } else {
      if (msg.author === currentUserId) {
        newMessages = [...newMessages, msg];
      } else {
        if (previousAuthorId === msg.author) {
          newMessages = [...newMessages, msg];
        } else {
          newMessages = [...newMessages, { ...msg, renderAvatar: true }];
        }
      }
    }
    previousAuthorId = msg.author;
  });
  return newMessages.reverse();
};
