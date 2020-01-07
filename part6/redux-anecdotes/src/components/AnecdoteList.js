import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState();

  const showAnecdotes = () =>
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => store.dispatch(voteFor(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ));

  return <div>{showAnecdotes()}</div>;
};

export default AnecdoteList;
