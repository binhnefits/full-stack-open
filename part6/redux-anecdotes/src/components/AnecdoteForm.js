import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify, suppress } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = props => {
  const handleOnSubmit = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content);
    event.target.anecdote.value = "";

    props.notify(`added '${content}'`);
    setTimeout(() => props.suppress(), 5000);
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

const mapDispatchToProps = {
  createAnecdote,
  notify,
  suppress
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
