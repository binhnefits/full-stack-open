import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <SimpleBlog
        blog={{ author: 'binh pham', title: 'a blog', likes: 1 }}
        onClick={mockHandler}
      />,
    );
  });

  test('component has correct content', () => {
    expect(component.getByText('a blog binh pham')).toBeDefined();
    expect(component.getByText('blog has 1 likes')).toBeDefined();
  });

  test('button activates twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
