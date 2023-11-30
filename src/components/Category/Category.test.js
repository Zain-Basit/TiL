import React from 'react';
import {
  render, screen, cleanup, fireEvent,
} from '@testing-library/react';
import Category from './Category';

let mockCategory;

describe('Category', () => {
  beforeEach(() => {
    mockCategory = { name: 'technology', color: '#3b82f6' };
  });

  afterEach(() => {
    cleanup();
  });

  it('should render on the document', () => {
    render(<Category category={mockCategory} />);
    const cat = screen.getByTestId(`category-${mockCategory.name}`);
    expect(cat).toBeInTheDocument();
    expect(cat).toHaveTextContent(mockCategory.name);
  });

  it('should respond to click events', () => {
    const mockOnClick = jest.fn();
    render(
      <Category category={mockCategory} setCurrentCategory={mockOnClick} />,
    );
    const techButton = screen.getByTestId('category-technology-button');
    fireEvent.click(techButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
