import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';

const BlogForm = ({ handleBlogSubmit }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const onSubmit = event => {
    event.preventDefault();
    handleBlogSubmit({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      Title <input value={title.value} onChange={title.onChange} />
      Author <input value={author.value} onChange={author.onChange} />
      URL <input value={url.value} onChange={url.onChange} />
      <button type="submit"> Save </button>
    </form>
  );
};

BlogForm.propTypes = {
  handleBlogSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
