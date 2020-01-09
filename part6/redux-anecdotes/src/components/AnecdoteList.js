import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();

  const handleVote = anecdote => {
    store.dispatch(voteFor(anecdote.id));
    store.dispatch(notify(`voted for '${anecdote.content}'`));
    setTimeout(() => store.dispatch({ type: "CLOSE" }), 5000);
  };

  const showAnecdotes = () =>
    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.includes(filter))
      .map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ));

  return <div>{showAnecdotes()}</div>;
};

export default AnecdoteList;
