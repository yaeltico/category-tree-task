import React from "react";
import ToggleButton from "../UI/ToggleButton";
import { RiPlayListAddFill, RiDeleteBin2Line } from "react-icons/ri";
import Hover from "../UI/Hover";

import classes from "./ActionsMenu.module.css";

// const Hover = ({ onHover, children }) => (
//   <div className={classes.hover}>
//     <div className={classes.hoverNoHover}>{children}</div>
//     <div className={classes.hoverHover}>{onHover}</div>
//   </div>
// );

const ActionsMenu = ({ onDelete, onAddCategory, level, open, onToggle }) => {
  const actions = [
    {
      key: "new",
      name: "Category item",
      icon: <RiPlayListAddFill />,
      action: onAddCategory,
      level: level,
    },
    {
      key: "delete",
      name: "Delete",
      icon: <RiDeleteBin2Line />,
      action: onDelete,
    },
  ];

  const actionItems = actions.map((item) => (
    <li key={item.key} onClick={item.action}>
      <div className={classes.actionContainer}>
        <div className={classes.action}>{item.name}</div>
        {item.icon}
      </div>
    </li>
  ));

  return (
    <div className={classes.container}>
      <ToggleButton onClick={onToggle}>☰</ToggleButton>
      {open && (
        <Hover>
          <div className={classes.dropdown}>
            <ul className={classes.noHover}>{actionItems}</ul>
            <div className={classes.onHover}></div>
          </div>
        </Hover>
      )}
    </div>
  );
};

export default ActionsMenu;
