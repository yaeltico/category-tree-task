import React from "react"
import classes from "./ToggleButton.module.css";

/** Custom toggle button for unity across this app */
const ToggleButton = ({ type, onClick, className, disabled, children }) => {
  return (
    <button
      type={type || "button"}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
