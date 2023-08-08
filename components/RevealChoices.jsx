import React from "react";
import LargeButton from "./LargeButton";

const RevealChoices = ({ onClick, disabled }) => {
  return (
    <section
      className="flex flex-col justify-content: center items-center mx-60 absolute bottom-0 mb-8
            border-4 rounded-md border-black"
    >
      <div className="h-1/2 m-20 flex flex-row justify-between items-center">
      <LargeButton onClick={onClick} disabled={disabled}>
        Reveal Choices
      </LargeButton>
      <LargeButton onClick={onClick} disabled={disabled}>
        Start Timer
      </LargeButton>
      </div>
    </section>
  );
};

export default RevealChoices;
