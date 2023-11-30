import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Fact from './Fact';

const mockFact = {
  id: 1000,
  createdAt: '2023-11-12 08:04:04.380252+00',
  text: 'The first letter of the alphabet is A.',
  source: 'https://www.moma.org/collection/works/8827',
  category: 'society',
  votesInteresting: 10,
  votesMindblown: 15,
  votesFalse: 30,
};

describe('Fact', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render on the document', () => {
    render(<Fact fact={mockFact} setFacts={() => {}} />);
    const factElement = screen.getByTestId('fact-1000');
    expect(factElement).toBeInTheDocument();
  });

  it('should display the disputed tag', () => {
    render(<Fact fact={mockFact} setFacts={() => {}} />);
    const factElement = screen.getByTestId('fact-1000-p');
    expect(factElement).toContainHTML(
      '<span class="disputed">[⛔️ DISPUTED]</span>',
    );
  });

  it('should not display the disputed tag', () => {
    mockFact.votesFalse = 0;
    render(<Fact fact={mockFact} setFacts={() => {}} />);
    const factElement = screen.getByTestId('fact-1000-p');
    expect(factElement).not.toContainHTML(
      '<span class="disputed">[⛔️ DISPUTED]</span>',
    );
  });
});
