import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader Test', () => {
  it('should render on the page', () => {
    render(<Loader />);
    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });
});
