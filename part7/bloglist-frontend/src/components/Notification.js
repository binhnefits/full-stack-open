import React from 'react';
import { connect } from 'react-redux';

const Notification = props => {
  if (props.notification === null) {
    return null;
  }

  const { message, messageType } = props.notification;
  return <div className={messageType}>{message}</div>;
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps, null)(Notification);
