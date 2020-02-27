import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = props => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const onSubmit = event => {
    event.preventDefault();
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    props.setNotification(
      `${title.value} by ${author.value} created`,
      'info',
      5000,
    );
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

export default connect(null, { createBlog, setNotification })(BlogForm);
