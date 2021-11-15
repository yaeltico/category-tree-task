import React, { useState, useEffect } from "react";
import Button from "./Button";

import classes from "./SaveButton.module.css";

const SaveButton = ({
  onSave,
  showSuccess,
  setShowSuccess,
  showError,
  setShowError,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [showError]);

  return (
    <div className={classes.saveContainer}>
      <div className={classes.save}>
        {showSuccess && (
          <span className={classes.savedLabel} data-testid="saved-label">
            ✓ Saved
          </span>
        )}
        {showError && (
          <span className={classes.errorLabel} data-testid="error">
            ✗ Failed to save empty categories
          </span>
        )}
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default SaveButton;
