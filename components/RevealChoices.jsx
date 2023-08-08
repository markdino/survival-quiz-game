import React from "react";
import LargeButton from "./LargeButton";

const RevealChoices = ({ onClickRevealChoice, onClickStartTimer, disabledRevealChoice, disabledStartTimer }) => {
  return (
    <section
      className="flex flex-col justify-content: center items-center mx-60 absolute bottom-0 mb-8
            border-4 rounded-md border-black"
    >
      <div className="h-1/2 m-20 flex flex-row justify-between items-center">
      <LargeButton onClick={onClickRevealChoice} disabled={disabledRevealChoice}>
        Reveal Choices
      </LargeButton>
      <LargeButton onClick={onClickStartTimer} disabled={disabledStartTimer}>
        Start Timer
      </LargeButton>
      </div>
    </section>
  );
};

export default RevealChoices;
