import React, { useEffect, Fragment, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import CategoriesTree from "./Components/Categories/CategoriesTree";

import classes from "./App.module.css";

const rowCount = 1000;
const bigList = Array(rowCount).fill().map(() => {
    return {
      id: uuidv4(),
      parentId: null,
      name: "Dogs",
      level: 1,
      subCategories: [],
    };
  });
const demoCategories = [
  {
    id: "0",
    parentId: null,
    name: "Dogs",
    level: 0,
    subCategories: [
      {
        id: "00",
        parentId: "0",
        name: "Golden Retriever",
        level: 1,
        subCategories: [],
      },
      {
        id: "01",
        parentId: "0",
        name: "Lavrador Retriever",
        level: 1,
        subCategories: [],
      },
    ],
  },
  {
    id: "1",
    parentId: null,
    name: "Hourses",
    level: 0,
    subCategories: [],
  },
  {
    id: "2",
    parentId: null,
    name: "Cats",
    level: 0,
    subCategories: [
      {
        id: "20",
        parentId: "2",
        name: "Home Cats",
        level: 1,
        subCategories: [
          {
            id: "200",
            parentId: "20",
            name: "Abyssinian Cat",
            level: 2,
            subCategories: [],
          },
          {
            id: "201",
            parentId: "20",
            name: "Bengal Cat",
            level: 2,
            subCategories: [],
          },
        ],
      },
    ],
  },
];

const saveAllCategoriesHandler = async (categories) => {
  // save categories to firbase
  const response = await fetch(
    "https://category-db-5f496-default-rtdb.europe-west1.firebasedatabase.app/categories.json",
    {
      method: "POST",
      body: JSON.stringify(categories),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

function App() {
  const [categories, setCategories] = useState([]);
  const [isLodaing, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategoryTreeHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // retrieve categories from firbase
    try {
      const response = await fetch(
        "https://category-db-5f496-default-rtdb.europe-west1.firebasedatabase.app/categories.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      // Object.values(data).forEach((tree) => {
      //   console.log("tree app", tree);
      //   setTree(tree);
      // });
      const values = data && Object.values(data);
      // console.log("values", values);
      let loadedTree = [];
      if (values && values.length > 0) {
        // get last tree version
        loadedTree = values[values.length - 1].map((category) => ({
          id: category.id,
          parentId: category.parentId ? category.parentId : null,
          name: category.name,
          level: category.level,
          subCategories: category.subCategories ? category.subCategories : [],
        }));
      }
      setCategories(loadedTree);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // console.log(categories);
  useEffect(() => {
    // fetch data once
    fetchCategoryTreeHandler();
  }, [fetchCategoryTreeHandler]);

  let mainContent = categories && (
    <CategoriesTree
      categories={bigList}
      setCategories={setCategories}
      onSaveAll={saveAllCategoriesHandler}
    />
  );

  if (error) {
    mainContent = <div className={classes.centered}>{error}</div>;
  }
  if (isLodaing) {
    mainContent = <div className={classes.centered}>Loading...</div>;
  }
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Category Tree View</h1>
      </header>
      <main>{mainContent}</main>
    </Fragment>
  );
}

export default App;
