import React from "react"
import ToggleButton from "./ToggleButton";

import classes from "./CollapsibleButton.module.css";

const CollapsibleButton = ({ disabled, expend, onToggle }) => {

  return (
    <div>
      <ToggleButton onClick={onToggle} disabled={disabled}>
        <span
          className={classes.arrow}
          style={{ transform: `rotateZ(${expend ? "90deg" : 0})` }}
        >
          {"≻"}
        </span>
      </ToggleButton>
    </div>
  );
};

export default CollapsibleButton;
