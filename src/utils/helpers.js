import {
  ONE_MINUTE,
  TWO_MINUTES,
  APPROX_WORD_LENGTH,
  KEYCODE_SPACEBAR,
} from "./constants";

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

export const isUnusedKeyPress = (charCode) => {
  return false; // TODO IMPLEMENT
};
