import { useState, useEffect } from "react";
import supabase from "./supabase";

import "./styles.css";
export default App;

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  // Defining State Variables
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      setIsLoading(true);

      let query = supabase.from("til-facts").select("*");

      if (currentCategory !== "all") {
        query = query.eq("category", currentCategory);
      }

      async function getFacts() {
        let { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);
        if (!error) setFacts(facts);
        else alert("Could not load data at this time, please try again.");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      {/* Pass in the setShowForm prop to avoid errors */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* Based off state variable value, we show or hide the NewFactForm */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
      </main>
    </>
  );
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="The logo for the TiL App" />
        <h1>{appTitle}</h1>
      </div>{" "}
      {/* // Change the value of the state variable */}
      <button
        className="btn btn-large btn-share"
        onClick={() => setShowForm((c) => !c)}
      >
        {showForm ? "Close" : "Share a Fact"}
      </button>
    </header>
  );
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // Stop browser from reloading
    e.preventDefault();

    // Check if fact is valid
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // Create new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("til-facts")
        .insert([
          {
            text,
            source,
            category,
          },
        ])
        .select();
      setIsUploading(false);

      // Add fact to UI, so add it to the state
      // The spread (...) operater will take the old facts and expand it here
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // Reset input fields
      setText("");
      setSource("");
      setCategory("");

      // Close the forms
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the people..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Fact Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose Category</option>

        {CATEGORIES.map((cat) => (
          <option value={cat.name}>{cat.name.toUpperCase()}</option>
        ))}
      </select>
      <button className="btn btn-large btn-post" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => {
              setCurrentCategory("all");
            }}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category.name} className="category">
            <button
              style={{ backgroundColor: category.color }}
              className="btn btn-categories"
              onClick={() => {
                setCurrentCategory(category.name);
              }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

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
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p>
        There {facts.length === 1 ? "is" : "are"} {facts.length}{" "}
        {facts.length === 1 ? "fact" : "facts"} in the database. Please add your
        own!
      </p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblown < fact.votesFalse;


  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("til-facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);
    if (!error) setFacts((facts) => facts.map((f) => f.id === fact.id ? updatedFact[0] : f));
    
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
        <button onClick={()=>handleVote('votesInteresting')} disabled={isUpdating}>👍 {fact.votesInteresting}</button>
        <button onClick={()=>handleVote('votesMindblown')} disabled={isUpdating}>🤯 {fact.votesMindblown}</button>
        <button onClick={()=>handleVote('votesFalse')} disabled={isUpdating}>⛔️ {fact.votesFalse} </button>
      </div>
    </li>
  );
}
