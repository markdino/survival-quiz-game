/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import StartGame from "./StartGame";
import NextQuestion from "./NextQuestion";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import { getQuiz, revealQuiz, updateRoomData } from "@services/api";
import UserContext from "@store/UserContext";
import RevealChoices from "./RevealChoices";
import Quiz from "./Quiz";

const CreatorView = ({ data }) => {
  const [quiz, setQuiz] = useState(null);
  const [archiveQuiz, setArchiveQuiz] = useState([]);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [revealChoice, setRevealChoice] = useState(false);

  const socket = useContext(SocketContext);
  const { setRequestFetch } = useContext(UserContext);

  const clearParticipantsAnswer = () => {
    const clearedParticipants = data?.participants.map((participant) => {
      participant.answer = "";
      return participant;
    });
    return clearedParticipants;
  };

  const validateParticipantsAnswer = (answer) => {
    const validatedParticipants = data?.participants.map((participant) => {
      if (participant.answer !== answer) {
        participant.active = false;
      }
      return participant;
    });

    return validatedParticipants;
  };

  const getMostSelectedAnswer = (callback) => {
    const activePlayers = data?.participants.filter((player) => player.active);
    const answerCount = {};

    activePlayers.forEach((player) => {
      if (answerCount[player.answer]) {
        answerCount[player.answer]++;
      } else {
        answerCount[player.answer] = 1;
      }
    });

    let mostSelectedAnswer = null;
    let count = 0;

    for (const answer in answerCount) {
      if (answerCount[answer] > count) {
        count = answerCount[answer];
        mostSelectedAnswer = answer;
      }
    }

    callback(mostSelectedAnswer, count);
  };

  const handleNewQuiz = () => {
    getQuiz({
      exclude: archiveQuiz,
      onSuccess: (newQuiz) => {
        setArchiveQuiz((prev) => [...prev, newQuiz._id]);
        setQuiz(newQuiz);
        updateRoomData({
          roomId: data?._id,
          newData: {
            answer: "",
            currentQuiz: newQuiz._id,
            participants: clearParticipantsAnswer(),
            archivedQuiz: archiveQuiz,
          },
          onSuccess: () => {
            setRequestFetch(true);
            setRevealChoice(false);
            socket.emit(GAME_TOPIC, {
              playerRequestFetch: true,
              newQuiz: true,
            });
          },
        });
      },
    });
  };

  const handleRevealAnswer = () => {
    if (data?.currentQuiz.type === "poll") {
      getMostSelectedAnswer((mostSelectedAnswer) => {
        updateRoomData({
          roomId: data?._id,
          newData: {
            answer: mostSelectedAnswer,
            participants: validateParticipantsAnswer(mostSelectedAnswer),
          },
          onSuccess: () => {
            setRequestFetch(true);
            socket.emit(GAME_TOPIC, {
              revealAnswer: true,
              answer: mostSelectedAnswer,
            });
          },
        });
      });
    } else {
      revealQuiz({
        id: quiz?._id,
        onSuccess: ({ answer }) => {
          setAnswer(answer);
          updateRoomData({
            roomId: data?._id,
            newData: {
              answer,
              participants: validateParticipantsAnswer(answer),
            },
            onSuccess: () => {
              setRequestFetch(true);
              socket.emit(GAME_TOPIC, { revealAnswer: true, answer });
            },
          });
        },
      });
    }
  };

  const handleGameStart = () => {
    updateRoomData({
      roomId: data?._id,
      newData: { started: true },
      onSuccess: () => {
        handleNewQuiz();
      },
    });
  };

  const handleTimerStart = () => {
    setTimerStarted(true);
    socket.emit(GAME_TOPIC, { startTimer: true });
  };

  const handleRevealChoice = () => {
    setRevealChoice(true);
    socket.emit(GAME_TOPIC, { revealChoice: true });
  };

  // Setter on data reload
  useEffect(() => {
    if (data?.currentQuiz) {
      setQuiz(data.currentQuiz);
    }
    if (data?.archiveQuiz) {
      setArchiveQuiz(data.archiveQuiz);
    }
    if (data?.started !== started) {
      setStarted(data?.started);
    }
    if (data?.answer !== answer) {
      setAnswer(data.answer);
    }
  }, [data]);

  // Listen to socket
  useEffect(() => {
    socket.on(GAME_TOPIC, (data) => {
      if (data.creatorRequestFetch) {
        setRequestFetch(true);
      }
      if (data.stopTimer) {
        setTimerStarted(false);
      }
    });
  }, [socket]);

  return (
    <div className="flex items-center justify-center">
      <PlayerList players={data?.participants} />
      <StartGame disabled={started} onClick={handleGameStart} />
      <Quiz
        revealChoices={revealChoice}
        answer={answer}
        quiz={data?.currentQuiz}
        players={data?.participants}
      />
      <RevealChoices
        onClickRevealChoice={handleRevealChoice}
        onClickStartTimer={handleTimerStart}
        disabledRevealChoice={!data?.started || revealChoice}
        disabledStartTimer={!data?.started || timerStarted}
      />
      <NextQuestion
        disabledNext={!data?.started || timerStarted}
        disabledReveal={!data?.started || timerStarted || data?.answer}
        handleNextQuestion={handleNewQuiz}
        handleRevealAnswer={handleRevealAnswer}
      />
    </div>
  );
};

export default CreatorView;
