import classNames from "classnames";

const StartGame = ({ onClick, disabled }) => {
  return (
    <section
      className="flex flex-col items-center justify-center 
            w-1/4 h-1/3 mx-8 mb-8 absolute bottom-0 left-0
            border-4 rounded-md border-black"
    >
      <button
        onClick={onClick}
        className={classNames(
          "px-16 py-8 ml-2 text-3xl rounded-lg",
          disabled ? "bg-gray-200 text-gray-500" : "bg-yellow-400"
        )}
        disabled={disabled}
      >
        Start Game
      </button>
    </section>
  );
};

export default StartGame;
