import anecdotesService from "../services/anecdotes";

const acnecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote
      );
    case "VOTE":
      return state.map(anecdote =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes
    });
  };
};

export const voteFor = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    });
    console.log(updatedAnecdote);
    dispatch({
      type: "UPDATE",
      data: updatedAnecdote
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: "CREATE",
      data: newAnecdote
    });
  };
};

export default acnecdoteReducer;
