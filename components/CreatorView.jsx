import React, { useContext, useEffect } from "react";
import PlayerList from "./PlayerList";
import StartGame from "./StartGame";
import NextQuestion from "./NextQuestion";
import { SocketContext } from "@websocket";
import { GAME_TOPIC } from "@websocket/topics";

// Dummy player data
const players = [
  {id: 1, name: "Tony Stark", isOnline: true},
  {id: 2, name: "Steve Rogers", isOnline: true},
  {id: 3, name: "Peter Parker", isOnline: true},
  {id: 4, name: "Natasha Romanoff", isOnline: true},
  {id: 5, name: "James Rhodes", isOnline: true},
  {id: 6, name: "Bruce Banner", isOnline: true},
  {id: 7, name: "Thor Odinson", isOnline: false},
  {id: 8, name: "Nick Fury", isOnline: true},
  {id: 9, name: "Wanda Maximoff", isOnline: false},
  {id: 10, name: "Sam Wilson", isOnline: true},
]

const CreatorView = () => {
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on(GAME_TOPIC, (data) => {
      console.log(data.startGame)
    }
    )
  },[socket])

  return (
    <div>
      <PlayerList players={players}/>
      <StartGame />
      {/* Choices component etc */}
      <NextQuestion/>
    </div>
  );
};

export default CreatorView;
