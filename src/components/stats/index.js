import React from "react";
import "./index.css";

const Stats = ({ wpm, accuracy, isFinished, hasStartedTyping }) => {
  const getStatsClass = () => {
    if (isFinished) {
      return "typing-stats-finished";
    }

    if (hasStartedTyping) {
      return "typing-stats-in-progress";
    }

    return "typing-stats-standby";
  };

  return (
    <div className={`typing-stats ${getStatsClass()}`}>
      <div className="typing-stats-wpm">
        <div className="typing-stats-value">{wpm ? wpm : "-"}</div>
        <div className="typing-stats-label">Words Per Minute</div>
      </div>
      <div className="typing-stats-accuracy">
        <div className="typing-stats-value">{accuracy ? accuracy : "-"}</div>
        <div className="typing-stats-label">Accuracy</div>
      </div>
    </div>
  );
};

export default Stats;
