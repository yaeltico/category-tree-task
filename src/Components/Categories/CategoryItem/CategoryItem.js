import React, { useState, useRef, useEffect } from "react";
import CollapsibleButton from "../../UI/CollapsibleButton";
import ActionsMenu from "./ActionsMenu";

import classes from "./CategoryItem.module.css";

const CategoryItem = ({
  name,
  id,
  parentId,
  level,
  subCategories,
  generateCategoryTree,
  addCategoryHandler,
  deleteHandler,
  updateCategory,
}) => {
  const [expendSubTree, setExpendSubTree] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [category, setCategory] = useState(name);
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(true);

  const categoryInputRef = useRef();

  const hasSubCategories = subCategories && subCategories.length > 0;
  const indentFactor = (level - 1) * 10 + 5;

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
    setDisabled(true);
    updateCategory(category, id, parentId);
    setValid(category.length > 0);
  };

  const enterKeyHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      setDisabled(true);
    }
  };
  const onEditHandler = (e) => {
    setDisabled(false);
  };

  const newCategoryHandler = () => {
    setExpendSubTree(true);
    setOpenMenu(false);
    addCategoryHandler(id, level);
  };

  const inputClass = disabled ? classes.categoryDisabled : classes.categoryEdit;
  const subCategoriesList = generateCategoryTree(subCategories);

  return (
    <li
      role="listitem"
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
            autoFocus
            className={inputClass}
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

        {!valid && <span className={classes.invalid}>✗</span>}

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
