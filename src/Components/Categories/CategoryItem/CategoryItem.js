import React, { useState, useRef } from "react";
import CollapsibleButton from "../CollapsibleButton";
import ActionsMenu from "../ActionsMenu";

import classes from "./CategoryItem.module.css";

const CategoryItem = ({
  name,
  id,
  parentId,
  level,
  subCategories,
  createTreeNodes,
  addCategoryHandler,
  deleteHandler,
  setValidateSave,
  saveCategory,
}) => {
  const hasSubCategories = subCategories && subCategories.length > 0;
  const indentFactor = ((level - 1) * 10) + 5;
  const [expendSubTree, setExpendSubTree] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [category, setCategory] = useState(name);
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(true);
  const categoryInputRef = useRef();

  const validateNameNotEmpty = (name) => {
    const isValid = name.length !== 0;
    setValid(isValid);

    // if(!isValid) {
    //   setValidateSave(false);
    // }
  };

  const toggleMenuHandler = () => {
    setOpenMenu((prevState) => !prevState);
  };

  const toggleCategoryHandler = () => {
    setExpendSubTree((prevState) => !prevState);
  };

  const onNameChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const finishCurrentEditHandler = () => {
    // console.log("finish edit", category, parentId);
    setDisabled(true);
    if(category){
      validateNameNotEmpty(category);
      saveCategory(category, id, parentId);
    }
  };

  const enterKeyHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      setDisabled(true);
    }
  }
  const onEditHandler = (e) => {
    setDisabled(false);
  };

  const newCategoryHandler = () => {
    setExpendSubTree(true);
    setOpenMenu(false);
    addCategoryHandler(id, level);
    
  };

  const inputClass = disabled ? classes.categoryDisabled : classes.categoryEdit;
  const subCategoriesList = createTreeNodes(subCategories);

  return (
    <li
      key={id}
      style={{ paddingLeft: `${indentFactor}px` }}
      className={classes.row}
    >
      <div className={classes.container}>
        <CollapsibleButton
          disabled={!hasSubCategories}
          expend={expendSubTree}
          onToggle={toggleCategoryHandler}
        />
        <div className={classes.category}>
          <input
            className={`${inputClass} ${!valid && classes.invalidName}`}    
            ref={categoryInputRef}
            type="text"
            value={category}
            onChange={onNameChangeHandler}
            onFocus={onEditHandler}
            onBlur={finishCurrentEditHandler}
            placeholder="Category..."
            onKeyPress={enterKeyHandler}
          />
        </div>
        <ActionsMenu
          open={openMenu}
          onToggle={toggleMenuHandler}
          onAddCategory={newCategoryHandler}
          onDelete={() => deleteHandler(id, parentId)}
        />
      </div>

      {expendSubTree && subCategoriesList}
    </li>
  );
};

export default CategoryItem;
