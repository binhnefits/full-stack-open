import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    window.localStorage.clear();

    setUser(null);
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

Logout.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Logout;
