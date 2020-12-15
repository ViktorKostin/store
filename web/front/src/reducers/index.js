import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import app from './app';
import notifications from './notifications';
import auth from './auth';
import chat from './chat';

export default combineReducers({
  products,
  cart,
  app,
  notifications,
  auth,
  chat,
});
