import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const AnecdoteForm = ({ store }) => {
  const handleOnSubmit = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    store.dispatch(createAnecdote(content));
    event.target.anecdote.value = "";
    store.dispatch(notify(`added '${content}'`));
    setTimeout(() => store.dispatch({ type: "CLOSE" }), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
