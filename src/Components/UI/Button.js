import React from "react"
import classes from "./Button.module.css";

/** Custom button for unity across this app */
const Button = ({ type, onClick, className, disabled, children }) => {
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

export default Button;