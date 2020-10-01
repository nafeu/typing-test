import React, { useState, useRef, useEffect } from "react";
import "./app.css";

const ONE_SECOND = 1000;
const ONE_MINUTE = 60000;

const TYPING_PROMPT = "Hello World. This is my first typing game.";
const APPROX_WORD_LENGTH = 5;

let typingInterval;

const getStats = ({ timeElapsedInMs, completedCharacters, keyStrokeCount }) => {
  const completedCharacterCount = completedCharacters.length;
  const timeElapsedInMin = timeElapsedInMs / ONE_MINUTE;

  const wpm = (
    keyStrokeCount /
    APPROX_WORD_LENGTH /
    timeElapsedInMin
  ).toFixed();

  const accuracy = ((completedCharacterCount / keyStrokeCount) * 100).toFixed();

  return {
    wpm: isFinite(wpm) ? wpm : 0,
    accuracy: isFinite(accuracy) ? accuracy : 0,
  };
};

function App() {
  const typingArea = useRef(null);
  const [gameState, setGameState] = useState({
    typingPrompt: TYPING_PROMPT,
    completedCharacters: [],
    isCorrectKeyPress: true,
    keyStrokeCount: 0,
    typingPromptLength: TYPING_PROMPT.length,
  });
  const [timeElapsedInMs, setTimeElapsedInMs] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  useEffect(() => {
    if (hasStartedTyping) {
      const timeAtStart = new Date();

      typingInterval = setInterval(() => {
        const newTimeElapsedInMs = new Date() - timeAtStart;

        if (newTimeElapsedInMs >= ONE_MINUTE) {
          clearInterval(typingInterval);
        } else {
          setTimeElapsedInMs(newTimeElapsedInMs);
        }
      }, ONE_SECOND);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [hasStartedTyping]);

  const {
    typingPrompt,
    completedCharacters,
    isCorrectKeyPress,
    keyStrokeCount,
  } = gameState;

  const handleOnKeyPress = ({ charCode }) => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
    }
    if (charCode === typingPrompt.charCodeAt(0)) {
      setGameState({
        ...gameState,
        completedCharacters: [...completedCharacters, typingPrompt[0]],
        typingPrompt: typingPrompt.substring(1),
        isCorrectKeyPress: true,
        keyStrokeCount: keyStrokeCount + 1,
      });

      if (typingPrompt.substring(1).length < 1) {
        clearInterval(typingInterval);
      }
    } else {
      setGameState({
        ...gameState,
        isCorrectKeyPress: false,
        keyStrokeCount: keyStrokeCount + 1,
      });
    }
  };

  const handleClick = () => {
    typingArea.current.focus();
  };

  const { wpm, accuracy } = getStats({
    timeElapsedInMs,
    completedCharacters,
    keyStrokeCount,
  });

  return (
    <div onClick={handleClick} className="app">
      <input
        ref={typingArea}
        className="typing-area"
        onKeyPress={handleOnKeyPress}
        type="text"
        autoFocus
      />
      <div className="typing-prompt">
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
      <div className="typing-stats">
        WPM: {wpm}
        <br />
        ACCURACY: {accuracy}
        <br />
      </div>
    </div>
  );
}

export default App;
