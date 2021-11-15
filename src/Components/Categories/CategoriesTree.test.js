import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import CategoriesTree from "./CategoriesTree";
import { demoCategories } from "../utils/defaultDb";

describe("CategoriesTree Component", () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  const setCategories = jest.fn();
  
  test("render tree title as text", () => {
    // Arrange
    act(() => {
      render(<CategoriesTree setCategories={setCategories} />);
    });

    // Assert
    const titleElement = screen.getByText("My Category Tree");
    expect(titleElement).toBeInTheDocument();
  });

  test("render category tree to display all categories", () => {
    // Arrange
    const { getByTestId, getAllByRole } = render(
      <CategoriesTree
        setCategories={setCategories}
        categories={demoCategories}
      />
    );

    // Act
    const tree = getByTestId("tree");
    const listItemElements = within(tree).getAllByRole("listitem");

    // Assert
    expect(listItemElements).not.toHaveLength(0);
    expect(listItemElements).toHaveLength(listItemElements.length);
  });
});
