import React from "react";

const Stats = ({ wpm, accuracy }) => {
  return (
    <div className="typing-stats">
      WPM: {wpm ? wpm : "-"}
      <br />
      ACCURACY: {accuracy ? accuracy : "-"}
      <br />
    </div>
  );
};

export default Stats;
