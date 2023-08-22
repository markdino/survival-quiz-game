import { useContext, useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import { getQuiz, revealQuiz, updateRoomData } from "@services/api";
import UserContext from "@store/UserContext";
import Quiz from "./Quiz";
import RightPanel from "./RightPanel";
import LargeButton from "./LargeButton";
import BottomPanel from "./BottomPanel";

const CreatorView = ({ data }) => {
  const [quiz, setQuiz] = useState(null);
  const [archiveQuiz, setArchiveQuiz] = useState([]);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [revealChoice, setRevealChoice] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("")

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
    if (!activePlayers || activePlayers.length <= 0) return

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
    setButtonLoading('next-question')
    getQuiz({
      exclude: archiveQuiz,
      onSuccess: (newQuiz) => {
        setArchiveQuiz((prev) => [...prev, newQuiz._id]);
        setQuiz(newQuiz);
        setButtonLoading('')
        updateRoomData({
          roomId: data?._id,
          newData: {
            answer: "",
            currentQuiz: newQuiz._id,
            participants: clearParticipantsAnswer(),
            archivedQuiz: archiveQuiz,
          },
          onSuccess: (data) => {
            setRequestFetch(true);
            setRevealChoice(false);
            socket.emit(GAME_TOPIC, {
              playerRequestFetch: true,
              newQuiz: true,
              roomId: data?._id,
            });
          },
        });
      },
    });
  };

  const handleRevealAnswer = () => {
    setButtonLoading('reveal-answer')
    if (data?.currentQuiz.type === "poll") {
      getMostSelectedAnswer((mostSelectedAnswer) => {
        updateRoomData({
          roomId: data?._id,
          newData: {
            answer: mostSelectedAnswer,
            participants: validateParticipantsAnswer(mostSelectedAnswer),
          },
          onSuccess: (data) => {
            setButtonLoading('')
            setRequestFetch(true);
            socket.emit(GAME_TOPIC, {
              revealAnswer: true,
              answer: mostSelectedAnswer,
              roomId: data?._id,
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
            onSuccess: (data) => {
              setButtonLoading('')
              setRequestFetch(true);
              socket.emit(GAME_TOPIC, {
                revealAnswer: true,
                answer,
                roomId: data?._id,
              });
            },
          });
        },
      });
    }
  };

  const handleGameStart = () => {
    setButtonLoading('start-game')
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
    socket.emit(GAME_TOPIC, { startTimer: true, roomId: data?._id });
  };

  const handleRevealChoice = () => {
    setRevealChoice(true);
    socket.emit(GAME_TOPIC, { revealChoice: true, roomId: data?._id });
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
    const roomId = data?._id
    socket.on(GAME_TOPIC, (data) => {
      if (data.roomId === roomId) {
        if (data.creatorRequestFetch) {
          setRequestFetch(true);
        }
        if (data.stopTimer) {
          setTimerStarted(false);
        }
      }
    });
  }, [socket]);

  return (
    <div className="flex items-center justify-center">
      <PlayerList players={data?.participants} />
      <Quiz
        revealChoices={revealChoice}
        answer={answer}
        quiz={data?.currentQuiz}
        players={data?.participants}
      />
      <BottomPanel>
        <LargeButton
          onClick={handleRevealChoice}
          disabled={!data?.started || revealChoice}
        >
          Reveal Choices
        </LargeButton>
        <LargeButton
          onClick={handleTimerStart}
          disabled={!data?.started || timerStarted}
          loading={timerStarted}
        >
          Start Timer
        </LargeButton>
      </BottomPanel>
      <RightPanel>
        <LargeButton
          onClick={handleRevealAnswer}
          disabled={!data?.started || timerStarted || data?.answer || !revealChoice}
          loading={buttonLoading === 'reveal-answer'}
        >
          Reveal Answer
        </LargeButton>
        <LargeButton
          onClick={handleNewQuiz}
          disabled={!data?.started || timerStarted}
          loading={buttonLoading === 'next-question'}
        >
          Next Question
        </LargeButton>
        <LargeButton onClick={handleGameStart} disabled={started} loading={buttonLoading === 'start-game'}>
          Start Game
        </LargeButton>
      </RightPanel>
    </div>
  );
};

export default CreatorView;
