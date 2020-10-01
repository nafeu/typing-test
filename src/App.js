import React, { useState, useRef, useEffect } from "react";
import "./app.css";
import { ONE_MINUTE, ONE_SECOND, KEYCODE_BACKSPACE } from "./utils/constants";
import { getStats, getHighlightClass } from "./utils/helpers";
import { getText } from "./services/text";

import Stats from "./components/stats";
import Prompt from "./components/prompt";

let typingInterval;

function App() {
  const text = getText();
  const typingArea = useRef(null);
  const [gameState, setGameState] = useState({
    typingPrompt: text,
    correctEntries: [],
    incorrectEntries: [],
    isCorrectSequence: true,
    keyStrokeCount: 0,
    typingPromptLength: text.length,
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

  const { wpm, accuracy } = getStats({
    timeElapsedInMs,
    correctEntries,
    incorrectEntries,
    keyStrokeCount,
  });

  const highlightClass = getHighlightClass({ isCorrectSequence, isFinished });

  const handleOnKeyPress = ({ charCode }) => {
    if (isFinished) {
      return;
    }

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
    if (isFinished) {
      return;
    }

    if (keyCode === KEYCODE_BACKSPACE) {
      setGameState({
        ...gameState,
        incorrectEntries:
          incorrectEntries.length > 0
            ? incorrectEntries.slice(0, -1)
            : incorrectEntries,
        isCorrectSequence: incorrectEntries.length <= 1,
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
        onKeyDown={handleOnKeyDown}
        type="text"
        autoFocus
      />
      <Prompt
        correctEntries={correctEntries}
        typingPrompt={typingPrompt}
        incorrectEntries={incorrectEntries}
        highlightClass={highlightClass}
      />
      <Stats wpm={wpm} accuracy={accuracy} />
    </div>
  );
}

export default App;
