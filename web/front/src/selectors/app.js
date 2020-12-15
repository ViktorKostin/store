import { createSelector } from 'reselect';

const getPage = (state) => state.app.page;
const getPerPage = (state) => state.app.perPage;
const getMaxPages = (state) => state.app.maxPages;
const getShowAddProductToStore = (state) => state.app.showAddProductToStore;
const getShowLogin = (state) => state.app.showLogin;
const getShowSignUp = (state) => state.app.showSignUp;
const getShowCart = (state) => state.app.showCart;
const getRoles = (state) => state.app.roles;
const getPending = (state) => state.app.pending;
const getSocket = (state) => state.app.socket;

const makePage = () => {
  return createSelector(
    getPage,
    page => page
  );
};
const makePerPage = () => {
  return createSelector(
    getPerPage,
    perPage => perPage
  );
};
const makeMaxPages = () => {
  return createSelector(
    getMaxPages,
    maxPages => maxPages
  );
};
const makeShowAddProductToStore = () => {
  return createSelector(
    getShowAddProductToStore,
    showAddProductToStore => showAddProductToStore
  );
};
const makeShowLogin = () => {
  return createSelector(
    getShowLogin,
    showLogin => showLogin
  );
};
const makeShowSignUp = () => {
  return createSelector(
    getShowSignUp,
    showSignUp => showSignUp
  );
};
const makeShowCart = () => {
  return createSelector(
    getShowCart,
    showCart => showCart
  );
};
const makeRoles = () => {
  return createSelector(
    getRoles,
    roles => roles
  );
};
const makePending = () => {
  return createSelector(
    getPending,
    pending => pending
  );
};
const makeSocket = () => {
  return createSelector(
    getSocket,
    socket => socket
  );
};

const app = {
  makePage,
  makePerPage,
  makeMaxPages,
  makeShowAddProductToStore,
  makeShowLogin,
  makeShowSignUp,
  makeShowCart,
  makeRoles,
  makePending,
  makeSocket,
};

export default app;
