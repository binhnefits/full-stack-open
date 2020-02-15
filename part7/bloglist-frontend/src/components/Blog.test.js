import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const updateBlogHandler = jest.fn();
  const deleteBlogHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={{
          author: 'binh pham',
          title: 'a blog',
          likes: 1,
          url: 'url.com',
          user: { username: 'binhp' },
        }}
        curUser={{ username: 'binhp' }}
        updateBlog={updateBlogHandler}
        deleteBlog={deleteBlogHandler}
      />,
    );
  });

  test('component has correct content before and after clicked', () => {
    const blogTitle = component.container.querySelector('.blogTitle');
    expect(blogTitle).toBeVisible();

    fireEvent.click(blogTitle);
    const blogInfo = component.container.querySelector('.blogTitle');
    expect(blogInfo).toBeDefined();
  });
});
