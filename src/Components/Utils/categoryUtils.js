/**
 * Constants
 */
// export const listHeight = 600;
// export const rowHeight = 30;
// export const rowWidth = 600;
export const empty = "EmptyDummy";
export const emptyString = "";

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
    if (curr) {
      if (curr.name == emptyString) {
        // invalid element found
        return false;
      } else if (curr.subCategories[0] != empty) {
        curr.subCategories &&
          curr.subCategories.forEach((element) => {
            queue.push(element);
          });
      }
    }
  }

  return true;
};

export const setNodeName = (id, name, list) => {
  const node = list.find((c) => c.id === id);
  node.name = name;
};
