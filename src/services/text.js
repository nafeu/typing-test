/*
    Quotes from: https://type.fit/api/quotes
*/

import quotes from "./data/quotes.json";

const MINIMUM_LETTER_COUNT = 50;

const filteredQuotes = quotes.filter(({ text }) => {
  return text.length >= MINIMUM_LETTER_COUNT;
});

export const getText = () => {
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
};
