import classNames from "classnames";

const choiceStyle =
  "w-full flex justify-center border-2 rounded-md border-black mt-4 mb-1 p-2 text-md";
// const wrongChoiceStyle = "border-4 rounded-md border-red-500 bg-red-500";
const correctChoiceStyle = "border-4 rounded-md border-green-600 bg-green-500";

const Choice = ({ choice, players, answer }) => {
  if (!choice) return;

  return (
    <div className="w-full px-8 flex flex-col justify-center items-center">
      <div
        className={classNames(
          choiceStyle,
          //   answer && (answer === choice ? correctChoiceStyle : wrongChoiceStyle),
          answer === choice ? correctChoiceStyle : "bg-white"
        )}
      >
        <span>{choice}</span>
      </div>
      <div className="mt-2 h-24">
        <ul className="overflow-auto max-h-20 px-4">
          {players?.map((player) => (
            <li key={player._id}>{player.user.username}</li>
          ))}
        </ul>
        {answer && choice !== answer && players?.length > 0 && (
          <div className="mt-4">
            <span className="text-md bg-red-500 p-2 rounded-md">
              Players Out!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Choice;
