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
  const [onlineIds, setOnlineIds] = useState<string[]>([]);
  console.log({ users });
  const currentUserId = useSelector<RootState>(
    (state) => state.currentUser?.user.id,
  );

  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        for (const user in channel.presenceState()) {
          // @ts-expect-error 111
          userIds.push(channel.presenceState()[user][0].id);
        }
        setOnlineIds([...new Set(userIds)]);
      })
      .subscribe(async (status) => {
        if (currentUserId && status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            id: currentUserId,
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

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
