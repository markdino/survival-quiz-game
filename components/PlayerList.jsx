import React from "react";
import classNames from "classnames";

const PlayerName = ({ userName, isActive }) => {
  return (
    <li
      className={classNames(
        "my-2 mx-4 text-xl flex justify-between items-center",
        { "text-gray-300": !isActive }
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

const PlayerList = ({ players }) => {
  return (
    <section
      className="flex flex-col items-center justify-center 
        w-1/4 h-1/2 mt-16 mx-8 py-8 absolute top-0 left-0
        border-4 rounded-md border-black"
    >
      <h3 className="my-16 text-2xl absolute top-0">List of Players: </h3>
      <ul className="w-full px-8 py-4 mt-16 overflow-auto">
        {players.map((player) => (
          <PlayerName
            key={player._id}
            userName={player.user?.username}
            isActive={player.active}
          />
        ))}
      </ul>
    </section>
  );
};

export default PlayerList;
