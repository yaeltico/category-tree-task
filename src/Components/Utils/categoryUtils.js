export const findCategoryById = (id, list) => {
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

  return null;
};

export const validateCategories = (list) => {
  const queue = [];
  list.forEach((element) => {
    queue.push(element);
  });
  while (queue.length) {
    const curr = queue.pop();
    if (curr.name && curr.name.length == 0) {
      // invalid element found
      return false;
    } else {
      curr.subCategories &&
        curr.subCategories.forEach((element) => {
          queue.push(element);
        });
    }
  }

  return true;
};

  