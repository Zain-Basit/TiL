import React from 'react';
import {
  screen,
  render,
  within,
  waitFor,
  cleanup,
} from '@testing-library/react';
import FactList from './FactList';

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

describe('FactList', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render in the document', () => {
    render(<FactList facts={[mockFact]} />);
    const factList = screen.getByTitle('facts-list-section');
    expect(factList).toBeInTheDocument();
  });

  it('should render the given fact in the fact list', () => {
    render(<FactList facts={[mockFact]} />);
    const factList = screen.getByTestId('facts-list-ul');
    const { getAllByRole } = within(factList);
    const fact = getAllByRole('listitem');
    const factText = fact.map((item) => item.textContent)[0];
    waitFor(() => expect(factText).toHaveTextContent(mockFact.text));
  });

  it('should show message with no facts if the fact list is empty', () => {
    render(<FactList facts={[]} />);
    const message = screen.getByText(
      'No facts for this category yet! Feel free to create the first one!',
    );
    expect(message).toBeInTheDocument();
  });

  it('should show the number of facts in the database', () => {
    render(<FactList facts={[mockFact]} />);
    const factList = screen.getByTitle('facts-list-section');
    expect(factList).toHaveTextContent(
      'There is 1 fact in the database. Please add your own!',
    );
  });
});
