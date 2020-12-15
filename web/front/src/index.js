import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Cart, Login, SignUp, TopBar, Notifications, AddProductToStore, Products, Chat } from './containers';
import rootReducer from './reducers';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'gorditaRegular',
    body1: {
      fontFamily: 'gorditaLight',
      color: '#000'
    },
  },
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <TopBar />
      <Products />
      <Cart />
      <Login />
      <SignUp />
      <AddProductToStore />
      <Notifications />
      <Chat />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
