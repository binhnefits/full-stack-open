import React, { useEffect } from "react";
import { connect } from "react-redux";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { initAnecdotes } from "./reducers/anecdoteReducer";
import anecdotesService from "./services/anecdotes";

const App = props => {
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => props.initAnecdotes(anecdotes));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(null, { initAnecdotes })(App);
