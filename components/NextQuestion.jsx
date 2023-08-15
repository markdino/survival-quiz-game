import React from "react";
import LargeButton from "./LargeButton";

const NextQuestion = ({
  disabledNext,
  disabledReveal,
  handleRevealAnswer = () => null,
  handleNextQuestion = () => null,
}) => {
  return (
    <section
      className="flex flex-col items-center justify-end
            w-1/4 mt-16 mx-8 mb-8 absolute top-5 right-0 bottom-0
            border-4 rounded-md border-black"
    >
      <div className="h-1/2 m-24 flex flex-col justify-between items-center">
        <LargeButton onClick={handleRevealAnswer} disabled={disabledReveal}>
          Reveal Answer
        </LargeButton>
        <LargeButton onClick={handleNextQuestion} disabled={disabledNext}>
          Next Question
        </LargeButton>
      </div>
    </section>
  );
};

export default NextQuestion;
