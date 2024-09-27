import { useEffect, useState } from "react";
import supabase from "../supabase/client";
import UserList from "../components/UserList";
import { UsersType } from "../helpers/types";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const fetchUsers = async () => {
  const { data, error } = await supabase.from("users").select();
  return { data, error };
};

const Chats = () => {
  const [users, setUsers] = useState<UsersType>([]);
  const onlineIds = useSelector((state: RootState) => state.onlineUsers);

  useEffect(() => {
    (async () => {
      const response = await fetchUsers();
      if (response.error) {
        console.log(response.error);
      } else {
        setUsers(response.data || []);
      }
    })();
  }, []);

  return (
    <div>
      <UserList onlineIds={onlineIds} users={users} />
    </div>
  );
};

export default Chats;
