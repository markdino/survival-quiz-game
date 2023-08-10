import Choice from "./Choice";

const Quiz = ({ revealChoices, players, answer, quiz }) => {
  if (!quiz) return;

  const { question, choices } = quiz;

  const selectByPlayersChoice = (answer, players = []) => {
    const slectedPlayers = players.filter(
      (player) => player?.answer === answer
    );
    return slectedPlayers;
  };
  return (
    <>
      <section
        className="flex flex-col items-center justify-start 
          w-2/5 h-3/5 mt-16 absolute top-0
          border-4 rounded-md border-black"
      >
        <div className="w-full flex flex-col justify-between items-between">
          <span className="my-4 ml-4 mr-16 w-full text-xl absolute top-0">
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
                    choice={choices[1]}
                    players={selectByPlayersChoice(choices[1], players)}
                    answer={answer}
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-between  items-center">
                  <Choice
                    choice={choices[2]}
                    players={selectByPlayersChoice(choices[2], players)}
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
        </div>
      </section>
    </>
  );
};

export default Quiz;