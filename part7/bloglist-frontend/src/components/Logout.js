import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const Logout = props => {
  return (
    <button type="button" onClick={props.logoutUser}>
      Logout
    </button>
  );
};

export default connect(null, { logoutUser })(Logout);
