"use client";
import { useParams, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import PlayerView from "@components/PlayerView";
import CreatorView from "@components/CreatorView";

const RoomPage = () => {
  const params = useParams();
  const router = useRouter();

  const isPlayer = false

  useEffect(() => {
    const checkSession = async () => {
        const session = await getSession()
        if (!session?.user) {
            router.push("/");
          }
    }

    checkSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  return (
    <>
      <div>Room {params?.id}</div>
      {isPlayer ? <PlayerView /> : <CreatorView />}
    </>
  )
;
};

export default RoomPage;
