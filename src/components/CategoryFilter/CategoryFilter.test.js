import React from 'react';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import CategoryFilter from './CategoryFilter';
import CATEGORIES from '../../Categories';

describe('CategoryFilter', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render on the document', () => {
    render(<CategoryFilter />);
    const categoryFilter = screen.getByTestId('category-menu');
    expect(categoryFilter).toBeInTheDocument();
  });

  it('should have the all categories button', () => {
    render(<CategoryFilter />);
    const categoryFilter = screen.getByTestId('category-menu');
    const allFilter = screen.getByTestId('category-all');
    expect(allFilter).toBeInTheDocument();
    expect(categoryFilter).toContainElement(allFilter);
  });

  it('should render each category onto the document', () => {
    render(<CategoryFilter />);
    const categoryList = screen.getByTestId('categories-list');
    // + 1 on the expect because the all button is not in the CATEGORIES list
    expect(categoryList.children).toHaveLength(CATEGORIES.length + 1);
  });

  it('should respond to click events', () => {
    const mockOnClick = jest.fn();
    render(<CategoryFilter setCurrentCategory={mockOnClick} />);
    const allFilter = screen.getByTestId('category-all-button');
    fireEvent.click(allFilter);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
