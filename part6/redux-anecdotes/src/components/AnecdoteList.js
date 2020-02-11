import React from "react";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteList = props => {
  const handleVote = anecdote => {
    props.voteFor(anecdote);

    props.setNotification(`voted for '${anecdote.content}'`, 5000);
  };

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.includes(filter));
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
