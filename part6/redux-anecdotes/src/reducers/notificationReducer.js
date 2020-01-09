const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.message;
    case "CLOSE":
      return null;
    default:
      return state;
  }
};

export const notify = message => {
  return {
    type: "NOTIFY",
    message
  };
};

export default notificationReducer;
