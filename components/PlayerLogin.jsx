import { useContext } from "react";
import LoginForm from "./LoginForm";
import UserContext from "@store/UserContext";
import { joinRoom } from "@services/api";
import { SocketContext } from "@websocket";

const PlayerLogin = ({ roomId }) => {
  //   const [playerReady, setPlayerReady] = useState(false);

  const { isLoggedIn, setRequestFetch, user, isChecking } =
    useContext(UserContext);
    const socket = useContext(SocketContext);

  return (
    <section className="flex items-center justify-center m-24 py-24 absolute top-0">
      {!isLoggedIn ? (
        <LoginForm
          label="Input your Username"
          placeholder="Username"
          onSuccess={(user) => {
            joinRoom({
              roomId,
              userId: user._id,
              onSuccess: () => {
                setRequestFetch(true);
                socket.emit(GAME_TOPIC, { creatorRequestFetch: true})
              },
              onFailed: (error) => {
                console.log({ error });
              },
            });
          }}
        />
      ) : (
        !isChecking &&
        joinRoom({
          roomId,
          userId: user?.id,
          onSuccess: () => {
            setRequestFetch(true);
            socket.emit(GAME_TOPIC, { creatorRequestFetch: true})
          },
          onFailed: (error) => {
            console.log({ error });
          },
        })
      )}
    </section>
  );
};

export default PlayerLogin;
