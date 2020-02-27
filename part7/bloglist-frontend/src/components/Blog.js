import React, { useState } from 'react';
import { connect } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

const Blog = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, title, author, url, user, likes } = props.blogData;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteHandle = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete blog: ${title}`)) {
      props.deleteBlog(id);
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
        {title} - {author}
      </div>
      {isExpanded ? (
        <div style={blogStyle} className="blogInfo">
          <div>{url}</div>
          <div>
            {likes}{' '}
            <button type="button" onClick={() => props.likeBlog()}>
              like
            </button>
          </div>
          <div>{`added by ${user.username}`}</div>
          <div>
            {props.blogData.user.username === props.curUser.username ? (
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

const mapStateToProps = state => {
  return {
    curUser: state.user,
  };
};

export default connect(mapStateToProps, { likeBlog, deleteBlog })(Blog);
