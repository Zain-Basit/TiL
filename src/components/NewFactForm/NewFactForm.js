import React from "react";
import { useState } from "react";
import { isValidHttpUrl } from "../../utils/helpers.js";
import supabase from "../../supabase.js";
import CATEGORIES from "../../Categories.js";

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

export default NewFactForm;
