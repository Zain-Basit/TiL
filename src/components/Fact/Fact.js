import { useState, React } from 'react';
import supabase from '../../supabase';
import CATEGORIES from '../../Categories';

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblown < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from('til-facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    setIsUpdating(false);
    if (!error) setFacts((facts) => facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)));
  }

  return (
    <li data-testid={`fact-${fact.id}`} className="fact">
      <p data-testid={`fact-${fact.id}-p`}>
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
        {fact.text}
        <a
          className="source"
          rel="noreferrer"
          href={fact.source}
          target="_blank"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          type="button"
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
        >
          👍
          {' '}
          {fact.votesInteresting}
        </button>
        <button
          type="button"
          onClick={() => handleVote('votesMindblown')}
          disabled={isUpdating}
        >
          🤯
          {' '}
          {fact.votesMindblown}
        </button>
        <button
          type="button"
          onClick={() => handleVote('votesFalse')}
          disabled={isUpdating}
        >
          ⛔️
          {' '}
          {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Fact;
