import { useContext, useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import StartGame from "./StartGame";
import NextQuestion from "./NextQuestion";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import { getQuiz, revealQuiz, updateRoomData } from "@services/api";

const CreatorView = ({ data, setRoomData = () => null }) => {
  const [quiz, setQuiz] = useState(null);
  const [archiveQuiz, setArchiveQuiz] = useState([]);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");

  const socket = useContext(SocketContext)

  const clearParticipantsAnswer = () =>
    data?.participants.map((participant) => (participant.answer = ""));

  const validateParticipantsAnswer = (answer) => {
    const validatedParticipants = data?.participants.map((participant) => {
      if (participant.answer !== answer) {
        participant.active = false;
      }
      return participant;
    });

    return validatedParticipants;
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
            currentQuiz: newQuiz._id,
            participants: clearParticipantsAnswer(),
          },
        });
      },
    });
  };

  const handleRevealAnswer = () => {
    revealQuiz({
      id: quiz?._id,
      onSuccess: ({ answer }) => {
        setAnswer(answer);
        updateRoomData({
          roomId: data?._id,
          newData: { answer, participants: validateParticipantsAnswer(answer) },
          onSuccess: (data) => {
            setRoomData(data);
          },
        });
      },
    });
  };

  const handleGameStart = () => {
    updateRoomData({
      roomId: data?._id,
      newData: { started: true },
      onSuccess: () => {
        handleNewQuiz();
        socket.emit(GAME_TOPIC, {startGame: true})
      },
    });
  };

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    socket.on(GAME_TOPIC, (data) => {
      console.log(data.startGame)
    }
    )
  },[socket])

  return (
    <div>
      <PlayerList players={data?.participants} />
      <StartGame disabled={started} onClick={handleGameStart} />
      {/* Choices component etc */}
      <NextQuestion
        handleNextQuestion={handleNewQuiz}
        handleRevealAnswer={handleRevealAnswer}
      />
    </div>
  );
};

export default CreatorView;
