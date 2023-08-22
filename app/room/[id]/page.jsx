"use client";
import { useParams } from "next/navigation";
import PlayerView from "@components/PlayerView";
import CreatorView from "@components/CreatorView";
import { SocketContext, socket } from "@websocket";
import { useContext, useEffect, useState } from "react";
import { getRoomData, updateRoomData } from "@services/api";
import UserContext from "@store/UserContext";
import Alert from "@components/Alert";
import gameBg from "@assets/images/game-bg.jpg";
import MessageWrapper from "@components/MessageWrapper";
import FacebookLoading from "@components/Loading/FacebookLoading";
import Glass from "@components/Glass";

const RoomPage = () => {
  const mainStyle = {
    backgroundImage: `url('${gameBg.src}')`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true);

  const { user, isChecking, requestFetch, setRequestFetch } =
    useContext(UserContext);

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
            updateRoomData({ roomId: data._id, newData: { active: true } });
            // document.addEventListener('contextmenu', event => event.preventDefault());
          }

          setRoomData(data);
          setIsLoading(false);
          setRequestFetch(false);
          setInitialFetch(false);
        },
        onFailed: (response) => {
          if (response.status === 500) {
            setError({ message: response.statusText });
          } else {
            setError({ message: response?.data?.error });
          }
          setIsLoading(false);
          setRequestFetch(false);
          setInitialFetch(false);
        },
      });
    }

  }, [requestFetch]);

  return (
    <SocketContext.Provider value={socket}>
      <section className="min_h_occupied" style={mainStyle}>
        <section className="container max-w-screen-xl mx-auto">
          {((initialFetch && isLoading) || isChecking) && (
            <MessageWrapper className="justify-center flex-col fixed z-50 right-0 left-0">
              <FacebookLoading />
              <Alert
                text={
                  isChecking ? "Checking user..." : isLoading && "Loading..."
                }
                show={isLoading || isChecking}
                variant="ligth"
              />
            </MessageWrapper>
          )}
          {error && (
            <MessageWrapper className="justify-center fixed z-50 right-0 left-0">
              <Glass className="p-8" opacity={0.3}>
                <Alert
                  text={error?.message || "Something went wrong!"}
                  show={error}
                  variant="danger"
                />
              </Glass>
            </MessageWrapper>
          )}
          {roomData &&
            !isChecking &&
            (user?.id === roomData.creator?._id ? (
              <CreatorView data={roomData} setRoomData={setRoomData} />
            ) : (
              <PlayerView data={roomData} />
            ))}
        </section>
      </section>
    </SocketContext.Provider>
  );
};

export default RoomPage;
