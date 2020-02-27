const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const setUser = loggedUser => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      data: loggedUser,
    });
  };
};

export default userReducer;
