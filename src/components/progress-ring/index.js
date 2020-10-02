import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBolt } from "@fortawesome/free-solid-svg-icons";

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
    <React.Fragment>
      <svg className="progress-ring" height={radius * TWO} width={radius * TWO}>
        <circle
          stroke={getStroke()}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{
            strokeDashoffset: strokeDashoffset ? strokeDashoffset : 0,
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="progress-check">
        <FontAwesomeIcon
          icon={isFinished ? faCheck : faBolt}
          color={getStroke()}
        />
      </div>
    </React.Fragment>
  );
};

export default ProgressRing;
