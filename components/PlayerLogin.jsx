import { useState } from "react";
import LoginForm from "./LoginForm";

const PlayerLogin = ({ loginPlayer }) => {
  const [playerReady, setPlayerReady] = useState(false);

  // Render wait component
  const renderWait = () => (
    <div className="h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center">
      <span className="text-xl">Waiting for other players</span>
    </div>
  );

  return (
    <section className="flex items-center justify-center m-24 py-24 absolute top-0">
      {!playerReady ? (
        <LoginForm
          label="Input your Username"
          placeholder="Username"
          onSuccess={(user) => {
            setPlayerReady(true);
            loginPlayer(user.username);
          }}
        />
      ) : (
        renderWait()
      )}
    </section>
  );
};

export default PlayerLogin;
