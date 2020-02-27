import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data];
    case 'INIT':
      return action.data;
    case 'UPDATE':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog,
      );
    case 'DELETE':
      return state.filter(blog => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs,
    });
  };
};

export const createBlog = newBlog => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog);
    dispatch({
      type: 'CREATE',
      data: createdBlog,
    });
  };
};

// export const updateBlog = (id, blogToUpdate) => {
//   return async dispatch => {
//     const updatedBlog = await blogService.update(id, blogToUpdate);
//     dispatch({
//       type: 'UPDATE',
//       data: updatedBlog,
//     });
//   };
// };

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id);
    dispatch({
      type: 'DELETE',
      data: { id },
    });
  };
};

export const likeBlog = blogData => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogData.id, {
      likes: blogData.likes + 1,
    });
    dispatch({
      type: 'UPDATE',
      data: updatedBlog,
    });
  };
};

export default blogReducer;
