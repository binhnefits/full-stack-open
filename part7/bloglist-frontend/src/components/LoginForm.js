import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';

const Login = ({ handleLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const onSubmit = event => {
    event.preventDefault();
    handleLogin({ username: username.value, password: password.value });
    username.reset();
    password.reset();
  };

  return (
    <form className="loginForm" onSubmit={onSubmit}>
      <div>
        username
        <input
          type={username.type}
          value={username.value}
          onChange={username.onChange}
        />
      </div>
      <div>
        password
        <input
          type={password.type}
          value={password.value}
          onChange={password.onChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
