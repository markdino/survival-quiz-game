import React from "react";
import classNames from "classnames";
import styles from "@styles/Glass.module.css";
import Glass from "./Glass";

const PlayerName = ({ userName, isActive }) => {
  return (
    <li
      className={classNames(
        "my-2 mx-4 text-xl flex justify-between items-center",
        { "text-gray-500": !isActive }
      )}
    >
      {userName}
      <div
        className={classNames(
          "w-4 h-4 rounded-full ml-16",
          `bg-${isActive ? "green" : "red"}-500`
        )}
      ></div>
    </li>
  );
};

const PlayerList = ({ players = [] }) => {
  const playersCount = players.length;
  const activePlayers = players.filter((player) => player.active);
  const activePlayersCount = activePlayers.length;
  return (
    <Glass
      className="flex flex-col items-center w-1/4 mt-16 mb-8 mx-8 py-8 px-4 absolute top-5 left-0 bottom-0"
      opacity={0.3}
    >
      <section className="flex justify-between w-full px-4">
      <h3 className="text-2xl font-bold text-amber-400">
        List of Players:
      </h3>
      <p>{activePlayersCount}/{playersCount}</p>
      </section>
      <ul className="w-full py-4 px-4 overflow-auto">
        <Glass opacity={0.5} shadow={0.5} shadowY="10px" shadowX="6px">
          {players.map((player) => (
            <PlayerName
              key={player._id}
              userName={player.user?.username}
              isActive={player.active}
            />
          ))}
        </Glass>
      </ul>
    </Glass>
  );
};

export default PlayerList;
