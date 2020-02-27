import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = props => {
  const username = useField('text');
  const password = useField('password');

  const loginHandle = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);

      props.setUser(user);
    } catch (exception) {
      props.setNotification('wrong username or password', 'error', 5000);
    }

    username.reset();
    password.reset();
  };

  return (
    <form className="loginForm" onSubmit={loginHandle}>
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

export default connect(null, { setUser, setNotification })(LoginForm);
