import React from 'react';
import {
  render, screen, waitFor, cleanup,
} from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render in the document', () => {
    render(<Header />);
    // HTML header element is identical to banner, so I can use it in this case to grab it.
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Today I Learned', { exact: false });
  });

  it('should show "Close" or "Share a Fact" based off the value of the showForm variable', () => {
    const { rerender } = render(<Header showForm={false} />);

    const share = screen.findByTestId('header-button');
    waitFor(() => expect(share).not.toHaveTextContent('Close'));

    rerender(<Header showForm />);
    waitFor(() => expect(share).toHaveTextContent('Close'));
    waitFor(() => expect(share).not.toHaveTextContent('Share a Fact'));
  });
});
