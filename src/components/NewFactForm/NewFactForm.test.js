import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewFactForm from './NewFactForm';

describe('NewFactForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render in the document', () => {
    render(<NewFactForm />);
    const newFactForm = screen.getByPlaceholderText(
      'Share a fact with the people...',
    );
    expect(newFactForm).toBeInTheDocument();
  });

  it('should decrement the count based off the length of the text', () => {
    render(<NewFactForm />);
    const newFactForm = screen.getByPlaceholderText(
      'Share a fact with the people...',
    );
    userEvent.type(newFactForm, '12345');
    const wordCount = screen.getByText('195');
    expect(wordCount).toHaveTextContent('195');
  });

  it('should let the user choose a category', () => {
    render(<NewFactForm />);
    const categoryPicker = screen.getByRole('combobox');
    userEvent.selectOptions(categoryPicker, 'technology');
    expect(categoryPicker).toHaveValue('technology');
  });
});
