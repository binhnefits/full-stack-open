import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/BlogOld';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import { initBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
import { connect } from 'react-redux';
import BlogList from './components/BlogList';

const App = props => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notifMsg, setNotifMsg] = useState(null);
  const [notifMsgType, setNotifMsgType] = useState('info');

  useEffect(() => {
    // const getBlogs = async () => {
    //   const initialBlogs = await blogService.getAll();
    //   setBlogs(initialBlogs);
    // };
    // getBlogs();
    props.initBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      props.setUser(loggedUser);
    }
  }, []);

  const addBlog = newBlog => setBlogs([...blogs, newBlog]);

  const updateBlog = updatedBlog =>
    setBlogs(
      blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );

  const deleteBlog = deleteBlogId =>
    setBlogs(blogs.filter(blog => blog.id !== deleteBlogId));

  const showBlogs = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          curUser={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ));

  const handleLogin = async credentials => {
    try {
      const requestedUser = await loginService.login(credentials);

      window.localStorage.setItem('loggedUser', JSON.stringify(requestedUser));
      blogService.setToken(requestedUser.token);

      setUser(requestedUser);
    } catch (exception) {
      setNotifMsg('wrong username or password');
      setNotifMsgType('error');
      setTimeout(() => {
        setNotifMsg(null);
        setNotifMsgType('info');
      }, 5000);
    }
  };

  const handleBlogSubmit = async submiteddBlog => {
    const newBlog = await blogService.create(submiteddBlog);

    addBlog(newBlog);

    setNotifMsg(
      `new blog successfully added: ${submiteddBlog.title} - ${submiteddBlog.author}`,
    );
    setTimeout(() => {
      setNotifMsg(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notifMsg} type={notifMsgType} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>
      <BlogList />
      {/* <Notification message={notifMsg} type={notifMsgType} />
      {user.username} <Logout setUser={setUser} />
      <h3>Create New Blog </h3>
      <Togglable buttonLabel="new blog">
        <BlogForm handleBlogSubmit={handleBlogSubmit} />
      </Togglable>
      <h3>Blogs </h3>
      <div className="blogs">{showBlogs()}</div> */}
    </div>
  );
};

export default connect(null, { initBlogs, setUser })(App);
