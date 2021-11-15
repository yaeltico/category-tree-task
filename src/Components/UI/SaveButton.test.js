import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import SaveButton from "./SaveButton";

describe("SaveButton Component", () => {
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

  const onSaveAll = jest.fn();
  test("render button to hode success text at start", () => {
    // Arrange
    const { getByTestId } = render(
      <SaveButton show={true} onSave={onSaveAll} />
    );

    // Act
    const label = screen.queryByText("error");

    //Assert
    expect(label).not.toBeInTheDocument();
  });

  test("render button to hide error text at start", () => {
    // Arrange
    render(<SaveButton show={false} onSave={onSaveAll} />);

    // Act
    const label = screen.queryByText("saved-label");

    //Assert
    expect(label).not.toBeInTheDocument();
  });
});
