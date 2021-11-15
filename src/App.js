import React, { useEffect, Fragment, useState, useCallback } from "react";
import CategoriesTree from "./components/Categories/CategoriesTree";
import { bigList, demoCategories } from "./components/utils/defaultDb";
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
        "https://category-db-5f496-default-rtdb.europe-west1.firebasedatabase.app/categories.json?orderBy=\"$key\"&limitToLast=1"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const results = data && Object.values(data);
      let loadedTree = [];
      if (results) {
        loadedTree = results[0].map((category) => ({
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
