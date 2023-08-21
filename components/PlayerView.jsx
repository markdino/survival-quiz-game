/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import PlayerGame from "./PlayerGame";
import PlayerLogin from "./PlayerLogin";
import UserContext from "@store/UserContext";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import MessageWrapper from "./MessageWrapper";

const PlayerView = ({ data }) => {
  const { user, setRequestFetch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const player = data.participants.find(
    (participant) => participant.user._id === user?.id
  );

  // Render wait component
  const RenderWait = () => (
    <MessageWrapper>
      <div className="h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center">
        <span className="text-xl">Waiting for other players</span>
      </div>
    </MessageWrapper>
  );

  // Game started component
  const GateKeeper = () => (
    <MessageWrapper>
      <div className="h-72 w-72 rounded-full bg-gray-400 text-gray-900 flex justify-center items-center">
        <span className="text-xl text-center">
          The game has already started!
        </span>
      </div>
    </MessageWrapper>
  );

  // Game over component
  const GameOver = () => (
    <MessageWrapper>
      <div className="h-72 w-72 rounded-full bg-red-300 text-red-950 flex justify-center items-center">
        <span className="text-xl text-center">Sorry! You are eliminated</span>
      </div>
    </MessageWrapper>
  );

  // Render game ui or game started
  const handleStartGame = () => {
    return (
      <>
        {player ? (
          player.active ? (
            <PlayerGame
              currentQuiz={data?.currentQuiz}
              roomId={data?._id}
              player={player}
            />
          ) : (
            <GameOver />
          )
        ) : (
          <GateKeeper />
        )}
      </>
    );
  };

  // Render waiting or player login form
  const handleUnStartGame = () => {
    return <>{player ? <RenderWait /> : <PlayerLogin roomId={data._id} />}</>;
  };

  // Listend to socket on data reload
  useEffect(() => {
    const roomId = data?._id;
    socket.on(GAME_TOPIC, (data) => {
      if (data.roomId === roomId && data.playerRequestFetch) {
        setRequestFetch(true);
      }
    });
  }, [socket]);

  return (
    <div className="flex items-center justify-center">
      {data.started ? handleStartGame() : handleUnStartGame()}
    </div>
  );
};

export default PlayerView;
