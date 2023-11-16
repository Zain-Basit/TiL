import { useState, useEffect } from "react";
import "./styles.css";

import Loader from "./components/Loader/Loader.js";
import Header from "./components/Header/Header.js";
import NewFactForm from "./components/NewFactForm/NewFactForm.js";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter.js";
import FactList from "./components/FactList/FactList.js";

import supabase from "./supabase";

export default App;

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
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}