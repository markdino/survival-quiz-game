import { useState, useEffect, useContext } from "react";
import PlayerGame from "./PlayerGame";
import PlayerLogin from "./PlayerLogin";
import UserContext from "@store/UserContext";

// Dummy game data
const question = "What comes after Mercury?";
const choices = ["7/11", "McDonalds", "Venus", "Jollibee"];
const answer = "Venus";

const PlayerView = ({ data }) => {
  const [startGame, setStartGame] = useState(false);
  const [player, setPlayer] = useState("");
  const [playerEliminated, setPlayerEliminated] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  const { user } = useContext(UserContext);

  const playerExist = data.participants.some(
    (participant) => participant.user._id === user?.id
  );

  // Render wait component
  const RenderWait = () => (
    <div className="h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center">
      <span className="text-xl">Waiting for other players</span>
    </div>
  );

  // Game started component
  const RenderGameStarted = () => (
    <div className="h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center">
      <span className="text-xl text-center">The game has already started!</span>
    </div>
  );

  // Render game ui or game started
  const handleStartGame = () => {
    return (
      <>
        {playerExist ? (
          <PlayerGame
            question={question}
            choices={choices}
            answer={answer}
            showQuestion={showQuestion}
            startTimer={startTimer}
            checkAnswer={showAnswer}
            eliminatePlayer={setPlayerEliminated}
          />
        ) : (
          <RenderGameStarted />
        )}
      </>
    );
  };

  // Render waiting or player login form
  const handleUnStartGame = () => {
    return (
      <>{playerExist ? <RenderWait /> : <PlayerLogin roomId={data._id} />}</>
    );
  };

  useEffect(() => {
    console.log(`Is player eliminated? ${playerEliminated}`);
  }, [playerEliminated]);

  return (
    <div className="flex items-center justify-center">
      {data.started ? handleStartGame() : handleUnStartGame()}
    </div>
  );
};

export default PlayerView;
