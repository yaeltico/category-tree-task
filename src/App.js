import React, { useEffect, Fragment, useState, useCallback } from "react";
import CategoriesTree from "./Components/Categories/CategoriesTree";
import { bigList, demoCategories } from "./Components/Utils/defaultDb";
import classes from "./App.module.css";


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
  // console.log(data);
};

function App() {
  const [categories, setCategories] = useState(demoCategories);
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
      // setCategories(loadedTree);
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
      categories={categories}
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
