/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import StartGame from "./StartGame";
import NextQuestion from "./NextQuestion";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";
import { getQuiz, revealQuiz, updateRoomData } from "@services/api";
import UserContext from "@store/UserContext";

const CreatorView = ({ data, setRoomData = () => null }) => {
  const [quiz, setQuiz] = useState(null);
  const [archiveQuiz, setArchiveQuiz] = useState([]);
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");

  const socket = useContext(SocketContext);
  const { setRequestFetch } = useContext(UserContext);

  const clearParticipantsAnswer = () => {
    const clearedParticipants = data?.participants.map((participant) => {
      participant.answer = "";
      return participant
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
            archivedQuiz: archiveQuiz,
          },
          onSuccess: () => {
            setRequestFetch(true)
            socket.emit(GAME_TOPIC, { playerRequestFetch: true });
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
            setRequestFetch(true)
            socket.emit(GAME_TOPIC, { playerRevealAnswer: true });
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

  }, [data]);

  useEffect(() => {
    socket.on(GAME_TOPIC, (data) => {
      console.log('Creator', data)
      if (data.creatorRequestFetch) {
        setRequestFetch(true)
      }
    });
    
  }, [socket]);

  return (
    <div>
      <PlayerList players={data?.participants} />
      <StartGame disabled={started} onClick={handleGameStart} />
      {/* Choices component etc */}
      <NextQuestion
        disabledNext={!data?.started}
        disabledReveal={!data?.started}
        handleNextQuestion={handleNewQuiz}
        handleRevealAnswer={handleRevealAnswer}
      />
    </div>
  );
};

export default CreatorView;
