import { useState, React } from "react";
import supabase from "../../supabase.js";
import CATEGORIES from "../../Categories.js";

function Fact({ fact, setFacts }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const isDisputed =
      fact.votesInteresting + fact.votesMindblown < fact.votesFalse;
  
    async function handleVote(columnName) {
      setIsUpdating(true);
      const { data: updatedFact, error } = await supabase
        .from("til-facts")
        .update({ [columnName]: fact[columnName] + 1 })
        .eq("id", fact.id)
        .select();
      setIsUpdating(false);
      if (!error)
        setFacts((facts) =>
          facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
        );
    }
  
    return (
      <li className="fact">
        <p>
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
            onClick={() => handleVote("votesInteresting")}
            disabled={isUpdating}
          >
            👍 {fact.votesInteresting}
          </button>
          <button
            onClick={() => handleVote("votesMindblown")}
            disabled={isUpdating}
          >
            🤯 {fact.votesMindblown}
          </button>
          <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
            ⛔️ {fact.votesFalse}{" "}
          </button>
        </div>
      </li>
    );
  }

  export default Fact;