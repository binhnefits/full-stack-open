import React from 'react';
import { connect } from 'react-redux';
import Blog from '../components/Blog';

const BlogList = props => {
  return (
    <div>
      {props.blogs.map(blogData => (
        <Blog key={blogData.id} blogData={blogData} />
      ))}
    </div>
  );
};

const blogToShow = ({ blogs }) => blogs.sort((a, b) => b.likes - a.likes);

const mapStateToProps = state => {
  return {
    blogs: blogToShow(state),
  };
};

export default connect(mapStateToProps, null)(BlogList);
