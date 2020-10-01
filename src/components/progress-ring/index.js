import React from "react";
import "./index.css";

const ONE_HUNDRED = 100;
const TWO = 2;

const ProgressRing = ({ radius, stroke, progress }) => {
  const normalizedRadius = radius - stroke * TWO;
  const circumference = normalizedRadius * TWO * Math.PI;

  const strokeDashoffset =
    circumference - (progress / ONE_HUNDRED) * circumference;

  return (
    <svg height={radius * TWO} width={radius * TWO}>
      <circle
        stroke="#222f3e"
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
