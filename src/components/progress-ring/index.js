import React from "react";
import "./index.css";

const ONE_HUNDRED = 100;
const TWO = 2;

const ProgressRing = ({
  radius,
  stroke,
  progress,
  hasStartedTyping,
  isFinished,
}) => {
  const normalizedRadius = radius - stroke * TWO;
  const circumference = normalizedRadius * TWO * Math.PI;

  const strokeDashoffset =
    circumference - (progress / ONE_HUNDRED) * circumference;

  const getStroke = () => {
    if (isFinished) {
      return "#01a3a4";
    }

    if (hasStartedTyping) {
      return "#5f27cd";
    }

    return "#e9eaeb";
  };

  return (
    <svg height={radius * TWO} width={radius * TWO}>
      <circle
        stroke={getStroke()}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        stroke-width={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressRing;
