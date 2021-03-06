import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'UNSET_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = user => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      user,
    });
  };
};

export const initUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token);
      dispatch({
        type: 'SET_USER',
        user: loggedUser,
      });
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser');
    window.localStorage.clear();
    dispatch({
      type: 'UNSET_USER',
    });
  };
};

export default userReducer;
