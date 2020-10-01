import React, { useState, useRef } from "react";
import "./app.css";

function App() {
  const typingArea = useRef(null);

  const [state, setState] = useState({
    typingPrompt: "Hello World. This is my first typing game.",
    completedCharacters: [],
    isCorrectKeyPress: true,
  });

  const { typingPrompt, completedCharacters, isCorrectKeyPress } = state;

  const handleOnKeyPress = ({ charCode }) => {
    if (charCode === typingPrompt.charCodeAt(0)) {
      setState({
        completedCharacters: [...completedCharacters, typingPrompt[0]],
        typingPrompt: typingPrompt.substring(1),
        isCorrectKeyPress: true,
      });
    } else {
      setState({
        ...state,
        isCorrectKeyPress: false,
      });
    }
  };

  const handleClick = () => {
    typingArea.current.focus();
  };

  return (
    <div onClick={handleClick} className="app">
      <input
        ref={typingArea}
        className="typing-area"
        onKeyPress={handleOnKeyPress}
        type="text"
        autoFocus
      />
      <div>
        {completedCharacters.map((completedCharacter, index) => {
          return (
            <span
              key={`${completedCharacter}-${index}`}
              className={
                isCorrectKeyPress ? "correct-character" : "incorrect-character"
              }
            >
              {completedCharacter}
            </span>
          );
        })}
        {typingPrompt}
      </div>
    </div>
  );
}

export default App;
