const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.message;
    case "SUPPRESS":
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch({ type: "NOTIFY", message });
    setTimeout(() => dispatch({ type: "SUPPRESS" }), timeout);
  };
};

export default notificationReducer;
