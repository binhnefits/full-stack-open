const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return {
        message: action.message,
        messageType: action.messageType,
      };
    case 'SUPPRESS':
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, messageType, timeout) => {
  return dispatch => {
    dispatch({ type: 'NOTIFY', message, messageType });
    setTimeout(() => dispatch({ type: 'SUPPRESS' }), timeout);
  };
};

export default notificationReducer;
