import React from "react";
import PlayerList from "./PlayerList";
import StartGame from "./StartGame";

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
  return (
    <div>
      <PlayerList players={players}/>
      <StartGame />
    </div>
  );
};

export default CreatorView;
