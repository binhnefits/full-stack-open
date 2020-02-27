import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
});

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
