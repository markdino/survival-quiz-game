import Choice from "./Choice";
import Glass from "./Glass";
import WaitingGif from "./Loading/WaitingGif";

const Quiz = ({ revealChoices, players, answer, quiz = {}, started }) => {
  const { question, choices } = quiz;

  const selectByPlayersChoice = (answer, players = []) => {
    const slectedPlayers = players.filter(
      (player) => player?.answer === answer
    );
    return slectedPlayers;
  };
  return (
    <>
      <Glass
        className="flex flex-col items-center justify-start 
          w-2/5 h-3/5 mt-16 absolute top-5"
        opacity={started ? 0.8 : 0.3}
      >
        <div className="w-full h-full flex flex-col justify-between items-between">
          {!started ? (
            <WaitingGif />
          ) : (
            <>
              <span className="my-8 px-16 w-full text-xl text-center">
                {question}
              </span>
              <div className="w-full h-3/4 flex justify-between absolute mb-8 bottom-0">
                {revealChoices && (
                  <>
                    <div className="w-1/2 flex flex-col justify-between items-center">
                      <Choice
                        choice={choices[0]}
                        players={selectByPlayersChoice(choices[0], players)}
                        answer={answer}
                      />
                      <Choice
                        choice={choices[2]}
                        players={selectByPlayersChoice(choices[2], players)}
                        answer={answer}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col justify-between  items-center">
                      <Choice
                        choice={choices[1]}
                        players={selectByPlayersChoice(choices[1], players)}
                        answer={answer}
                      />
                      <Choice
                        choice={choices[3]}
                        players={selectByPlayersChoice(choices[3], players)}
                        answer={answer}
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </Glass>
    </>
  );
};

export default Quiz;
