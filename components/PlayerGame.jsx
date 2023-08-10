import { submitAnswer } from "@services/api";
import UserContext from "@store/UserContext";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import { useState, useEffect, useContext } from "react";

const COUNTDOWN_TIME = 5000; // 5 secs timer
const disableStyle =
  "border-4 rounded-md border-gray my-4 mx-48 py-4 text-xl text-gray-500";
const choiceStyle =
  "border-4 rounded-md border-black my-4 mx-48 py-4 text-xl hover:border-yellow-400";
const selectedChoiceStyle =
  "border-4 rounded-md border-yellow-400 bg-yellow-500 my-4 mx-48 py-4 text-xl";
const correctChoiceStyle =
  "border-4 rounded-md border-green-500 bg-green-500 my-4 mx-48 py-4 text-xl";
const wrongChoiceStyle =
  "border-4 rounded-md border-red-500 bg-red-500 my-4 mx-48 py-4 text-xl";

const PlayerGame = ({ currentQuiz, roomId }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [disableSelect, setDisableSelect] = useState(true);
  const [startTimer, setStartTimer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [revealChoice, setRevealChoice] = useState(false);

  const { question, choices } = currentQuiz;

  const socket = useContext(SocketContext);
  const { user } = useContext(UserContext);

  // Choice component
  const renderChoice = (text, index) => (
    <li
      key={text}
      className={handleChoiceStyles(text, index)}
      onClick={() => handleSelectAnswer(text)}
    >
      {text}
    </li>
  );

  // Select answer interaction logic
  const handleSelectAnswer = (text) => {
    if (disableSelect) return;
    // if (text === selectedAnswer) {
    //   setSelectedAnswer(null);
    //   return;
    // }
    setSelectedAnswer(text);
  };

  // Choices color handling if answers are shown
  const handleChoiceStyles = (text, index) => {
    if (!selectedAnswer && disableSelect) return disableStyle;

    if (answer) {
      if (selectedAnswer === text && answer !== text) return wrongChoiceStyle;
      if (answer === text) return correctChoiceStyle;
      return choiceStyle
    }
    return text === selectedAnswer ? selectedChoiceStyle : choiceStyle;
  };

  // Timer handler
  useEffect(() => {
    if (startTimer) {
      setDisableSelect(false);
      setTimeout(() => {
          socket.emit(GAME_TOPIC, { stopTimer: true });
          setDisableSelect(true);
          setStartTimer(false);
          alert("Time's Up!");
      }, COUNTDOWN_TIME);
    }
  }, [startTimer]);

  // Submit selected answer
  useEffect(() => {
    if (selectedAnswer) {
      submitAnswer({
        roomId: roomId,
        userId: user.id,
        answer: selectedAnswer,
        onSuccess: () => {
          socket.emit(GAME_TOPIC, { creatorRequestFetch: true });
        },
      });
    }
    console.log({selectedAnswer})
  }, [selectedAnswer]);

  //   Listen to socket
  useEffect(() => {
    socket.on(GAME_TOPIC, (data) => {
      if (data?.revealAnswer) {
        setAnswer(data?.answer);
      }

      if (data?.newQuiz) {
        setAnswer("");
        setRevealChoice(false);
        setSelectedAnswer(null)
      }

      if (data?.startTimer) {
        setStartTimer(true);
      }

      if (data?.revealChoice) {
        setRevealChoice(true);
      }
    });
  }, [socket]);

  return (
    <section
      className="flex items-center justify-center m-24 py-24 absolute top-0
                        border-4 rounded-md border-black"
    >
      <div className="text-center my-8">
        <span className="text-xl my-4">
          {startTimer ? (
            <strong className="text-2xl text-green-500">Start!</strong>
          ) : (
            "5 seconds to answer"
          )}
        </span>
        <h3 className="text-3xl my-4">Question</h3>
        <p className="text-2xl my-4 w-screen prevent_select">{question}</p>
        <div className="flex justify-center items-center text-center my-16">
          {revealChoice && (
            <ul className="w-1/2">
              {choices.map((choice) =>
                renderChoice(choice, choices.indexOf(choice))
              )}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlayerGame;
