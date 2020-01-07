import React from "react";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = ({ store }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} />
      <AnecdoteForm store={store} />
    </div>
  );
};

export default App;
