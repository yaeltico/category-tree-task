import React, { useEffect, useState } from "react";
// import { List, AutoSizer } from "react-virtualized";
import { validateCategories, findCategoryById } from "../utils/categoryUtils";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import CategoryItem from "./CategoryItem/CategoryItem";
import Card from "../UI/Card";
import CollapsibleButton from "../UI/CollapsibleButton";
import SaveButton from "../UI/SaveButton";
import classes from "./CategoriesTree.module.css";

/**
 * Constants
 */
// const listHeight = 600;
// const rowHeight = 30;
// const rowWidth = 600;
const empty = "Empty";

const setNodeName = (id, name, list) => {
  const node = list.find((c) => c.id === id);
  node.name = name;
};

/**
 *      Component representing a tree of categories
 * */
const CategoriesTree = ({ categories, setCategories, onSaveAll }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setCategories(categories);
  }, []);

  /**
   *  save category tree to firebase
   */
  const saveAllHanlder = () => {
    // check each category before saving all
    const isValidSave = validateCategories(categories);

    if (isValidSave) {
      onSaveAll(categories);
      setShowSuccess(true);
    } else {
      setShowError(true);
    }
  };

  /**
   * delete category action handler
   */
  const deleteHandler = (id, parentId) => {
    // in case category in root
    if (parentId === null) {
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c.id !== id)
      );
    } else {
      const categoryItems = [...categories];
      const parent = findCategoryById(parentId, categoryItems);
      const newChildren = parent.subCategories.filter((c) => c.id !== id);
      parent.subCategories = [...newChildren];
      setCategories(categoryItems);
    }
  };

  /**
   * add new category handler to top level of the tree
   */
  const addRootCatgoryHandler = () => {
    const newCategory = {
      id: uuidv4(),
      parentId: null,
      name: "",
      level: 1,
      subCategories: [empty],
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  /**
   * add new category handler in sub trees
   */
  const addCategoryHandler = (parentId, parentLevel) => {
    const newCategory = {
      id: uuidv4(),
      parentId: parentId,
      name: "",
      level: parentLevel + 1,
      subCategories: [empty],
    };

    const categoryItems = [...categories];
    let parent = findCategoryById(parentId, categoryItems);
    if (parent.subCategories.length == 1 &&
      parent.subCategories.includes(empty)) {
      parent.subCategories.pop();
    }
    parent.subCategories.push(newCategory);
    setCategories([...categories]);
  };

  /**
   * update category name in the state
   * @param {*} name
   * @param {*} id
   * @param {*} parentId
   */
  const updateCategory = (name, id, parentId) => {
    const categoryItems = [...categories];
    // in case category in root
    if (parentId === null) {
      setNodeName(id, name, categoryItems);
    } else {
      const parent = findCategoryById(parentId, categoryItems);
      setNodeName(id, name, parent.subCategories);
    }
    setCategories(categoryItems);
  };

  // const rowRenderer = ({
  //   index, // Index of row
  //   key, // Unique key within array of rendered rows
  //   style, // Style object to be applied to row (to position it);
  //   // This must be passed through to the rendered row element.
  // }) => {
  //   const item = categories[index];
  //   return (
  //     <div key={key} style={style} className="row">
  //       <CategoryItem
  //         key={item.id}
  //         id={item.id}
  //         parentId={!item.parentId ? null : item.parentId}
  //         name={item.name}
  //         level={item.level}
  //         rootIndex={item.rootIndex}
  //         subCategories={!item.subCategories ? [] : item.subCategories}
  //         createTreeNodes={generateCategoryTree}
  //         addCategoryHandler={addCategoryHandler}
  //         deleteHandler={deleteHandler}
  //         saveCategory={saveCategory}
  //       ></CategoryItem>
  //     </div>
  //   );
  // };

  const generateCategoryTree = (items) => {
    // return (
    //   <List
    //     width={rowWidth}
    //     height={listHeight}
    //     rowHeight={rowHeight}
    //     rowRenderer={rowRenderer}
    //     rowCount={categories.length}
    //   />
    // );
    return items.map((item) => (
      <CategoryItem
        key={item.id}
        id={item.id}
        parentId={!item.parentId ? null : item.parentId}
        name={item.name}
        level={item.level}
        rootIndex={item.rootIndex}
        subCategories={
          (!item.subCategories || item.subCategories.includes(empty))
            ? []
            : item.subCategories
        }
        generateCategoryTree={generateCategoryTree}
        addCategoryHandler={addCategoryHandler}
        deleteHandler={deleteHandler}
        updateCategory={updateCategory}
      ></CategoryItem>
    ));
  };

  return (
    <section className={classes.categoris}>
      <Card>
        <div className={classes.container}>
          <CollapsibleButton />
          <h3 className={classes.title}>My Category Tree</h3>
        </div>

        <SaveButton
          onSave={saveAllHanlder}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          showError={showError}
          setShowError={setShowError}
        />

        <ul data-testid="tree">
          {categories &&
            categories.length > 0 &&
            generateCategoryTree(categories)}
        </ul>

        <button
          className={classes.newItemButton}
          onClick={() => addRootCatgoryHandler()}
        >
          <AiOutlinePlus />
          <span className={classes.newLabel}>Category item</span>
        </button>
      </Card>
    </section>
  );
};

export default CategoriesTree;
