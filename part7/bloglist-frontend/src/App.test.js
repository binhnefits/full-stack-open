import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs');

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    await waitForElement(() => component.container.querySelector('.loginForm'));

    const loginForm = component.container.querySelector('.loginForm');
    expect(loginForm).toBeDefined();

    const blogs = component.container.querySelectorAll('.blogTitle');
    expect(blogs).toHaveLength(0);
  });

  test('blogs is shown if user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '123',
      name: 'test',
    };

    localStorage.setItem('loggedUser', JSON.stringify(user));

    const component = render(<App />);
    await waitForElement(() =>
      component.container.querySelectorAll('.blogTitle'),
    );

    const blogs = component.container.querySelectorAll('.blogTitle');
    expect(blogs).toHaveLength(3);
  });
});
