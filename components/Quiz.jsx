import Choice from "./Choice";

const Quiz = ({ revealChoices, players, revealAnswer, quiz }) => {
  if (!quiz) return;

  const { question, choices } = quiz;

  return (
    <section
      className="flex flex-col items-center justify-center 
        w-1/3 h-2/3 mt-24 mx-60 mb-8 absolute top-0
        border-4 rounded-md border-black"
    >
      {revealChoices && (
        <>
          <h3 className="mt-4 text-2xl absolute top-0">{question}</h3>
          <div className="flex flex-row  justify-between items-between">
            <div className="flex flex-col justify-between items-between">
              <Choice
                choice={choices[0]}
                players={[players[0], players[2]]}
                revealAnswer={revealAnswer}
              />
              <Choice
                choice={choices[1]}
                players={[players[1], players[4]]}
                revealAnswer={revealAnswer}
              />
            </div>
            <div className="flex flex-col justify-between items-between">
              <Choice
                choice={choices[2]}
                correctAnswer
                players={[players[3]]}
                revealAnswer={revealAnswer}
              />
              <Choice
                choice={choices[3]}
                players={[]}
                revealAnswer={revealAnswer}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Quiz;
