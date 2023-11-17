import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Category from "./Category";

var mockCategory;

describe("Category", () => {
  beforeEach(() => {
    mockCategory = { name: "technology", color: "#3b82f6" };
  });

  afterEach(() => {
    cleanup();
  });

  test("should render on the document", () => {
    render(<Category category={mockCategory} />);
    const cat = screen.getByTestId(`category-${mockCategory.name}`);
    expect(cat).toBeInTheDocument();
  });
});
