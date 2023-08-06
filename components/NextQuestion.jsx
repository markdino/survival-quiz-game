import React from "react";

const NextQuestion = ({
  handleRevealAnswer = () => null,
  handleNextQuestion = () => null,
}) => {
  return (
    <section
      className="flex flex-col items-center justify-end
            w-1/4 mt-24 mx-8 mb-8 absolute top-0 right-0 bottom-0
            border-4 rounded-md border-black"
    >
      <div className="h-1/2 m-24 flex flex-col justify-between items-center">
        <button
          onClick={handleRevealAnswer}
          className="px-16 py-8 ml-2 text-2xl bg-yellow-400 rounded-lg"
        >
          Reveal Answer
        </button>
        <button
          onClick={handleNextQuestion}
          className="px-16 py-8 ml-2 text-2xl bg-yellow-400 rounded-lg"
        >
          Next Question
        </button>
      </div>
    </section>
  );
};

export default NextQuestion;
