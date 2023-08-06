"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import PlayerView from "@components/PlayerView";
import CreatorView from "@components/CreatorView";
import { getRoomData, updateRoomData } from "@services/api";
import UserContext from "@store/UserContext";
import Alert from "@components/Alert";

const RoomPage = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true)

  const { user, isChecking, requestFetch, setRequestFetch } = useContext(UserContext);

  useEffect(() => {
    if (initialFetch || requestFetch) {
      getRoomData({
        code: params?.id,
        onSubmit: () => {
          setIsLoading(true);
          setError(null);
        },
        onSuccess: (data) => {
          if (initialFetch) {
            updateRoomData({roomId: data._id, newData: { active: true }})
          }

          setRoomData(data);
          setIsLoading(false);
          setRequestFetch(false)
          setInitialFetch(false)
        },
        onFailed: (response) => {
          if (response.status === 500) {
            setError({ message: response.statusText });
          } else {
            setError({ message: response?.data?.error });
          }
          setIsLoading(false);
          setRequestFetch(false)
          setInitialFetch(false)
        },
      });
    }

    return () => {
      updateRoomData({ roomId: roomData?._id, newData: { active: false } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestFetch]);
  console.log(roomData); //<<************/ Remove this console.log on deploy **********************
  return (
    <section className="container max-w-screen-xl mx-auto">
      <div>Room {params?.id}</div>
      <Alert text="Loading..." show={isLoading || isChecking} variant="ligth" />
      <Alert text={error?.message} show={error} variant="danger" />
      {roomData &&
        !isChecking &&
        (user?.id === roomData.creator?._id ? (
          <CreatorView data={roomData} setRoomData={setRoomData} />
        ) : (
          <PlayerView data={roomData} />
        ))}
    </section>
  );
};

export default RoomPage;
