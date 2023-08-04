import { useContext } from "react";
import LoginForm from "./LoginForm";
import UserContext from "@store/UserContext";
import { joinRoom } from "@services/api";

const PlayerLogin = ({ roomId }) => {
//   const [playerReady, setPlayerReady] = useState(false);
  
  const { isLoggedIn, setRequestFetch } = useContext(UserContext)

  // Render wait component
  const renderWait = () => (
    <div className="h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center">
      <span className="text-xl">Waiting for other players</span>
    </div>
  );

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
                setRequestFetch(true)
              },
              onFailed: (error) => {
                console.log({error})
              }
            })
          }}
        />
      ) : (
        renderWait()
      )}
    </section>
  );
};

export default PlayerLogin;
