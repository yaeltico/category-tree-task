import { v4 as uuidv4 } from "uuid";

const rowCount = 1000;
export const bigList = Array(rowCount)
  .fill()
  .map(() => {
    return {
      id: uuidv4(),
      parentId: null,
      name: "Dogs",
      level: 1,
      subCategories: [],
    };
  });

const parent1 = uuidv4();
const parent2 = uuidv4();
const parent3 = uuidv4();
const parent4 = uuidv4();
export const demoCategories = [
  {
    id: parent1,
    parentId: null,
    name: "Dogs",
    level: 1,
    subCategories: [
      {
        id: uuidv4(),
        parentId: parent1,
        name: "Golden Retriever",
        level: 2,
        subCategories: [],
      },
      {
        id: uuidv4(),
        parentId: parent1,
        name: "Lavrador Retriever",
        level: 2,
        subCategories: [],
      },
    ],
  },
  {
    id: parent2,
    parentId: null,
    name: "Hourses",
    level: 1,
    subCategories: [],
  },
  {
    id: parent3,
    parentId: null,
    name: "Cats",
    level: 1,
    subCategories: [
      {
        id: parent4,
        parentId: parent3,
        name: "Home Cats",
        level: 2,
        subCategories: [
          {
            id: uuidv4(),
            parentId: parent4,
            name: "Abyssinian Cat",
            level: 3,
            subCategories: [],
          },
          {
            id: uuidv4(),
            parentId: parent4,
            name: "Bengal Cat",
            level: 3,
            subCategories: [],
          },
        ],
      },
    ],
  },
];
