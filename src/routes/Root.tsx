import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import supabase from "../supabase/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setOnlineUsers } from "../store/reducers/onlineUsers";

const Root = () => {
  const currentUserId = useSelector<RootState>(
    (state) => state.currentUser?.user.id,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const channel = supabase.channel(`general`);
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        for (const user in channel.presenceState()) {
          // @ts-expect-error 111
          const id = channel.presenceState()[user][0].id;
          if (currentUserId !== id) {
            userIds.push(id);
          }
        }
        dispatch(setOnlineUsers(userIds));
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
  }, [currentUserId, dispatch]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
