import React, { useEffect, useState } from "react";
// import { List, AutoSizer } from "react-virtualized";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import CategoryItem from "./CategoryItem/CategoryItem";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./Categories.module.css";

const findCategoryById = (id, list) => {
  const queue = [];
  list.forEach((element) => {
    queue.push(element);
  });
  while (queue.length) {
    const curr = queue.pop();
    if (curr.id === id) {
      // element found
      return curr;
    } else {
      curr.subCategories &&
        curr.subCategories.forEach((element) => {
          queue.push(element);
        });
    }
  }
};

const setNodeName = (id, name, list) => {
  const node = list.find((c) => c.id === id);
  node.name = name;
};

/**
 * Constants
 */
// const listHeight = 600;
// const rowHeight = 30;
// const rowWidth = 600;

/**
 *      Component representing a tree of categories
 * */
const CategoriesTree = ({ categories, setCategories, onSaveAll }) => {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    // console.log("tree",tree);
    setCategories(categories);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSaved(false);
    }, 3000);
    console.log("timeout");

    return () => clearTimeout(timer);
  }, [showSaved]);

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

  const addRootCatgoryHandler = () => {
    const newCategory = {
      id: uuidv4(),
      parentId: null,
      name: "",
      level: 1,
      subCategories: [],
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const addCategoryHandler = (parentId, parentLevel) => {
    const newCategory = {
      id: uuidv4(),
      parentId: parentId,
      name: "",
      level: parentLevel + 1,
      subCategories: [],
    };
    const categoryItems = [...categories];
    const parent = findCategoryById(parentId, categoryItems);
    parent.subCategories.push(newCategory);
    setCategories(categoryItems);
  };
  // console.log("after render", categories);

  const saveCategory = (name, id, parentId) => {
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
        subCategories={!item.subCategories ? [] : item.subCategories}
        createTreeNodes={generateCategoryTree}
        addCategoryHandler={addCategoryHandler}
        deleteHandler={deleteHandler}
        saveCategory={saveCategory}
      ></CategoryItem>
    ));
  };

  const saveHanlder = () => {
    setShowSaved(true);
    onSaveAll(categories);
  };

  return (
    <section className={classes.categoris}>
      <Card>
        <h3 className={classes.title}>Animals</h3>
        <div className={classes.saveContainer}>
          <div className={classes.save}>
            {showSaved && <span className={classes.savedLabel}>✓ Saved</span> }
            <Button onClick={saveHanlder}>Save</Button>
          </div>
        </div>
        <ul>
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
