import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4; //test score has value from 0 to 4
  const createPasswordLabel = () => {
    switch (
      testResult.score //test score has value from 0 to 4
    ) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Fear";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };
  const progressColor = () => {
    switch (
      testResult.score //test score has value from 0 to 4
    ) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9Bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };
  const changePasswordBarColor = () => ({
    width: `${num}%`,
    background: progressColor(),
    height: "7px",
  });
  return (
    <>
      <div className="progress w-100 h-100 mb-0 mt-1">
        <div className="progress-bar" style={changePasswordBarColor()}></div>
      </div>
      <p
        className="m-0 p-0"
        style={{ color: progressColor(), fontSize: "0.8rem" }}
      >
        {createPasswordLabel()}
      </p>
    </>
  );
};

export default PasswordStrengthMeter;
