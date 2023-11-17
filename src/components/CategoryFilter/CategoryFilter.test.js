import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import CategoryFilter from "./CategoryFilter";
import CATEGORIES from "../../Categories";

describe("CategoryFilter", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render on the document", () => {
    render(<CategoryFilter />);
    const categoryFilter = screen.getByTestId("category-menu");
    expect(categoryFilter).toBeInTheDocument();
  });

  test("should have the all categories button", () => {
    render(<CategoryFilter />);
    const categoryFilter = screen.getByTestId("category-menu");
    const allFilter = screen.getByTestId("category-all");
    expect(allFilter).toBeInTheDocument();
    expect(categoryFilter).toContainElement(allFilter);
  });

  test("should render each category onto the document", () => {
    render(<CategoryFilter />);
    const categoryList = screen.getByTestId("categories-list");
    expect(categoryList.children).toHaveLength(CATEGORIES.length + 1);
  });
});
