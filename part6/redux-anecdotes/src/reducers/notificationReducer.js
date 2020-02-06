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

export const notify = message => {
  return {
    type: "NOTIFY",
    message
  };
};

export const suppress = () => {
  return {
    type: "SUPPRESS"
  };
};

export default notificationReducer;
