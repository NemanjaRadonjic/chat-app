import supabase from "../supabase/client";

export const getMessages = async (chatId: string | undefined) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .eq("chatId", chatId);
    return { data, error };
  } catch (err) {
    return { data: null, err };
  }
};

export const createMessage = async (
  content: string,
  author: string,
  chatId: string | undefined,
) => {
  try {
    const { error } = await supabase
      .from("messages")
      .insert({ content, chatId, author });
    return error ? error : null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const createChat = async (initiator: string, reciever: string) => {
  const { data } = await supabase
    .from("chats")
    .insert({ members: [initiator, reciever] })
    .select();

  return data ? data[0].id : null;
};

export const findChat = async (initiator: string, reciever: string) => {
  const { data: matchedChat } = await supabase
    .from("chats")
    .select()
    .contains("members", JSON.stringify([initiator, reciever]));

  return matchedChat?.length ? matchedChat[0].id : null;
};
