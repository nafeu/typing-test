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
        {typingPrompt}
        {incorrectEntries.length > 0 && (
          <div className="incorrect-entries">
            Incorrect:{" "}
            {incorrectEntries.map((incorrectEntry, index) => {
              return (
                <span
                  key={`${incorrectEntry}-${index}`}
                  className={"highlight-incorrect"}
                >
                  {incorrectEntry}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prompt;
