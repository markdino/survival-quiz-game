import { useContext } from "react";
import LoginForm from "./LoginForm";
import UserContext from "@store/UserContext";
import { joinRoom } from "@services/api";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import Glass from "./Glass";

const PlayerLogin = ({ roomId }) => {
  const { isLoggedIn, setRequestFetch, user, isChecking } =
    useContext(UserContext);
  const socket = useContext(SocketContext);

  return (
    <>
      {!isLoggedIn ? (
        <Glass
          opacity={0.5}
          className="flex items-center justify-center mt-32 p-16 absolute top-0"
        >
          <LoginForm
            label="Input your Username"
            placeholder="Username"
            onSuccess={(user) => {
              joinRoom({
                roomId,
                userId: user._id,
                onSuccess: () => {
                  setRequestFetch(true);
                  socket.emit(GAME_TOPIC, {
                    creatorRequestFetch: true,
                    roomId,
                  });
                  console.log("join success", { roomId });
                },
                onFailed: (error) => {
                  console.log({ error });
                },
              });
            }}
          />
        </Glass>
      ) : (
        !isChecking &&
        user &&
        joinRoom({
          roomId,
          userId: user?.id,
          onSuccess: () => {
            setRequestFetch(true);
            socket.emit(GAME_TOPIC, { creatorRequestFetch: true, roomId });
          },
          onFailed: (error) => {
            console.log({ error });
          },
        })
      )}
    </>
  );
};

export default PlayerLogin;
