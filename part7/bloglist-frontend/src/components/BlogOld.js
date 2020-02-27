import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ blog, curUser, updateBlog, deleteBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeHandle = async () => {
    const updatedBlog = await blogService.update(blog.id, {
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });
    updateBlog(updatedBlog);
  };

  const deleteHandle = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete blog: ${blog.title}`)) {
      await blogService.deleteBlog(blog.id);
      deleteBlog(blog.id);
    }
  };

  return (
    <div>
      <div
        style={blogStyle}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={() => {}}
        role="menuitem"
        tabIndex={0}
        className="blogTitle"
      >
        {blog.title} - {blog.author}
      </div>
      {isExpanded ? (
        <div style={blogStyle} className="blogInfo">
          <div>{blog.url}</div>
          <div>
            {blog.likes}{' '}
            <button type="button" onClick={likeHandle}>
              like
            </button>
          </div>
          <div>{`added by ${blog.user.username}`}</div>
          <div>
            {blog.user.username === curUser.username ? (
              <button type="button" onClick={deleteHandle}>
                delete
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  curUser: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
