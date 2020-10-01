import React, { useState, useRef, useEffect } from "react";
import "./app.css";

const ONE_SECOND = 1000;
const ONE_MINUTE = 60000;

const TYPING_PROMPT = "Hello World. This is my first typing game.";
const APPROX_WORD_LENGTH = 5;
const BACKSPACE = 8;

let typingInterval;

const getStats = ({
  timeElapsedInMs,
  correctEntries,
  incorrectEntries,
  keyStrokeCount,
}) => {
  const correctEntriesCount = correctEntries.length;
  const incorrectEntriesCount = incorrectEntries.length;
  const timeElapsedInMin = timeElapsedInMs / ONE_MINUTE;

  const grossWpm = (
    keyStrokeCount /
    APPROX_WORD_LENGTH /
    timeElapsedInMin
  ).toFixed();

  const wpm = (grossWpm - incorrectEntriesCount / timeElapsedInMin).toFixed();
  const accuracy = ((correctEntriesCount / keyStrokeCount) * 100).toFixed();

  return {
    wpm: isFinite(wpm) && wpm > 0 ? wpm : 0,
    accuracy: isFinite(accuracy) ? accuracy : 0,
  };
};

const getHighlightClass = ({ isCorrectSequence, isFinished }) => {
  if (isFinished) {
    return "highlight-finished";
  }

  if (isCorrectSequence) {
    return "highlight-correct";
  }

  return "highlight-incorrect";
};

function App() {
  const typingArea = useRef(null);
  const [gameState, setGameState] = useState({
    typingPrompt: TYPING_PROMPT,
    correctEntries: [],
    incorrectEntries: [],
    isCorrectSequence: true,
    keyStrokeCount: 0,
    typingPromptLength: TYPING_PROMPT.length,
  });
  const [timeElapsedInMs, setTimeElapsedInMs] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (hasStartedTyping && !isFinished) {
      const timeAtStart = new Date();

      typingInterval = setInterval(() => {
        const newTimeElapsedInMs = new Date() - timeAtStart;

        if (newTimeElapsedInMs >= ONE_MINUTE) {
          clearInterval(typingInterval);
          setIsFinished(true);
        } else {
          setTimeElapsedInMs(newTimeElapsedInMs);
        }
      }, ONE_SECOND);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [isFinished, hasStartedTyping]);

  const {
    typingPrompt,
    correctEntries,
    incorrectEntries,
    isCorrectSequence,
    keyStrokeCount,
  } = gameState;

  const handleOnKeyPress = ({ charCode }) => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
    }
    if (charCode === typingPrompt.charCodeAt(0)) {
      setGameState({
        ...gameState,
        correctEntries: [...correctEntries, typingPrompt[0]],
        typingPrompt: typingPrompt.substring(1),
        isCorrectSequence: true,
        keyStrokeCount: keyStrokeCount + 1,
      });

      if (typingPrompt.substring(1).length < 1) {
        clearInterval(typingInterval);
        setIsFinished(true);
      }
    } else {
      setGameState({
        ...gameState,
        incorrectEntries: [...incorrectEntries, String.fromCharCode(charCode)],
        isCorrectSequence: false,
        keyStrokeCount: keyStrokeCount + 1,
      });
    }
  };

  const handleOnKeyDown = ({ keyCode }) => {
    if (keyCode === BACKSPACE) {
      setGameState({
        ...gameState,
        incorrectEntries:
          incorrectEntries.length > 0
            ? incorrectEntries.slice(0, -1)
            : incorrectEntries,
        isCorrectSequence: incorrectEntries.length === 0,
      });
    }
  };

  const handleClick = () => {
    typingArea.current.focus();
  };

  const { wpm, accuracy } = getStats({
    timeElapsedInMs,
    correctEntries,
    incorrectEntries,
    keyStrokeCount,
  });

  const highlightClass = getHighlightClass({ isCorrectSequence, isFinished });

  return (
    <div onClick={handleClick} className="app">
      <input
        ref={typingArea}
        className="typing-area"
        onKeyPress={handleOnKeyPress}
        onKeyDown={handleOnKeyDown}
        type="text"
        autoFocus
      />
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
        </div>
        <div className="incorrect-entries">
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
