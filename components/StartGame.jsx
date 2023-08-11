import classNames from "classnames";
import LargeButton from "./LargeButton";

const StartGame = ({ onClick, disabled }) => {
  return (
    <section
      className="flex flex-col items-center justify-center 
            w-1/4 h-1/3 mx-8 mb-8 absolute bottom-0 left-0
            border-4 rounded-md border-black"
    >
      <LargeButton onClick={onClick} disabled={disabled}>
        Start Game
      </LargeButton>
    </section>
  );
};

export default StartGame;
