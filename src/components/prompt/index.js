import React from "react";
import "./index.css";

const Prompt = ({
  correctEntries,
  typingPrompt,
  incorrectEntries,
  highlightClass,
  hasStartedTyping,
  author,
  isFinished,
}) => {
  return (
    <div className="typing-prompt">
      <div className="correct-entries">
        <div
          className={`typing-prompt-notice ${
            hasStartedTyping && !isFinished ? "hide" : ""
          }`}
        >
          {" "}
          {isFinished
            ? "Press enter to start another test."
            : "Type the following:"}
        </div>
        {correctEntries.map((correctEntry, index) => {
          return (
            <span key={`${correctEntry}-${index}`} className={highlightClass}>
              {correctEntry}
            </span>
          );
        })}
        {incorrectEntries.length > 0 &&
          incorrectEntries.map((incorrectEntry, index) => {
            return (
              <span
                key={`${incorrectEntry}-${index}`}
                className={`highlight-incorrect ${
                  incorrectEntry === "_" ? "is-underline" : ""
                }`}
              >
                {incorrectEntry}
              </span>
            );
          })}
        {typingPrompt}
        <div className="typing-prompt-author">{author}</div>
      </div>
    </div>
  );
};

export default Prompt;
