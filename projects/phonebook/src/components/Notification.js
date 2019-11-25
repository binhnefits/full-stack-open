import React from "react";

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }

  let notificationStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  if (messageType === "info") {
    notificationStyle = { ...notificationStyle, color: "green" };
  } else if (messageType === "error") {
    notificationStyle = { ...notificationStyle, color: "red" };
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
