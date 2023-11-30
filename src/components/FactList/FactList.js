import React from 'react';
import Fact from '../Fact/Fact';

function FactList({ facts, setFacts }) {
  // If there are no facts in this category
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Feel free to create the first one!
      </p>
    );
  }

  return (
    <section title="facts-list-section">
      <ul data-testid="facts-list-ul" className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>
        There
        {' '}
        {facts.length === 1 ? 'is' : 'are'}
        {' '}
        {facts.length}
        {' '}
        {facts.length === 1 ? 'fact' : 'facts'}
        {' '}
        in the database. Please add your
        own!
      </p>
    </section>
  );
}

export default FactList;
