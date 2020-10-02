import {
  ONE_MINUTE,
  TWO_MINUTES,
  APPROX_WORD_LENGTH,
  KEYCODE_SPACEBAR,
  KEYCODE_ENTER,
} from "./constants";

import { getText } from "../services/text";

export const getStats = ({
  timeElapsedInMs,
  correctEntries,
  incorrectEntries,
  keyStrokeCount,
}) => {
  const correctEntriesCount = correctEntries.length;
  const incorrectEntriesCount = incorrectEntries.length;
  const timeElapsedInMin = timeElapsedInMs / ONE_MINUTE;

  const grossWpm = keyStrokeCount / APPROX_WORD_LENGTH / timeElapsedInMin;

  const wpm = (grossWpm - incorrectEntriesCount / timeElapsedInMin).toFixed();
  const accuracy = ((correctEntriesCount / keyStrokeCount) * 100).toFixed();

  return {
    wpm: isFinite(wpm) && wpm > 0 ? wpm : null,
    accuracy: isFinite(accuracy) ? accuracy : null,
  };
};

export const getHighlightClass = ({ isCorrectSequence, isFinished }) => {
  if (isFinished) {
    return "highlight-finished";
  }

  if (isCorrectSequence) {
    return "highlight-correct";
  }

  return "highlight-warning";
};

export const getCharByCode = (charCode) => {
  if (charCode === KEYCODE_SPACEBAR) {
    return "_";
  }
  return String.fromCharCode(charCode);
};

export const getProgress = ({ timeElapsedInMs, isFinished }) => {
  if (isFinished) {
    return 100;
  }

  return 100 - ((timeElapsedInMs / TWO_MINUTES) * 100).toFixed();
};

export const isUnusedKeyPress = ({ charCode, isFinished }) => {
  if (charCode === KEYCODE_ENTER && !isFinished) {
    return true;
  }
  return false;
};

export const getInitialGameState = () => {
  const { text, author } = getText();

  const initialGameState = {
    typingPrompt: text,
    correctEntries: [],
    incorrectEntries: [],
    isCorrectSequence: true,
    keyStrokeCount: 0,
    typingPromptLength: text.length,
    author,
  };

  return initialGameState;
};
