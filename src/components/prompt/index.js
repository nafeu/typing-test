import React from "react";
import "./index.css";

const Prompt = ({
  correctEntries,
  typingPrompt,
  incorrectEntries,
  highlightClass,
}) => {
  return (
    <div className="typing-prompt">
      <div className="correct-entries">
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
                className={"highlight-incorrect"}
              >
                {incorrectEntry}
              </span>
            );
          })}
        {typingPrompt}
      </div>
    </div>
  );
};

export default Prompt;
